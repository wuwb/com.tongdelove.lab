import { request } from '@umijs/max';
import { TableListParams, TableListItem } from '@/services/base/admin/role.d';

export async function queryRole(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/admin/role/query', {
    params,
  });
}

export async function showRole(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/admin/role/show', {
    params,
  });
}

export async function removeRole(params: { id: string[] }) {
  return request<API.Response>('/api/base/admin/role/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createRole(params: TableListItem) {
  return request<API.Response>('/api/base/admin/role/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: TableListItem) {
  return request<API.Response>('/api/base/admin/role/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
