import { labApi } from './http-client'

const BASE = '/api/lab/poem'

/** 与原 apps/lab 的 poem 系列 tRPC router 对应的服务端接口封装 */
export const labPoemApi = {
  count: () => labApi.get<number>(`${BASE}/count`),

  /** 诗词列表（含 keywords），供 SearchPoemsQuery 使用 */
  searchWithKeywords: (input: { limit?: number; offset?: number }) =>
    labApi.get<any[]>(`${BASE}/search-with-keywords`, input),

  search: (keyword: string) => labApi.get<any[]>(`${BASE}/search`, { keyword }),

  sitemap: () =>
    labApi.get<Array<{ id: number; updatedAt: string }>>(`${BASE}/sitemap`),

  find: (input: { page?: number; pageSize?: number; sort?: string }) =>
    labApi.get<any>(`${BASE}/find`, input),

  isSame: (input: { authorId: number; title: string }) =>
    labApi.get<boolean>(`${BASE}/is-same`, input),

  findByAuthorId: (input: {
    authorId: number
    page?: number
    pageSize?: number
    select?: string[]
  }) => labApi.get<any>(`${BASE}/find-by-author`, input),

  findById: (id: number) => labApi.get<any>(`${BASE}/find-by-id`, { id }),

  findByTagId: (input: { id: number; page?: number; pageSize?: number }) =>
    labApi.get<any>(`${BASE}/find-by-tag`, input),

  deleteById: (input: { id: number; token: string }) =>
    labApi.post<any>(`${BASE}/delete`, input),

  genTranslation: (input: { token: string; content: string }) =>
    labApi.post<string>(`${BASE}/gen-translation`, input),
}

export const labPoemAuthorApi = {
  count: () => labApi.get<number>(`${BASE}/author/count`),

  sitemap: () =>
    labApi.get<Array<{ id: number; updatedAt: string }>>(
      `${BASE}/author/sitemap`,
    ),

  findMany: (input: { page?: number; pageSize?: number; keyword?: string }) =>
    labApi.get<any>(`${BASE}/author/find`, input),

  findById: (id: number) =>
    labApi.get<any>(`${BASE}/author/find-by-id`, { id }),

  findNotPoem: () => labApi.get<any[]>(`${BASE}/author/find-not-poem`),

  create: (input: any) => labApi.post<any>(`${BASE}/author/create`, input),

  deleteById: (input: { id: number; token: string }) =>
    labApi.post<any>(`${BASE}/author/delete`, input),
}

export const labPoemTagApi = {
  findMany: (input: {
    type?: string | null
    page?: number
    pageSize?: number
  }) => labApi.get<any>(`${BASE}/tag/find`, input),

  count: () => labApi.get<[number, number]>(`${BASE}/tag/count`),

  sitemap: (type?: string) =>
    labApi.get<any[]>(`${BASE}/tag/sitemap`, { type }),

  findById: (id: number) => labApi.get<any>(`${BASE}/tag/find-by-id`, { id }),

  findStatisticsById: (id: number) =>
    labApi.get<any>(`${BASE}/tag/find-statistics-by-id`, { id }),

  connectPoemIds: (input: { token: string; ids: number[]; tagId: number }) =>
    labApi.post<any>(`${BASE}/tag/connect-poems`, input),

  create: (input: any) => labApi.post<any>(`${BASE}/tag/create`, input),

  deleteById: (id: number) => labApi.post<any>(`${BASE}/tag/delete`, { id }),
}

export const labPoemCardApi = {
  count: () => labApi.get<number>(`${BASE}/card/count`),

  find: (input: { page?: number; pageSize?: number }) =>
    labApi.get<any>(`${BASE}/card/find`, input),

  random: () => labApi.get<any[]>(`${BASE}/card/random`),

  getGenerateCard: (input: {
    token: string
    page?: number
    tagName?: string
  }) => labApi.get<any>(`${BASE}/card/need-create`, input),

  createCardItem: (input: {
    token: string
    poemId: number
    content: string
    url: string
  }) => labApi.post<any>(`${BASE}/card/create`, input),

  findNeedCreateByQuota: (input: { token: string; quotas: string[] }) =>
    labApi.post<any>(`${BASE}/card/find-by-quota`, input),
}
