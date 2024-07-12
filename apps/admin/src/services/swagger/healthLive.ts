// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 此处后端没有提供注释 GET /_health/live */
export async function healthLive(options?: { [key: string]: any }) {
  return request<any>('/_health/live', {
    method: 'GET',
    ...(options || {}),
  })
}
