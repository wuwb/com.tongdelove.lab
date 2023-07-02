import { INestApplication, Logger, ValidationPipe, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as path from 'path';
import helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import { Stream } from 'stream';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { SentryInterceptor } from '@/common/interceptors/sentry.interceptor';
import { PrismaClientExceptionFilter } from '@/common/filters/prisma-client-exception.filter';
import { CacheService } from '@/core/cache/cache/cache.service';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { AppService } from '@/modules/app/app.service';
import { AuthService } from '@/modules/system/auth/auth.service';
import * as viewfilter from '@/utils/viewfilter';
import { setupSwagger } from './setup-swagger';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { ConfigService } from '@nestjs/config';

// 解决 Nodejs 环境中请求 HTTPS 的证书授信问题
const isProdMod = process.env.NODE_ENV === 'production';

// 微服务
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

// 替换 console 为更统一友好的
function replaceConsole() {
    const { log, warn, info } = console;
    const color = color => (isProdMod ? '' : color);
    Object.assign(global.console, {
        log: (...args) => log('[log]', '[core]', ...args),
        warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[core]', ...args),
        info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[core]', ...args),
        error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[core]', ...args),
    });
}

function initView(app) {
    const configService = app.get(ConfigService);
    const baseViewDir = path.join(__dirname, '../views');
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

export async function bootstrap(app, listening: boolean = true) {
    const logger = new Logger('App');

    logger.log('Application Launcher...');

    // const httpsOptions = {
    //     key: fs.readFileSync(resolve(__dirname, './secrets/key.pem')),
    //     cert: fs.readFileSync( resolve(__dirname, './secrets/certificate.pem')),
    // };

    // app.useLogger(app.get(MyLogger));

    /**
     * Cloud Tracing @see https://cloud.google.com/trace/docs
     */
    // if (process.env.ENABLE_CLOUD_TRACING) {
    //     const traceAgent = await import("@google-cloud/trace-agent");
    //     traceAgent.start();
    //     console.info("Cloud tracing is enabled");
    // }

    // await setupMicroservice(app);

    // const myLogger: MyLogger = app.get(MyLogger);

    // tood 移到 chore.middleware.ts 中
    // (app as any).set('etag', false);
    // app.use((req, res, next) => {
    //     res.removeHeader('x-powered-by');
    //     res.removeHeader('date');
    //     next();
    // });

    // service
    const configService = app.get(ConfigService);
    const appService = app.get(AppService);
    const authService = app.get(AuthService);
    const cacheService = app.get(CacheService);
    const prismaService = app.get(PrismaService);
    const httpAdapterHost = app.get(HttpAdapterHost);
    // const myLogger = app.get(MyLogger);

    // config
    const env = configService.get('environment');
    const swaggerConfig = configService.get('swagger');
    const nestConfig = configService.get('nest');
    const corsConfig = configService.get('cors');

    // Sentry.init({
    //     dsn: configService.sentryDsn,
    //     integrations: [
    //         // enable HTTP calls tracing
    //         new Sentry.Integrations.Http({ tracing: true }),
    //         // enable Express.js middleware tracing
    //         // new Tracing.Integrations.Express({ app }),
    //     ],

    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    // app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    // app.use(Sentry.Handlers.tracingHandler());

    // app.useLogger(app.get(MyLogger));
    // app.use(bodyParser.json());

    // app.useGlobalInterceptors(new SentryInterceptor(configService.env));

    // 设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响,安全,Web漏洞的
    app.use(
        helmet({
            contentSecurityPolicy: false, // 取消 https 强制转换
        }),
    );

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

    // https://docs.nestjs.com/recipes/prisma
    // await prismaService.enableShutdownHooks(app);

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

    // 全局拦截器，根据 entity 类型转换返回字段
    // 转换输出格式，把所有的数据格式都转换成{code：0，data：data，message：message}
    // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    // 拦截日志
    // app.useGlobalInterceptors(new LoggingInterceptor());
    // 使用全局拦截器打印出参，转
    // app.useGlobalInterceptors(new TransformInterceptor());

    // 全局所有异常过滤器
    // Prisma Client Exception Filter for unhandled exceptions
    // 把所有的异常都转换成{code：code，data：null，message：message}
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost.httpAdapter));
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost.httpAdapter));

    // 全局守卫
    // app.useGlobalGuards(new AuthGuard(
    //   authService,
    //   CacheService,
    //   configService,
    // ));
    // app.useGlobalGuards(new RolesGuard());

    //   app.enableVersioning({
    //     type: VersioningType.URI,
    //   });

    // app.useWebSocketAdapter(new WsAdapter(app));

    // app.use(cookieParser());

    // app.use(express.json()); // For parsing application/json
    // app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

    initView(app);

    // initPublic(app, configService);

    // initSsr(app);

    // initGlobalFilters(app, configService);

    // Swagger Api
    console.log('swaggerConfig: ', swaggerConfig);
    if (swaggerConfig && swaggerConfig.enabled) {
        setupSwagger(app, swaggerConfig);
    }

    // Cors
    if (corsConfig && corsConfig.enabled) {
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
    }

    // 禁止提示
    // app.disable('x-powered-by');

    // Starts listening to shutdown hooks
    if (process.env.ENABLE_SHUTDOWN_HOOKS) {
        // Remove listeners created by Prisma
        process.removeAllListeners('SIGTERM');
        process.removeAllListeners('SIGINT');
        app.enableShutdownHooks();
    }

    // The error handler must be before any other error middleware and after all controllers
    // app.use(Sentry.Handlers.errorHandler());

    if (listening) {
        await app.listen(configService.get('port', 3001));
    }

    process.on('SIGINT', async () => {
        console.log('process SIGINT.');
        setTimeout(() => process.exit(1), 5000);
        await app.close();
        process.exit(0);
    });

    logger.log(`${appService.root()}: environment: ${env}`);
    logger.log(`pid: ${process.pid}`);
    logger.log(`Application started on localhost:${configService.port}`);
    logger.log(`Application is running on: ${await app.getUrl()}`);

    // replaceConsole();

    return app;
}
