import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { CacheModule as BaseCacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientType } from 'redis';

@Module({
    imports: [
        BaseCacheModule.register({
            // 自定义缓存时间
            ttl: 5, // seconds
            max: 10, // maximum number of items in cache
            isGlobal: true,
            // store: redisStore,
            // Store-specific configuration:
            host: 'localhost',
            port: 6379,
        }),
    ],
    controllers: [CacheController],
    providers: [CacheService],
    exports: [
        CacheService,
    ]
})
export class CacheModule { }
