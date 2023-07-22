// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/base/login */
export async function login(body: API.LoginDto, options?: { [key: string]: any }) {
  return request<any>('/api/base/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/base/login/captcha-image-code */
export async function getImageCode(options?: { [key: string]: any }) {
  return request<any>('/api/base/login/captcha-image-code', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/base/login/captcha-image-svg */
export async function captchaImage(options?: { [key: string]: any }) {
  return request<any>('/api/base/login/captcha-image-svg', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/base/login/forgot-password */
export async function forgotPassword(
  body: API.ForgotPasswordDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/base/login/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/base/login/get-info */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<any>('/api/base/login/get-info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/base/login/get-routers */
export async function getRouters(options?: { [key: string]: any }) {
  return request<any>('/api/base/login/get-routers', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/base/login/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<any>('/api/base/login/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/base/login/reset-password */
export async function resetPassword(body: API.ResetPasswordDto, options?: { [key: string]: any }) {
  return request<any>('/api/base/login/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
