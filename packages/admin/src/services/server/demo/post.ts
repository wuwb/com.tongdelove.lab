import * as BaseRequest from '../BaseRequest';

export async function create(params?) {
  return BaseRequest.create(`demo/post`, params);
}

export async function remove(params?) {
  return BaseRequest.remove(`demo/post`, params);
}

export async function update(params?) {
  return BaseRequest.update(`demo/post`, params);
}

export async function list(params?) {
  return BaseRequest.list(`demo/post`, params);
}

export async function get(params?) {
  return BaseRequest.get(`demo/post`, params);
}

export async function order(params?) {
  return BaseRequest.order(`demo/post`, params);
}
