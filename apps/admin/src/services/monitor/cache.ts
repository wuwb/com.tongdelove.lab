import { request } from '@umijs/max';

export async function getCache() {
  return request('/api/monitor/cache');
}
