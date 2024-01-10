// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询角色列表 查询角色 GET /api/system/role */
export async function findRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.RoleResDto[]>('/api/system/role', {
    method: 'GET',
    params: {
      // limit has a default value: 10
      limit: '10',
      // page has a default value: 1
      page: '1',

      ...params,
    },
    ...(options || {}),
  });
}

/** 创建角色 创建角色 POST /api/system/role */
export async function createRole(body: API.CreateRoleDto, options?: { [key: string]: any }) {
  return request<string>('/api/system/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询角色 根据角色id查询角色 GET /api/system/role/${param0} */
export async function roleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleResDto>(`/api/system/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色 根据角色id删除角色 DELETE /api/system/role/${param0} */
export async function destroyRoleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.destroyRoleByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/system/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改角色 根据角色id修改角色 PATCH /api/system/role/${param0} */
export async function modifyRoleById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyRoleByIdParams,
  body: API.UpdateRoleDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/system/role/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
