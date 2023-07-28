import { request } from '@umijs/max';

// 查询部门列表
export function listDept(query) {
  return request('/api/system/dept', {
    method: 'get',
    params: query,
  });
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request('/api/system/dept/exclude/' + deptId, {
    method: 'get',
  });
}

// 查询部门详细
export function getDept(deptId) {
  return request('/api/system/dept/' + deptId, {
    method: 'get',
  });
}

// 新增部门
export function createDept(data) {
  return request('/api/system/dept', {
    method: 'post',
    data: data,
  });
}

// 修改部门
export function updateDept(data) {
  return request('/system/dept', {
    method: 'put',
    data: data,
  });
}

// 删除部门
export function deleteDept(deptId) {
  return request('/api/system/dept/' + deptId, {
    method: 'delete',
  });
}
