import { request } from '@umijs/max';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

// 获取用户信息
export async function getUserInfo() {
  return request('/api/currentUser');
}

export const updatePersonalInfo = () => { };

export const searchTopic = () => { };
export const signout = () => { };
