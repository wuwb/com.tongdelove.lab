// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 根据全部的角色 给账号分配角色的时候使用 GET /api/asystem/account/account-role */
export async function roleList(options?: { [key: string]: any }) {
  return request<API.RoleAccountListDto[]>(
    '/api/asystem/account/account-role',
    {
      method: 'GET',
      ...(options || {}),
    },
  )
}

/** 给账号分配角色 给当前账号分配角色 POST /api/asystem/account/account-role */
export async function distributionRole(
  body: API.DistributionRoleDto,
  options?: { [key: string]: any },
) {
  return request<string>('/api/asystem/account/account-role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 获取角色列表 根据当前的账号id获取角色已经授权的角色 GET /api/asystem/account/account-role/${param0} */
export async function accountRoleListByAccountId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.accountRoleListByAccountIdParams,
  options?: { [key: string]: any },
) {
  const { accountId: param0, ...queryParams } = params
  return request<API.AccountRoleListResDto[]>(
    `/api/asystem/account/account-role/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  )
}
