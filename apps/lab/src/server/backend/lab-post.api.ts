import { labApi } from './http-client'

const BASE = '/api/lab/post'

export const labPostApi = {
  getById: (id: string) => labApi.get<any>(`${BASE}/${id}`),

  list: (options?: { limit?: number; offset?: number }) =>
    labApi.get<any[]>(BASE, options),
}
