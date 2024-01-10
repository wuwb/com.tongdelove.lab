import { request } from '@umijs/max';
import { TableListItem, TableListParams } from './data';

export async function queryData(params?: TableListParams) {
  return request('/api/taobao/order-raw', {
    params,
  });
}

export async function syncData() {
  return request('/api/taobao/purge-all', {
    method: 'POST',
    data: {},
  });
}

export async function syncById(params: any) {
  return request('/api/taobao/purge', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
