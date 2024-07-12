// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 查询账号列表 根据条件查询账号列表 GET /api/account */
export async function accountList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.accountListParams,
  options?: { [key: string]: any },
) {
  return request<API.AccountResDto[]>('/api/account', {
    method: 'GET',
    params: {
      // limit has a default value: 10
      limit: '10',
      // page has a default value: 1
      page: '1',

      ...params,
    },
    ...(options || {}),
  })
}

/** 创建账号 创建账号 POST /api/account */
export async function createAccount(
  body: API.CreateAccountDto,
  options?: { [key: string]: any },
) {
  return request<string>('/api/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询账号信息 根据账号id查询账号信息 GET /api/account/${param0} */
export async function accountById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.accountByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<API.AccountResDto>(`/api/account/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 删除账号 根据id删除账号 DELETE /api/account/${param0} */
export async function removeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<string>(`/api/account/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 修改账号信息 根据账号id修改账号信息 PATCH /api/account/${param0} */
export async function updateById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateByIdParams,
  body: API.UpdateAccountDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params
  return request<string>(`/api/account/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /api/account/current */
export async function findCurrentUser(options?: { [key: string]: any }) {
  return request<any>('/api/account/current', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 修改密码 根据账号自己的密码 POST /api/account/modify_password */
export async function updatePassWordById(
  body: API.ModifyPasswordDto,
  options?: { [key: string]: any },
) {
  return request<string>('/api/account/modify_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 重置为默认密码 根据id重置默认密码 POST /api/account/reset_password */
export async function resetPassword(options?: { [key: string]: any }) {
  return request<string>('/api/account/reset_password', {
    method: 'POST',
    ...(options || {}),
  })
}
