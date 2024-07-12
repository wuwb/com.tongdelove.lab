import { TableListItem, TableListParams } from '@/services/base/role.d'
import { request } from '@umijs/max'

export async function queryRole(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>(
    '/api/base/role/query',
    {
      params,
    },
  )
}

export async function showRole(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/role/show', {
    params,
  })
}

export async function removeRole(params: { id: string[] }) {
  return request<API.Response>('/api/base/role/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  })
}

export async function createRole(params: TableListItem) {
  return request<API.Response>('/api/base/role/create', {
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function updateRole(params: TableListItem) {
  return request<API.Response>('/api/base/role/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  })
}
