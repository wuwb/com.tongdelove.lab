import { request } from '@umijs/max';
import { TableListParams, TableListItem } from './data.d';

export async function findProductAll(params: any) {
  return request('/api/products', {
    params,
  });
}


export async function queryCreateMetadata() {
  return request('/api/products/query-create-metadata')
}

export async function createProduct(params) {
  return request('/api/products', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    }
  });
}

export async function removeProduct(params: { key: number[] }) {
  return request('/api/products/remove', {
    method: 'DELETE',
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
