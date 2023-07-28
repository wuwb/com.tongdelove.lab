import { TableListItem, TableListParams } from '@/services/server/base/menu.d';
import { MenuDataItem } from '@ant-design/pro-components';
import { request } from '@umijs/max';

export async function queryMenu(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/menu/query', {
    params,
  });
}

export async function showMenu(params?: TableListParams) {
  return request<API.Response<TableListItem>>('/api/base/menu/show', {
    params,
  });
}

export async function removeMenu(params: { id: string[] }) {
  return request('/api/base/menu/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function createMenu(params: TableListItem) {
  return request<API.Response>('/api/base/menu/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMenu(params: TableListItem) {
  return request<API.Response>('/api/base/menu/update', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function orderMenu(params: { orders: { id: string; parentId: string }[] }) {
  return request<API.Response>('/api/base/menu/order', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}

export async function queryCurrentMenu(options?: { [key: string]: any }) {
  return request<MenuDataItem[]>('/api/base/menu/current-menu', {
    method: 'GET',
    ...(options || {}),
  });
}
