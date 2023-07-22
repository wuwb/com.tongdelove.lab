import { request } from '@umijs/max';

// 查询缓存详细
export async function getCache() {
    return request('/api/monitor/cache');
}


// 查询缓存名称列表
export function listCacheName() {
    return request('/monitor/cache/getNames', {
        method: 'get'
    });
}

// 查询缓存键名列表
export function listCacheKey(cacheName) {
    return request('/monitor/cache/getKeys/' + cacheName, {
        method: 'get'
    });
}

// 查询缓存内容
export function getCacheValue(cacheName, cacheKey) {
    return request('/monitor/cache/getValue/' + cacheName + '/' + cacheKey, {
        method: 'get'
    });
}

// 清理指定名称缓存
export function clearCacheName(cacheName) {
    return request('/monitor/cache/clearCacheName/' + cacheName, {
        method: 'delete'
    });
}

// 清理指定键名缓存
export function clearCacheKey(cacheKey) {
    return request('/monitor/cache/clearCacheKey/' + cacheKey, {
        method: 'delete'
    });
}

// 清理全部缓存
export function clearCacheAll() {
    return request('/monitor/cache/clearCacheAll', {
        method: 'delete'
    });
}
