import { request } from '@umijs/max';
import { TableListParams, TableListItem } from '@/services/base/permission.d';

export async function queryPermission(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/permission/query', {
    params,
  });
}

export async function showPermission(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/permission/show', {
    params,
  });
}

export async function removePermission(params: { id: string[] }) {
  return request('/api/base/permission/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createPermission(params: TableListItem) {
  return request<API.Response>('/api/base/permission/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePermission(params: TableListItem) {
  return request<API.Response>('/api/base/permission/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
