// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 用户登录 用户名可以是手机号码、邮箱、用户名 POST /api/account/login */
export async function adminLogin(
  body: API.LoginDto,
  options?: { [key: string]: any },
) {
  return request<API.LoginResDto>('/api/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
