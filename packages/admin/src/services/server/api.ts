// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { MenuDataItem } from '@ant-design/pro-components';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/admins/info', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function queryCurrentMenu(options?: { [key: string]: any }) {
  return request<MenuDataItem[]>('/api/menus/backend', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

// 注册
export async function register(options?) {
  return request('/login/register', {
    method: 'POST',
    ...(options || {}),
  });
};

// 登录
export async function login(options?) {
  return request('/login', {
    method: 'POST',
    ...(options || {}),
  });
};
// 退出登录
export async function signout(options?) {
  return request('/login/signout', {
    method: 'GET',
    ...(options || {}),
  });
};

// 获取用户信息
export async function getUserInfo(options?) {
  return request('/user/info', {
    method: 'GET',
    ...(options || {}),
  });
};

// 获取用户关注、发帖信息
export async function getPersonalInfo(options?) {
  return request('/user/personal', {
    method: 'GET',
    ...(options || {}),
  });
};

// 更新用户信息
export async function updatePersonalInfo(options?) {
  return request('/user/update', {
    method: 'POST',
    ...(options || {}),
  });
};

// 新增帖子
export async function addTopic(options?) {
  return request('/topic/add', {
    method: 'POST',
    ...(options || {}),
  });
};

// 点赞
export async function topicLike(options?) {
  return request('/topic/like', {
    method: 'PUT',
    ...(options || {}),
  });
};

// 获取好友帖子列表
export async function frientTopicList(options?) {
  return request('/topic/friend/list', {
    method: 'GET',
    ...(options || {}),
  });
};

// 添加评论
export async function addDiscuss(options?) {
  return request('/topic/discuss/add', {
    method: 'POST',
    ...(options || {}),
  });
};
// 帖子
export async function searchTopic(options?) {
  return request.get('/topic/search', {
    method: 'GET',
    ...(options || {}),
  });
};

// 未关注列表
export async function friendList(options?) {
  return request.get('/friend/list', {
    method: 'GET',
    ...(options || {}),
  });
};

// 关注
export async function followUser(options?) {
  return request('/friend/follow', {
    method: 'POST',
    ...(options || {}),
  });
};

// 关注
export async function getToken(options?) {
  return request('/handle/upload/get-token', {
    method: 'GET',
    ...(options || {}),
  });
};
