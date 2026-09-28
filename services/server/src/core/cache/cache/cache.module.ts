import { Global, Module } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { caching } from 'cache-manager'
import { CacheService } from './cache.service'
import { CacheController } from './cache.controller'
import { CacheConfigService } from './cache-config.service'

@Global()
@Module({
  controllers: [CacheController],
  providers: [
    CacheConfigService,
    {
      // 直接基于 cache-manager 构建实例，避免 @nestjs/cache-manager 内部
      // 的 v4/v5 版本探测在 ESM 运行态下误判导致 caching 调用失败
      provide: CACHE_MANAGER,
      useFactory: async (config: CacheConfigService) => {
        const options: any = config.createCacheOptions()
        const { store, ttl, max, isGlobal, is_cacheable_value, ...rest } =
          options

        // cache-manager v5 的 ttl 单位为毫秒（配置里是秒）
        const ttlMs = (ttl ?? 5) * 1000

        return caching(store, {
          ttl: ttlMs,
          max,
          ...rest,
        })
      },
      inject: [CacheConfigService],
    },
    CacheService,
  ],
  exports: [CacheService, CACHE_MANAGER],
})
export class CacheModule {}
