import { request } from '@umijs/max';
import { TableListItem, TableListParams } from './data.d';

export async function create(params: TableListItem) {
  return request('/api/demo/client/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function remove(params) {
  return request('/api/demo/client/remove', {
    method: 'delete',
    data: {
      id: params,
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/demo/client/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function list(params?: TableListParams) {
  return request('/api/demo/client/list', {
    params,
  });
}

export async function get(params?: TableListParams) {
  return request('/api/demo/client/get', {
    params,
  });
}
