import { request } from '@umijs/max';

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export async function query(params?: TableListParams) {
  return request('/api/demo/client/query', {
    params,
  });
}

export async function show(params) {
  return request('/api/demo/client/show', {
    params,
  });
}
