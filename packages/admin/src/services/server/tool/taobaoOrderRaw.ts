import { request } from '@umijs/max';

export async function listTaobaoOrderRaw(params) {
  return request('/api/tool/taobao-order-raw', {
    params: {
      page: params.current,
      limit: params.pageSize,
      ...params,
    },
  });
}

export async function syncData() {
  return request('/api/taobao/purge-all', {
    method: 'POST',
    data: {},
  });
}

export async function syncById(params) {
  return request('/api/taobao/purge', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
