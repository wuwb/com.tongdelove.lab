import { request } from '@umijs/max';

// 查询在线用户列表
export function list(query) {
    return request('/monitor/online/list', {
        method: 'get',
        params: query
    })
}

// 强退用户
export function forceLogout(tokenId) {
    return request('/monitor/online/' + tokenId, {
        method: 'delete'
    })
}
