import { redisStore } from 'cache-manager-ioredis-yet'
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@/config/config.service'

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  // 缓存配置
  public createCacheOptions(): CacheModuleOptions {
    const redisOptions: any = {
      host: this.configService.get('redis.host', 'localhost'),
      port: this.configService.get('redis.port', 6379),
    }
    const password = this.configService.get('redis.password')
    if (password) {
      redisOptions.password = password
    }

    console.log('redisOptions: ', redisOptions)

    return {
      isGlobal: true,

      store: redisStore,

      // 自定义缓存时间
      ttl: this.configService.get('redis.ttl', 5), // seconds
      max: this.configService.get('redis.max', 10), // maximum number of items in cache

      // https://github.com/dabroek/node-cache-manager-redis-store/blob/master/CHANGELOG.md#breaking-changes
      // Any value (undefined | null) return true (cacheable) after redisStore v2.0.0
      is_cacheable_value: () => true,
      ...redisOptions,
    }
  }
}
