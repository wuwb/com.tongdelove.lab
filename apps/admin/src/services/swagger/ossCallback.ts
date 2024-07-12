// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 此处后端没有提供注释 POST /api/common/storage/alioss/callback */
export async function ossCallback(options?: { [key: string]: any }) {
  return request<any>('/api/common/storage/alioss/callback', {
    method: 'POST',
    ...(options || {}),
  })
}
