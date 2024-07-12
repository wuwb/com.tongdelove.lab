import { request } from '@umijs/max'

// 查询字典数据列表
export async function listData(query) {
  return request('/api/system/dict/data', {
    method: 'GET',
    params: query,
  })
}

// 查询字典数据详情
export async function getData(dictCode) {
  return request(`/api/system/dict/data/${dictCode}`, {
    method: 'GET',
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request(`/api/system/dict/data/type/${dictType}`, {
    method: 'GET',
  })
}

// 新增字典数据
export function addData(data) {
  return request(`/api/system/dict/data`, {
    method: 'POST',
    data,
  })
}

// 修改字典数据
export function updateData(data) {
  return request('/api/system/dict/data', {
    method: 'PUT',
    data,
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request('/api/system/dict/data/' + dictCode, {
    method: 'DELETE',
  })
}
