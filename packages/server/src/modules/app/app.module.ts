import {
    MiddlewareConsumer, Module,
    NestModule,
    OnApplicationShutdown,
    RequestMethod
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule'; // 定时任务
import { ThrottlerModule } from '@nestjs/throttler';

// config
import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@/config/config.service';
import { validate } from '@/config/env.validation';

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
import { HelperModule } from '@/utils/helper/helper.module';

// root
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
    imports: [
        // config
        ConfigModule,

        // core
        CoreModule,

        ScheduleModule.forRoot(),

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
