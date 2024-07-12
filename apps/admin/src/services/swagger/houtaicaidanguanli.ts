// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 获取菜单列表 获取菜单 GET /api/menus */
export async function menusList(options?: { [key: string]: any }) {
  return request<API.MenusListResDto[]>('/api/menus', {
    method: 'GET',
    ...(options || {}),
  })
}
