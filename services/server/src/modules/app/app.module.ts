import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
  RequestMethod,
} from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { DataSource } from 'typeorm'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ThrottlerModule } from '@nestjs/throttler'

// config
import { ConfigModule } from '@/config/config.module'
import { validate } from '@/config/env.validation'

// common single
import { WinstonModule } from 'nest-winston'

// common
// import { CustomGlobalPipe } from '@/common/pipes/custom-global.pipe';
// import { RolesGuard } from '@/common/guards/roles.guard';
// import { Constants } from '@/common/constants/constants';
// import { ConnectionProvider } from '@/common/providers/connection.provider';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'

// common middlewares
import { AttachAuthMiddleware } from '@/common/middlewares/attach-auth.middleware'
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware'
import { OriginMiddleware } from '@/common/middlewares/origin.middleware'
import { CompressionMiddleware } from '@/common/middlewares/compression.middleware'
import { LocalsMiddleware } from '@/common/middlewares/locals.middleware'
import { IpMiddleware } from '@/common/middlewares/ip.middleware'
import { CookieParserMiddleware } from '@/common/middlewares/cookie-parser.middleware'
import { RateLimitMiddleware } from '@/common/middlewares/rate-limit.middleware'
import { CorsMiddleware } from '@/common/middlewares/cors.middleware'
import { CSRFMiddleware } from '@/common/middlewares/csrf.middleware'
import { HelmetMiddleware } from '@/common/middlewares/helmet.middleware'

// core
import { CoreModule } from '@/core/core.module'

// shared
import { SharedModule } from '@/shared/shared.module'

// modules
import { LoginModule } from '@/modules/login/login.module'
import { StockModule } from '@/modules/stock/stock.module'
import { SystemModule } from '@/modules/system/system.module'
import { ToolModule } from '@/modules/tool/tool.module'
import { AuthModule } from '@/modules/system/auth/auth.module'
import { UserModule } from '@/modules/system/user/user.module'
import { UserVerificationModule } from '@/modules/system/user/user-verification.module'

// root
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { SentryModule } from "@sentry/nestjs/setup";
import {
  SqsModule,
  SqsConfig,
  SqsConfigOption,
  SqsQueueType,
  SqsService
} from '@nestjs-packages/sqs';

@Module({
  imports: [
    // config
    ConfigModule,

    // core
    CoreModule,

    // shared
    SharedModule,

    // modules
    LoginModule,
    StockModule,
    SystemModule,
    ToolModule,
    UserModule,
    UserVerificationModule,
    AuthModule,

    SentryModule.forRoot(),
    // SqsModule.forRootAsync({
    //   useFactory: () => {
    //     const config: SqsConfigOption = {
    //       region: CONFIG.sqs.region,
    //       endpoint: CONFIG.sqs.endpoint,
    //       accountNumber: CONFIG.sqs.accountNumber,
    //       credentials: {
    //         accessKeyId: CONFIG.sqs.accessKeyId,
    //         secretAccessKey: CONFIG.sqs.secretAccessKey
    //       }
    //     };
    //     return new SqsConfig(config);
    //   }
    // }),
    // SqsModule.registerQueue({
    //   name: 'dev-wyo-order',
    //   type: SqsQueueType.All
    // })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,

    // 过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //     // 管道
    //     provide: APP_PIPE,
    //     useClass: CustomGlobalPipe,
    // },
    // {
    //     // 守卫
    //     provide: APP_GUARD,
    //     useClass: RolesGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },
    // {
    //     // 拦截器
    //     provide: APP_INTERCEPTOR,
    //     useClass: LoggingInterceptor,
    // },
    // {
    //     // 自定义 provide
    //     provide: Constants.CONNECTION,
    //     useValue: ConnectionProvider,
    // },
    // todo 升级成自定义缓存 缓存拦截器
    // {
    //     provide: APP_INTERCEPTOR,
    //     useClass: CacheInterceptor,
    // },

    // 全局加入 JWT 验证
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
  exports: [
    // 导出 provider，可以通过 provider 的名称，或者直接导出整个对象
  ],
})
export class AppModule implements NestModule, OnApplicationShutdown {
  // static host: string;
  // static port: number | string;
  // static isDev: boolean;

  // private isAuthEnabled: boolean;

  constructor(private readonly dataSource: DataSource) { }

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      // IpMiddleware,
      // CookieParserMiddleware,
      // RateLimitMiddleware,
      // CorsMiddleware,
      // CSRFMiddleware,
      // HelmetMiddleware,
      // UserMiddleware,
      // LocalsMiddleware,
      // CompressionMiddleware,
      // LoggerMiddleware, // logger 中间件
      // OriginMiddleware, // origin 合法性检测
      // CompressionMiddleware, // 压缩
      // LocalsMiddleware, // 本地配置
      // AttachAuthMiddleware, // 添加认证信息
    ]
    consumer.apply(...middlewares).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }

  normalizePort(port: number | string): number | string {
    const portNumber: number =
      typeof port === 'string' ? parseInt(port, 10) : port
    if (isNaN(portNumber)) {
      return port
    } else if (portNumber >= 0) {
      return portNumber
    } else {
      return port
    }
  }

  onApplicationShutdown(signal: string): void {
    console.log('应用停止，停止信号：', signal)
    // console.trace(`Application shut down (signal: ${signal})`);
  }
}
