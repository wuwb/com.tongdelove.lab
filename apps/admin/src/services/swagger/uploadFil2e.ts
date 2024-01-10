// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/common/storage/alioss */
export async function uploadFil2e(options?: { [key: string]: any }) {
  return request<any>('/api/common/storage/alioss', {
    method: 'POST',
    ...(options || {}),
  });
}
