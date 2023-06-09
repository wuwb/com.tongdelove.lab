import {
    INestApplication, Logger, ValidationPipe, HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
// import { WsAdapter } from '@nestjs/websockets';
// import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
// import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
import * as nunjucks from 'nunjucks';
import { Stream } from 'stream';
import * as Sentry from "@sentry/node";
import '@sentry/tracing';
import { ValidationError } from 'class-validator';

import { AppConfigService } from '@/config/app/app-config.service';
import { SwaggerConfig } from './config/swagger.config';
import { SentryInterceptor } from '@/common/interceptors/sentry.interceptor';
import { PrismaClientExceptionFilter } from '@/common/filters/prisma-client-exception.filter';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
// import { RolesGuard } from '@/common/guards/roles.guard';
// import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
// import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
// import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';

import { RedisService } from '@/core/cache/redis/redis.service';
import { PrismaService } from '@/core/database/prisma/prisma.service';

import { AppModule } from '@/modules/app/app.module';
import { AppService } from '@/modules/app/app.service';
import { AuthService } from '@/modules/system/auth/auth.service';
import { sendServerLoadEvent } from '@/utils/sendServerLoadEvent';
import * as viewfilter from '@/utils/viewfilter';

declare const module: any;

async function setupMicroservice(app: INestApplication) {
    //     app.connectMicroservice<MicroserviceOptions>({
    //         transport: Transport.TCP,
    //         options: {
    //             retryAttempts: 5,
    //             retryDelay: 3000,
    //         },
    //     });
    // 同步执行，确保项目启动的时候能连上微服务。
    // await app.startAllMicroservicesAsync();
    await app.startAllMicroservices();
}

// 解决 Nodejs 环境中请求 HTTPS 的证书授信问题
const isProdMod = process.env.NODE_ENV === 'production';

// 替换 console 为更统一友好的
function replaceConsole() {
    const { log, warn, info } = console;
    const color = (color) => (isProdMod ? '' : color);
    Object.assign(global.console, {
        log: (...args) => log('[log]', '[core]', ...args),
        warn: (...args) =>
            warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[core]', ...args),
        info: (...args) =>
            info(color('\x1b[34m%s\x1b[0m'), '[info]', '[core]', ...args),
        error: (...args) =>
            info(color('\x1b[31m%s\x1b[0m'), '[error]', '[core]', ...args),
    });
}

function initView(app, configService) {
    const baseViewDir = path.join(__dirname, '../views');
    console.log('baseViewDir: ', baseViewDir);
    const baseViewDirList = [baseViewDir];

    app.setBaseViewsDir(baseViewDirList);
    app.setViewEngine('html');

    const nunjucksEnv = nunjucks.configure(baseViewDirList, {
        express: app,
        autoescape: true,
        watch: true,
        noCache: process.env.NODE_ENV === 'development',
    });

    // 设置 view filter
    for (const key of Object.keys(viewfilter)) {
        nunjucksEnv.addFilter(key, viewfilter[key]);
    }

    // macro中不能访问当前 context , 将要访问的变量加到 global
    nunjucksEnv.addGlobal('env', configService.get('environment'));
    nunjucksEnv.addGlobal('jsPath', configService.get('static.jsPath'));
}

function initPublic(app, configService) {
    if (!configService.get('isDev')) {
        return;
    }

    const publicPath = path.resolve(__dirname, '../..', 'public');
    console.log('publicPath: ', publicPath);
    app.useStaticAssets(publicPath, {
        prefix: '/',
    });
}

function initSsr(app) {
    // Express
    app.use(async (req, res) => {
        // 或者从 CDN 上下载到 server 端
        // const serverPath = await downloadServerBundle('http://cdn.com/bar/umi.server.js');
        const render = require('../../web/dist/umi.server');
        res.setHeader('Content-Type', 'text/html');

        const context = {};
        const { html, error, rootContainer } = await render({
            // 有需要可带上 query
            path: req.url,
            context,

            // 可自定义 html 模板
            // htmlTemplate: defaultHtml,

            // 启用流式渲染
            // mode: 'stream',

            // html 片段静态标记（适用于静态站点生成）
            // staticMarkup: false,

            // 扩展 getInitialProps 在服务端渲染中的参数
            // getInitialPropsCtx: {},

            // manifest，正常情况下不需要
        });

        // support stream content
        if (html instanceof Stream) {
            html.pipe(res);
            html.on('end', function () {
                res.end();
            });
        } else {
            res.send(res);
        }
    });
}

function initGlobalFilters(app, configService) {
    if (!configService.get('isDev')) {
        return;
    }
}

async function setupSwagger(swaggerConfig) {
    // 配置api文档信息(不是生产环境配置文档)
    if (process.env.NODE_ENV === 'development') {
        const app = await NestFactory.create(AppModule);
        const swaggerPath = `${swaggerConfig.root}`;
        const swaggerDocumentConfig = new DocumentBuilder()
            .setTitle(swaggerConfig.title)
            .setDescription(swaggerConfig.description)
            .setVersion(swaggerConfig.version)
            // .addTag('users')
            // 方便在 swagger 中测试登录
            .addBearerAuth({
                description: `Please enter token`,
                bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
                scheme: 'Bearer',
                type: 'http', // I`ve attempted type: 'apiKey' too
                in: 'Header',
                // name: 'token',
            })
            .addTag('server')
            .build();
        const swaggerDocumentOptions: SwaggerDocumentOptions = {
            operationIdFactory: (
                controllerKey: string,
                methodKey: string
            ) => methodKey
        };
        // restful API 文檔
        const swaggerSetupOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
            customCssUrl: "./utils/swagger/swagger.css",
            customfavIcon: "./utils/swagger/favicon.png",
            customSiteTitle: "My app",
        };
        const document = SwaggerModule.createDocument(app, swaggerDocumentConfig, swaggerDocumentOptions);
        // 打開 http://localhost:3000/api/docs 就會連結到 swagger 服務。
        SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);
        await app.listen(swaggerConfig.port);
    }
}

