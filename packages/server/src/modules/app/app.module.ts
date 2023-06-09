import {
    MiddlewareConsumer, Module,
    NestModule,
    OnApplicationShutdown,
    RequestMethod
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import path from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule'; // 定时任务
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull'; // 队列
import { SendGridModule } from "@ntegral/nestjs-sendgrid"; // 邮件

// config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigModule } from '@/config/app/app-config.module';
import configuration from '@/config/configuration';
import databaseConfig from '@/config/database.config';
import { validate } from '@/config/env.validation';
import githubConfig from '@/config/github.config';
import graphqlConfig from '@/config/graphql.config';
import jwtConfig from '@/config/jwt.config';
import serverConfig from '@/config/server.config';
import swaggerConfig from '@/config/swagger.config';

// common
// import { CustomGlobalPipe } from '@/common/pipes/custom-global.pipe';
// import { RolesGuard } from '@/common/guards/roles.guard';
// import { Constants } from '@/common/constants/constants';
// import { ConnectionProvider } from '@/common/providers/connection.provider';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

// common middlewares
import { AttachAuthMiddleware } from '@/common/middlewares/attach-auth.middleware';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
// import { OriginMiddleware } from '@/common/middlewares/origin.middleware';
// import { CompressionMiddleware } from '@/common/middlewares/compression.middleware';
// import { LocalsMiddleware } from '@/common/middlewares/locals.middleware';

// core
import { CoreModule } from '@/core/core.module';

// modules 

// 核心业务模块
import { LoginModule } from '@/modules/login/login.module';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { BackupModule } from '@/modules/system/backup/backup.module';
import { LinkModule } from '@/modules/cms/link/link.module';
import { FreelancerModule } from '@/modules/tech/freelancer/freelancer.module';
import { SystemModule } from '@/modules/system/system.module';
import { UserModule } from '@/modules/system/user/user.module';
import { UserVerificationModule } from '@/modules/system/user/user-verification.module';
// import { AddressesModule } from '@/modules/addresses/addresses.module';
// import { CouponModule } from '@/modules/coupon/coupon.module';
// import { CompaniesModule } from '@/modules/companies/companies.module';
// import { OrganizationsModule } from '@/modules/tech/github/organizations.module';
// import { TopicsModule } from '@/modules/topics/topics.module';
// import { PostModule } from '@/modules/post/post.module';
// import { V2exModule } from '@/modules/v2ex/v2ex.module';
// import { ProductsModule } from '@/modules/products/products.module';
// import { ProductsGqlModule } from '@/modules/products-gql/products-gql.module';
// import { AutohotboxService } from './autohotbox/autohotbox.service';
// import { DasboardModule } from '@/modules/dashboard/dashboard.module';
// import { LinksModule } from '@/modules/links/links.module';
// import { AvatarModule } from '@/modules/avatar/avatar.module';
// import { ImageProcessModule } from '@/modules/image-process/image-process.module';
// import { FileModule } from '@/modules/file/file.module';
// import { CommentModule } from '@/modules/comment/comment.module';
// import { StockModule } from '@/modules/stock/stock.module';
// import { TaobaoModule } from '@/modules/taobao/taobao.module';
// import { TypeormService } from '@/modules/typeorm/typeorm.service';
// import { GqlConfigService } from '@/modules/gqlconfig/gqlconfig.service';

// utils
import { SendgridConfigService } from "@/shared/services/sendgridConfig.service";
import { SegmentAnalyticsModule } from '@/shared/services/segmentAnalytics/segmentAnalytics.module';
// import { SegmentAnalyticsOptionsService } from '@/shared/services/segmentAnalytics/segmentAnalyticsOptionsService';
import { HelperModule } from '@/utils/helper/helper.module';

// root
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
    imports: [
        // 配置
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.local', '.env'],

            load: [
                configuration, // 默认配置
                databaseConfig,
                githubConfig,
                graphqlConfig,
                jwtConfig,
                serverConfig,
                swaggerConfig,
            ],
            ignoreEnvFile: false,
            cache: true,
            expandVariables: true, // 支持嵌套
            validate,
        }),
        SendGridModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: SendgridConfigService,
        }),

        AppConfigModule,

        // 基础功能

        ScheduleModule.forRoot(),

        // ThrottlerModule.forRoot({
        //   ttl: 60,
        //   limit: 10,
        // }),
        // https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue
        BullModule.forRoot('master', {
            redis: {
                host: 'localhost',
                port: 6379,
            },
            limiter: {
                max: 10000,
                duration: 10000,
                bounceBack: true,
            },
            prefix: 'td',
            // defaultJobOptions: {},
            settings: {
                lockDuration: 30000, // Key expiration time for job locks.
                lockRenewTime: 15000, // Interval on which to acquire the job lock
                stalledInterval: 30000, // How often check for stalled jobs (use 0 for never checking).
                maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
                guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
                retryProcessDelay: 5000, // delay before processing next job in case of internal error.
                backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
                drainDelay: 5, // A timeout for when the queue is in drained state (empty waiting for jobs).
            },
        }),

        // segment 分析，开始时候不用开启
        // SegmentAnalyticsModule.registerAsync({
        //     useClass: SegmentAnalyticsOptionsService,
        // }),

        // InitModule, // 初始化
        // AliossModule,
        // CacheModule.register({
        //     // 自定义缓存时间
        //     ttl: 5, // seconds
        //     max: 10, // seconds
        // }),

        // TypeOrmModule.forRoot(),
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        // }),

        // core
        CoreModule,
        // modules

        UserModule,
        UserVerificationModule,
        SystemModule,
        LoginModule,
        AuthModule,
        FreelancerModule,
        LinkModule,
        // TopicsModule,
        // PostModule,
        // V2exModule,
        // PostsModule,
        // OrganizationsModule,
        // ProductsModule,
        // ProductsGqlModule,
        // AddressesModule,
        // CouponModule,
        // CompaniesModule,
        // StockModule,
        // TaobaoModule,
        // AvatarModule,
        // ImageProcessModule,
        // FileModule,
        // CommentModule,
        HelperModule,
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        AppResolver,
        // AutohotboxService,
        {
            // 过滤器
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

    constructor(
        private readonly configService: ConfigService,
        private readonly dataSource: DataSource,
    ) { }

    configure(consumer: MiddlewareConsumer) {
        const middlewares = [
            LoggerMiddleware, // logger 中间件
            // OriginMiddleware, // origin 合法性检测
            // CompressionMiddleware, // 压缩
            // LocalsMiddleware, // 本地配置
            AttachAuthMiddleware, // 添加认证信息
        ];
        consumer.apply(...middlewares).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }

    // normalizePort(port: number | string): number | string {
    //     const portNumber: number = typeof port === 'string' ? parseInt(port, 10) : port;
    //     if (isNaN(portNumber)) {
    //         return port;
    //     } else if (portNumber >= 0) {
    //         return portNumber;
    //     }
    // }

    onApplicationShutdown(signal: string): void {
        console.trace(`Application shut down (signal: ${signal})`);
    }
}
