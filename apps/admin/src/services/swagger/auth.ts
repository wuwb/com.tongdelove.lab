// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 此处后端没有提供注释 DELETE /api/base/auth */
export async function remote(options?: { [key: string]: any }) {
  return request<any>('/api/base/auth', {
    method: 'DELETE',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /api/base/auth/refresh */
export async function refresh(options?: { [key: string]: any }) {
  return request<any>('/api/base/auth/refresh', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /api/base/auth/verifyemail */
export async function verifyemail(options?: { [key: string]: any }) {
  return request<any>('/api/base/auth/verifyemail', {
    method: 'POST',
    ...(options || {}),
  })
}
