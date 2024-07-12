import { request } from '@umijs/max'

// 获取服务信息
export function getServer() {
  return request('/monitor/server', {
    method: 'get',
  })
}