async function bootstrap() {
    const logger = new Logger('App');

    logger.log('Application Launcher...');

    // const httpsOptions = {
    //     key: fs.readFileSync(resolve(__dirname, './secrets/key.pem')),
    //     cert: fs.readFileSync( resolve(__dirname, './secrets/certificate.pem')),
    // };

    /**
     * Send server load notification:
     * sending runtime environment details.
     *
     * To disable event tracking set DISABLE_EVENT_TRACKING to 1
     *
     * To find more information regarding this feature visit https://docs.amplication.com/
     */
    if (
        !process.env.DISABLE_EVENT_TRACKING ||
        process.env.DISABLE_EVENT_TRACKING == "0"
    ) {
        sendServerLoadEvent();
    }

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // logger: isProdMode ? false : logger,
        // 开启日志级别打印
        // logger: !isProdMod ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
        // httpsOptions,
        // bufferLogs: true,
        // autoFlushLogs: true,
        // logger: logger,
        cors: true,
    });

    // app.useLogger(app.get(MyLogger));

    /**
     * Cloud Tracing @see https://cloud.google.com/trace/docs
     */
    if (process.env.ENABLE_CLOUD_TRACING) {
        const traceAgent = await import("@google-cloud/trace-agent");
        traceAgent.start();
        console.info("Cloud tracing is enabled");
    }

    await setupMicroservice(app);

    // const myLogger: MyLogger = app.get(MyLogger);

    (app as any).set('etag', false);
    app.use((req, res, next) => {
        res.removeHeader('x-powered-by');
        res.removeHeader('date');
        next();
    });

    const appConfig = app.get(AppConfigService);

    Sentry.init({
        dsn: appConfig.sentryDsn,
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            // new Tracing.Integrations.Express({ app }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());

    // app.useLogger(app.get(MyLogger));

    // app.use(bodyParser.json());

    // 允许跨域
    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH,UPDATE',
        credentials: true,
        maxAge: 0,
        optionsSuccessStatus: 200,
        exposedHeaders: ['Authorization'],
        // allowedHeaders: '';
        // preflightContinue: false;
    });
    app.useGlobalInterceptors(new SentryInterceptor(appConfig.env));

    // 安全,Web漏洞的
    //   app.use(helmet());

    // 压缩，最好使用反向代理中压缩，如 nignx
    //   app.use(compression());

    // 限速
    //   app.use(
    //     ExpressRateLimiter({
    //       windowMs: 15 * 60 * 1000, // 15 minutes
    //       max: 100, // limit each IP to 100 requests per windowMs
    //     }),
    //   );

    // CSRF
    // app.use(csurf());

    // 验证器，使用全局管道验证数据，验证 dto 中字段的合法性
    // https://docs.nestjs.cn/7/techniques?id=%e9%aa%8c%e8%af%81-1
    // https://docs.nestjs.com/techniques/validation
    app.useGlobalPipes(
        new ValidationPipe({
            forbidUnknownValues: false,
            // 禁用详细错误
            disableErrorMessages: false,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            // 剥离属性，自动去除 dto 中未定义的属性
            whitelist: true,
            // 出现非白名单属性时停止处理请求
            // forbidNonWhitelisted: false,
            // 自动有效负载转换，可以写到方法级别，可以自动将 string id 转成 number
            transform: true,
            // exceptionFactory: (errors: ValidationError[]) => {
            //     let message = '';
            //     errors.forEach((error) => {
            //         for (const key in error.constraints) {
            //             message += `${error.constraints[key]}. `;
            //         }
            //     });
            //     return new Error(message);
            // },
        }),
    );

    const authService = app.get(AuthService);
    const redisService = app.get(RedisService);
    const configService = app.get(ConfigService);

    // 全局所有异常过滤器
    // Prisma Client Exception Filter for unhandled exceptions
    const { httpAdapter } = app.get(HttpAdapterHost);
    // app.useGlobalFilters(new HttpExceptionFilter()); // 把所有的异常都转换成{code：code，data：null，message：message}
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));


    // 全局守卫
    // app.useGlobalGuards(new AuthGuard(
    //   authService,
    //   redisService,
    //   configService,
    // ));
    // app.useGlobalGuards(new RolesGuard());

    // 全局拦截器，根据 entity 类型转换返回字段
    // 把所有的数据格式都转换成{code：0，data：data，message：message}
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    // app.useGlobalInterceptors(new LoggingInterceptor());
    // 使用全局拦截器打印出参
    // app.useGlobalInterceptors(new TransformInterceptor());

    //   app.enableVersioning({
    //     type: VersioningType.URI,
    //   });


    // app.useWebSocketAdapter(new WsAdapter(app));

    // https://docs.nestjs.com/recipes/prisma
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    // app.use(cookieParser());



    // const myLogger: MyLogger = app.get(MyLogger);

    // const nestConfig = configService.get('nest');
    // const corsConfig = configService.get('cors');

    // app.use(express.json()); // For parsing application/json
    // app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

    // initView(app, configService);

    // initPublic(app, configService);

    // initSsr(app);

    // initGlobalFilters(app, configService);

    const swaggerConfig = configService.get<SwaggerConfig>('swagger');
    if (swaggerConfig && swaggerConfig.enabled) {
        setupSwagger(swaggerConfig);
    }

    // 禁止提示
    // app.disable('x-powered-by');

    // Starts listening to shutdown hooks
    if (process.env.ENABLE_SHUTDOWN_HOOKS) {
        // Remove listeners created by Prisma
        process.removeAllListeners("SIGTERM");
        process.removeAllListeners("SIGINT");
        app.enableShutdownHooks();
    }

    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());

    const env = configService.get('environment')
    await app.listen(appConfig.port);

    process.on('SIGINT', async () => {
        console.log('process SIGINT.');
        setTimeout(() => process.exit(1), 5000);
        await app.close();
        process.exit(0);
    });

    const appService: AppService = app.get(AppService);

    logger.log(`${appService.root()}: environment: ${env}`);
    logger.log(`pid: ${process.pid}`);
    logger.log(`Application started on localhost:${appConfig.port}`);
    logger.log(`Application is running on: ${await app.getUrl()}`);


    // replaceConsole();

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    return app;
}

bootstrap()
    .then(() => {
        console.log('bootstrap done.');
    })
    .catch((error) => {
        console.log('bootstrap error.');
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        console.log('bootstrap finally.');
    });

