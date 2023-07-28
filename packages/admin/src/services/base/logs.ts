import { TableListItem, TableListParams } from '@/services/base/logs.d';
import { request } from '@umijs/max';

export async function queryLogs(params?: TableListParams) {
  return request<API.Response<API.PagingData<TableListItem>>>('/api/base/logs/query', {
    params,
  });
}

export async function removeLogs(params: { id: string[] }) {
  return request('/api/base/logs/remove', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
