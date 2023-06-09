import { request } from '@umijs/max';
import { TableListParams, TableListItem } from '@/services/base/user.d';

export interface LoginParamsType {
    username: string;
    password: string;
    mobile: string;
    captcha: string;
    type: string;
}

export async function queryUsers() {
    return request<API.CurrentUser[]>('/api/users');
}

// 获取用户信息
export async function queryCurrentUser() {
    return request<API.CurrentUser>('/api/currentUser');
}

/** 获取当前的用户 GET /api/currentUser */
export async function queryUserProfile(options?: { [key: string]: any }) {
    return request<{
        data: API.CurrentUser;
    }>('/api/user/profile', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function queryNotices(): Promise<any> {
    return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

export const updatePersonalInfo = () => { };
export const searchTopic = () => { };



