import { BaseService } from '@/services/base'
import { request } from '@umijs/max'
import { TableListItem, TableListParams } from './data.d'

export class SupplyCompanyService extends BaseService {
  constructor() {
    super('companies/supplies')
  }

  public static async create(params: TableListItem) {
    return request('/api/demo/client/create', {
      method: 'POST',
      data: {
        ...params,
        method: 'post',
      },
    })
  }

  public static async remove(params) {
    return request('/api/demo/client/remove', {
      method: 'delete',
      data: {
        id: params,
      },
    })
  }

  public static async update(params: TableListParams) {
    return request('/api/demo/client/update', {
      method: 'POST',
      data: {
        ...params,
        method: 'update',
      },
    })
  }

  public static async list(params?: TableListParams) {
    return request('/api/companies/supplies', {
      params,
    })
  }

  public static async get(params?: TableListParams) {
    return request('/api/demo/client/get', {
      params,
    })
  }
}

export async function create(params: TableListItem) {
  return request('/api/companies/supplies', {
    method: 'POST',
    data: {
      ...params,
    },
  })
}

export async function remove(params) {
  return request('/api/demo/client/remove', {
    method: 'delete',
    data: {
      id: params,
    },
  })
}

export async function update(params: TableListParams) {
  return request('/api/demo/client/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  })
}

export async function list(params?: TableListParams) {
  return request('/api/companies/supplies', {
    params,
  })
}

export async function get(params?: TableListParams) {
  return request('/api/demo/client/get', {
    params,
  })
}
