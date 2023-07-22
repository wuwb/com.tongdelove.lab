import { request } from '@umijs/max';
import type { TableListParams, TableListItem } from './user.d';

export async function queryWebsite(options?: { [key: string]: any }) {
    return request('/api/link', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function showWebsite(params?: TableListParams) {
    return request<API.Response<TableListItem>>(`/api/link/${params.id}`);
}

export async function removeWebsite(params: { id: string[] }) {
    return request('/api/link', {
        method: 'DELETE',
        data: {
            ...params,
        },
    });
}

export async function createWebsite(params: TableListItem, options = {}) {
    return request<API.Response>('/api/link', {
        method: 'POST',
        data: params,
        ...options
    });
}

export async function updateWebsite(params: TableListItem, options = {}) {
    return request<API.Response>('/api/link', {
        method: 'PUT',
        data: params,
        ...options
    });
}
