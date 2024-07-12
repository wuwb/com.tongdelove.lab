import { request } from '@umijs/max'

export class BaseService {
  path: string

  constructor(path: string) {
    this.path = path
  }

  async create(params) {
    return request(`/api/${this.path}/create`, {
      method: 'POST',
      data: {
        ...params,
      },
    })
  }

  async remove(params) {
    return request(`/api/${this.path}/remove`, {
      method: 'DELETE',
      data: {
        ...params,
      },
    })
  }

  async update(params) {
    return request(`/api/${this.path}/update`, {
      method: 'PUT',
      data: {
        ...params,
      },
    })
  }

  async list(params) {
    return request(`/api/${this.path}/list`, {
      params,
    })
  }

  async get(params) {
    return request(`/api/${this.path}/get`, {
      params,
    })
  }

  async order(params) {
    return request(`/api/${this.path}/order`, {
      method: 'PATCH',
      data: {
        ...params,
      },
    })
  }
}
