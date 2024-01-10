// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/common/storage/alioss/policy */
export async function ossPolicy(options?: { [key: string]: any }) {
  return request<any>('/api/common/storage/alioss/policy', {
    method: 'GET',
    ...(options || {}),
  });
}
