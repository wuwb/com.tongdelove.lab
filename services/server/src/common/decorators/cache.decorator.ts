import { SetMetadata } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import * as META from '@/common/constants/meta.constant';
import lodash from 'lodash-es';

// 缓存器配置
interface ICacheOption {
    ttl?: number;
    key?: string;
    disable?: boolean;
}

/**
 * 统配构造器
 * @function HttpCache
 * @description 两种用法
 * @example @HttpCache({ key: CACHE_KEY, ttl: 60 * 60 })
 * @example @HttpCache(CACHE_KEY, 60 * 60)
 * @example @HttpCache({ disable: true })
 */
export function HttpCache(key: string, ttl?: number): MethodDecorator;
export function HttpCache(option: ICacheOption): MethodDecorator;
export function HttpCache(...args) {
    const option = args[0];
    const isOption = (value): value is ICacheOption => lodash.isObject(value);
    const key: string = isOption(option) ? option.key : option;
    const ttl: number = isOption(option) ? option.ttl : (args[1] || null);
    const disable: number = isOption(option) ? option.disable : (args[1] || null);
    return (_, __, descriptor: PropertyDescriptor) => {
        if (disable) {
            SetMetadata(META.HTTP_CACHE_DISABLE, true)(descriptor.value)
            return descriptor
        }
        if (key) {
            CacheKey(key)(descriptor.value);
        }
        if (typeof ttl === 'number' && !isNaN(ttl)) {
            CacheTTL(ttl)(descriptor.value)
        }
        return descriptor;
    };
}

HttpCache.disable = (_, __, descriptor) => {
    SetMetadata(META.HTTP_CACHE_DISABLE, true)(descriptor.value);
}
