import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientType } from 'redis';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [
    RedisService,
  ]
})
export class RedisModule { }
