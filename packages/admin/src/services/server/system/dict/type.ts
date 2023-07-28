import { request } from '@umijs/max';

// 查询字典类型列表
export async function listType(query) {
  return request('/api/system/dict/type', {
    method: 'GET',
    params: query,
  });
}

// 查询字典类型详情
export function getType(dictId) {
  return request(`/api/system/dict/type/${dictId}`, {
    method: 'GET',
  });
}

// 新增字典类型
export function addType(data) {
  return request('/api/system/dict/type', {
    method: 'POST',
    data,
  });
}

// 修改字典类型
export function updateType(data) {
  return request(`/api/system/dict/type`, {
    method: 'PUT',
    data,
  });
}

// 删除字典类型
export function deleteType(dictId) {
  return request(`/api/system/dict/type/${dictId}`, {
    method: 'DELETE',
  });
}

// 刷新字典缓存
export function refreshCache() {
  return request(`/api/system/dict/type/refreshCache`, {
    mehod: 'DELETE',
  });
}

// 获取字典选择框列表
export function optionselect() {
  return request(`/api/system/dict/type/optionselect`, {
    method: 'GET',
  });
}
