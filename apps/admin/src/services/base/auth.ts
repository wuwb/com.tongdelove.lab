import { request } from '@umijs/max'

export interface LoginParamsType {
  username: string
  password: string
  mobile: string
  captcha: string
  type: string
}

// 登录接口
export async function login(
  params: LoginParamsType,
  options?: { [key: string]: any },
) {
  return request<API.LoginResult>('/api/base/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  })
}

// 退出登录
export async function logout(options = {}) {
  return request('/api/base/logout', {
    method: 'GET',
    ...options,
  })
}

export async function register(params) {
  return request('/api/base/auth/register', {
    method: 'POST',
    data: params,
  })
}

export async function captcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/login/account', {
    method: 'POST',
    data: params,
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}
