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
import { RedisModule } from '@/core/cache/redis/redis.module';
import { AliossModule } from '@/core/storage/alioss/alioss.module';
// import { GlobalScheduleModule } from '@/core/global-schedule/global-schedule.module';
import { GraphqlService } from '@/core/graphql/graphql.service';
import { ServeStaticOptionsService } from '@/core/serveStatic/serveStaticOptions.service';
import { HttpConfigService } from '@/core/http-config/http-config.service';

@Global()
@Module({
    imports: [
        HealthModule,
        DatabaseModule,
        LoggerModule,
        PrismaModule,
        // InitModule,
        MailModule,
        RedisModule,
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
        RedisModule,
        AliossModule,
        // GlobalScheduleModule,
    ],
})
export class CoreModule { }
