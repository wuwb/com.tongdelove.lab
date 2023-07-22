// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /signin */
export async function signin(options?: { [key: string]: any }) {
  return request<any>('/signin', {
    method: 'GET',
    ...(options || {}),
  });
}
