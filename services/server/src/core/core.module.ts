import { Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpModule } from '@nestjs/axios'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { HealthModule } from '@/core/health/health.module'
import { DatabaseModule } from '@/core/database/database/database.module'
import { PrismaModule } from '@/core/database/prisma/prisma.module'
import { MailModule } from '@/core/mail/mail/mail.module'
import { CacheModule } from '@/core/cache/cache/cache.module'
import { AliossModule } from '@/core/storage/ali-oss/alioss.module'
import { ServeStaticOptionsService } from '@/core/serveStatic/serveStaticOptions.service'
import { HttpConfigService } from '@/core/http-config/http-config.service'
import { ConfigModule } from '@/config/config.module'
import { LoggerModule } from './logger/winston/logger.module'
import { ScheduleModule } from '@nestjs/schedule'
import { JwtModule } from './auth/jwt/jwt.module'

@Global()
@Module({
  imports: [
    ConfigModule,

    /* 导入速率限制模块   ttl:单位秒钟， 表示ttl秒内最多只能请求 limit 次， 避免暴力攻击。*/
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60, // 10
    }),
    ScheduleModule.forRoot(),

    JwtModule,

    HealthModule,
    DatabaseModule,
    LoggerModule,
    PrismaModule,
    // InitModule,
    MailModule,

    // cache
    CacheModule,

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
    AliossModule,
    JwtModule,
    // GlobalScheduleModule,
  ],
})
export class CoreModule {}
