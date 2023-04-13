import { request } from '@umijs/max';
import { TableListParams, TableListItem } from '@/services/base/admin/menu.d';

export async function queryMenu(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/admin/menu/query', {
    params,
  });
}

export async function showMenu(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/admin/menu/show', {
    params,
  });
}

export async function removeMenu(params: { id: string[] }) {
  return request('/api/base/admin/menu/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createMenu(params: TableListItem) {
  return request<API.Response>('/api/base/admin/menu/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMenu(params: TableListItem) {
  return request<API.Response>('/api/base/admin/menu/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function orderMenu(params: { orders: { id: string; parentId: string }[] }) {
  return request<API.Response>('/api/base/admin/menu/order', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
