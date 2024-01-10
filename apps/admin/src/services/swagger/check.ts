// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /_health */
export async function check(options?: { [key: string]: any }) {
  return request<{
    status?: string;
    info?: Record<string, any>;
    error?: Record<string, any>;
    details?: Record<string, any>;
  }>('/_health', {
    method: 'GET',
    ...(options || {}),
  });
}
