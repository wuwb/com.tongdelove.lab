import { ConfigService } from '@/config/config.service';
import { RedisModule as BaseRedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        /* 连接redis */
        BaseRedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                config: {
                    url: configService.get<any>('redis'),
                }
            }),
            inject: [ConfigService],
        }),
    ]
})
export class RedisModule {

}
