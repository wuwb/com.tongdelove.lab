import { request } from '@umijs/max';

export async function getPost(id) {
  return request(`/api/posts/${id}`);
}

export async function listPosts() {
  return request(`/api/posts`);
}

export async function createPost(params, options?: { [key: string]: any }) {
  return request('/api/posts', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
