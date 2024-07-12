// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max'

/** 此处后端没有提供注释 GET /signup */
export async function signup(options?: { [key: string]: any }) {
  return request<any>('/signup', {
    method: 'GET',
    ...(options || {}),
  })
}
