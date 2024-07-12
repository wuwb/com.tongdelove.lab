// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 此处后端没有提供注释 GET /api/system/auth/list-menus */
export async function listMenus(options?: { [key: string]: any }) {
  return request<any>('/api/system/auth/list-menus', {
    method: 'GET',
    ...(options || {}),
  })
}
