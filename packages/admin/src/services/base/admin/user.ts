import { request } from '@umijs/max';
import type API from '../../API.d';
import type { TableListParams, TableListItem } from './user.d';


export async function queryUser(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/admin/user/query', {
    params,
  });
}

export async function showUser(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/admin/user/show', {
    params,
  });
}

export async function removeUser(params: { id: string[] }) {
  return request('/api/base/admin/user/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createUser(params: TableListItem) {
  return request<API.Response>('/api/base/admin/user/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: TableListItem) {
  return request<API.Response>('/api/base/admin/user/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
