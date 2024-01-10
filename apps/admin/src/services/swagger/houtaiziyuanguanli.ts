// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取资源列表 分页获取资源列表(顶层的) GET /api/access */
export async function accessListPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.accessListPageParams,
  options?: { [key: string]: any },
) {
  return request<API.AccessResDto[]>('/api/access', {
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

/** 创建资源 创建资源 POST /api/access */
export async function createAccess(body: API.CreateAccessDto, options?: { [key: string]: any }) {
  return request<string>('/api/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除资源 根据资源ID删除资源 DELETE /api/access/${param0} */
export async function destroyAccessById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.destroyAccessByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/access/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改资源 根据资源ID修改资源 PATCH /api/access/${param0} */
export async function modifyAccessById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyAccessByIdParams,
  body: API.UpdateAccessDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/access/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取菜单 获取全部的菜单(不分页,给角色分配资源使用) GET /api/access/access_list */
export async function accessList(options?: { [key: string]: any }) {
  return request<API.AccessResDto[]>('/api/access/access_list', {
    method: 'GET',
    ...(options || {}),
  });
}
