// @ts-ignore
/* eslint-disable */
// API 更新时间：
// API 唯一标识：
// import * as api from './api';
// import * as login from './login';
// export default {
//   api,
//   login,
// };

import { request } from '@umijs/max';

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}
