import { request } from '@umijs/max';
import { TableListParams, TableListItem } from './data.d';
import { BaseService } from '@/services/base';

export class SupplyCompanyService extends BaseService {
  constructor() {
    super('companies/supplies');
  }

  public static async create(params: TableListItem) {
    return request('/api/demo/client/create', {
      method: 'POST',
      data: {
        ...params,
        method: 'post',
      },
    });
  }

  public static async remove(params) {
    return request('/api/demo/client/remove', {
      method: 'delete',
      data: {
        id: params
      },
    });
  }

  public static async update(params: TableListParams) {
    return request('/api/demo/client/update', {
      method: 'POST',
      data: {
        ...params,
        method: 'update',
      },
    });
  }

  public static async list(params?: TableListParams) {
    return request('/api/companies/supplies', {
      params,
    });
  }

  public static async get(params?: TableListParams) {
    return request('/api/post', {
      params,
    });
  }
}

export async function create(params: TableListItem) {
  return request('/api/post/', {
    method: 'POST',
    data: {
      ...params,
      postStatus: 'publish',
    },
  });
}

export async function remove(params) {
  return request('/api/demo/client/remove', {
    method: 'delete',
    data: {
      id: params
    },
  });
}

export async function update(params: TableListParams) {
  return request('/api/demo/client/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function list(params?: TableListParams) {
  return request('/api/post', {
    params,
  });
}

export async function get(params?: TableListParams) {
  return request(`/api/post/${params.id}`);
}

export async function order(params: any) {
  return request('/api/demo/client/get', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
