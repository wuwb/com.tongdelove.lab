import { request } from '@umijs/max';
import { TableListParams, TableListItem } from '@/services/base/admin/user.d';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

/** 登录接口 POST /api/login/account */
export async function login(body: LoginParamsType, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function logout() {
  return request('/api/base/auth/logout');
}

export async function register(params) {
  return request('/api/base/auth/register', {
    method: 'POST',
    data: params,
  });
}

export async function captcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
