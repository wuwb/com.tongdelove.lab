import { request } from '@umijs/max'

export interface LoginParamsType {
  username: string
  password: string
  mobile: string
  code: string
  codeId: string
  type: string
}

export async function getImageCaptcha() {
  return request('/api/base/login/captcha-image-svg', {
    method: 'GET',
  })
}

export async function captcha(mobile: string) {
  return request(`/api/base/login/captcha?mobile=${mobile}`)
}

// 登录接口
export async function login(params: Partial<LoginParamsType>) {
  return request<API.LoginResult>('/api/base/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  })
}

// 退出登录
export async function logout(options = {}) {
  return request('/api/base/logout', {
    method: 'GET',
    ...options,
  })
}

// 注册
export async function register(params) {
  return request('/api/base/auth/register', {
    method: 'POST',
    data: params,
  })
}
