import { request } from '@umijs/max';
import type { TableListParams, TableListItem } from './user.d';

export async function queryUser(options?: { [key: string]: any }) {
    return request('/api/base/user', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function showUser(params?: TableListParams) {
    return request<API.Response<TableListItem>>('/api/base/user/show', {
        params,
    });
}

export async function removeUser(params: { id: string[] }) {
    return request('/api/base/user/remove', {
        method: 'DELETE',
        data: {
            ...params,
        },
    });
}

export async function createUser(params: TableListItem, options = {}) {
    return request<API.Response>('/api/base/user/create', {
        method: 'POST',
        data: params,
        ...options
    });
}

export async function updateUser(params: TableListItem) {
    return request<API.Response>('/api/base/user/update', {
        method: 'PUT',
        data: {
            ...params,
        },
    });
}

export async function queryCurrentUser(options = {}) {
    return request<API.CurrentUser>('/api/base/user/current-user', {
        method: 'GET',
        ...options
    });
}

export async function getNotices(options?: { [key: string]: any }) {
    return request<API.NoticeIconList>('/api/notices', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function getUserByName(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.getUserByNameParams,
    options?: { [key: string]: any },
) {
    const { username: param0, ...queryParams } = params;
    return request<API.User>(`/user/${param0}`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}

export async function updateUser2(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.updateUserParams,
    body: API.User,
    options?: { [key: string]: any },
) {
    const { username: param0, ...queryParams } = params;
    return request<any>(`/user/${param0}`, {
        method: 'PUT',
        params: { ...queryParams },
        data: body,
        ...(options || {}),
    });
}

export async function deleteUser(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.deleteUserParams,
    options?: { [key: string]: any },
) {
    const { username: param0, ...queryParams } = params;
    return request<any>(`/user/${param0}`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}

export async function createUsersWithArrayInput(
    body: API.User[],
    options?: { [key: string]: any },
) {
    return request<any>('/user/createWithArray', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** Creates list of users with given input array POST /user/createWithList */
export async function createUsersWithListInput(body: API.User[], options?: { [key: string]: any }) {
    return request<any>('/user/createWithList', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

// 获取用户信息
export const getUserInfo = (data) => {
    return request('/user/info', {
        method: "GET",
        data,
    });
};

// 获取用户关注、发帖信息
export const getPersonalInfo = (data) => {
    return request('/user/personal', {
        method: "GET",
        data,
    });
};

// 更新用户信息
export const updatePersonalInfo = (data) => {
    return request('/user/update', {
        method: "POST",
        data,
    });
};

// 新增帖子
export const addTopic = (data) => {
    return request('/topic/add', {
        method: "POST",
        data,
    });
};

// 点赞
export const topicLike = (data) => {
    return request('/topic/like', {
        method: "PUT",
        data,
    });
};

// 获取好友帖子列表
export const frientTopicList = (data) => {
    return request('/topic/friend/list', {
        method: "GET",
        data,
    });
};

// 添加评论
export const addDiscuss = (data) => {
    return request('/topic/discuss/add', {
        method: "POST",
        data,
    });
};
// 帖子
export const searchTopic = (data) => {
    return request('/topic/search', {
        method: "GET",
        data,
    });
};

// 未关注列表
export const friendList = (data) => {
    return request('/friend/list', {
        method: "GET",
        data,
    });
};

// 关注
export const followUser = (data) => {
    return request('/friend/follow', {
        method: "POST",
        data,
    });
};

// 关注
export const getToken = (data) => {
    return request('/handle/upload/get-token', {
        method: "GET",
        data,
    });
};
