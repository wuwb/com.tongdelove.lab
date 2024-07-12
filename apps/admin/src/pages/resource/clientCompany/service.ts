import { request } from '@umijs/max'
import { BasicListItemDataType } from './data.d'

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number
}

export async function create(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  })
}

export async function remove(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  })
}

export async function update(params: ParamsType) {
  const { count = 5, ...restParams } = params
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  })
}

export async function list(params: ParamsType) {
  return request('/api/fake_list', {
    params,
  })
}
