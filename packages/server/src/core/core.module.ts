import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios'; // 网络请求
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';

import { HealthModule } from '@/core/health/health.module';
import { DatabaseModule } from '@/core/database/database/database.module';
import { LoggerModule } from '@/core/logger/logger/logger.module';
import { PrismaModule } from '@/core/database/prisma/prisma.module';
// import { InitModule } from '@/core/init/init.module';
import { MailModule } from '@/core/mail/mail/mail.module';
import { CacheModule } from '@/core/cache/cache/cache.module';
import { RedisModule } from '@/core/cache/redis/redis.module';
import { AliossModule } from '@/core/storage/alioss/alioss.module';
// import { GlobalScheduleModule } from '@/core/global-schedule/global-schedule.module';
import { GraphqlService } from '@/core/graphql/graphql.service';
import { ServeStaticOptionsService } from '@/core/serveStatic/serveStaticOptions.service';
import { HttpConfigService } from '@/core/http-config/http-config.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@/config/config.module';

@Global()
@Module({
    imports: [
        ConfigModule,

        /* 导入速率限制模块   ttl:单位秒钟， 表示ttl秒内最多只能请求 limit 次， 避免暴力攻击。*/
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 60, // 10
        }),



        HealthModule,
        DatabaseModule,
        LoggerModule,
        PrismaModule,
        // InitModule,
        MailModule,

        // cache
        CacheModule,
        RedisModule,

        // storage
        AliossModule,
        // GlobalScheduleModule,

        HttpModule.registerAsync({
            useClass: HttpConfigService,
        }),
        ServeStaticModule.forRootAsync({
            useClass: ServeStaticOptionsService,
        }),
        // GraphQLModule.forRootAsync<ApolloDriverConfig>({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     // useExisting: GraphqlService,
        //     driver: ApolloDriver,
        //     useClass: GraphqlService,
        // }),
    ],
    controllers: [],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ],
    exports: [
        HealthModule,
        DatabaseModule,
        LoggerModule,
        PrismaModule,
        // InitModule,
        MailModule,
        CacheModule,
        RedisModule,
        AliossModule,
        // GlobalScheduleModule,
    ],
})
export class CoreModule { }
