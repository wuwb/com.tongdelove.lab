// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET / */
export async function index(options?: { [key: string]: any }) {
  return request<any>('/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /about */
export async function about(options?: { [key: string]: any }) {
  return request<any>('/about', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api */
export async function getRoot(options?: { [key: string]: any }) {
  return request<any>('/api', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dashboard */
export async function adminIndex(options?: { [key: string]: any }) {
  return request<any>('/dashboard', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /favicon.ico */
export async function favicon(options?: { [key: string]: any }) {
  return request<any>('/favicon.ico', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /tools/blood */
export async function blood(options?: { [key: string]: any }) {
  return request<any>('/tools/blood', {
    method: 'GET',
    ...(options || {}),
  });
}
