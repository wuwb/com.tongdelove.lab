import { request } from '@umijs/max'

export async function create(path: string, params) {
  return request(`/api/${path}/create`, {
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function remove(path: string, params) {
  return request(`/api/${path}/remove`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  })
}

export async function update(path: string, params) {
  return request(`/api/${path}/update`, {
    method: 'PUT',
    data: {
      ...params,
    },
  })
}

export async function list(path: string, params) {
  return request(`/api/${path}/list`, {
    params,
  })
}

export async function get(path: string, params) {
  return request(`/api/${path}/get`, {
    params,
  })
}

export async function order(path: string, params) {
  return request(`/api/${path}/order`, {
    method: 'PATCH',
    data: {
      ...params,
    },
  })
}
