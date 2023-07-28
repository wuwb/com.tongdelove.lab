import { TableListItem, TableListParams } from '@/services/server/system/role.d';
import { request } from '@umijs/max';

export async function queryRole(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/system/role', {
    method: 'GET',
    params: {
      page: params.current,
      limit: params.pageSize,
    },
    ...(options || {}),
  });
}

export async function showRole(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/system/role/show', {
    params,
  });
}

export async function removeRole(params: { id: string[] }) {
  return request<API.Response>('/api/system/role/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createRole(params: TableListItem) {
  return request<API.Response>('/api/system/role/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: TableListItem) {
  return request<API.Response>('/api/system/role/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
