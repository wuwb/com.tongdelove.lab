import { request } from "umi";

export async function queryProducts(params) {
  return request('/api/demo/product/query', {
    params,
  });
}

export async function showProduct(path: string) {
  return request(`/api/demo/product/show?path=${path}`);
}
