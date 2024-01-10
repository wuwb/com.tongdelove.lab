// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取资源 根据角色ID获取已经分配的菜单或接口 GET /api/role_access/${param0}/${param1} */
export async function accessListByRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.accessListByRoleIdParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, type: param1, ...queryParams } = params;
  return request<API.RoleAccessResDto[]>(`/api/role_access/${param0}/${param1}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取全部的API 获取全部的API(可授权) GET /api/role_access/all_api */
export async function allApi(options?: { [key: string]: any }) {
  return request<any>('/api/role_access/all_api', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取全部的菜单 获取全部的菜单(可授权) GET /api/role_access/all_menus */
export async function allMenus(options?: { [key: string]: any }) {
  return request<any>('/api/role_access/all_menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 给角色分配菜单资源 根据角色ID给当前角色分配菜单或接口资源 PATCH /api/role_access/menus/${param0} */
export async function roleToAccess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleToAccessParams,
  body: API.RoleAccessReqDto,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<string>(`/api/role_access/menus/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
