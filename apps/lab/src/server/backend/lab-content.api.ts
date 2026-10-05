import { labApi } from './http-client'

const STICKER_BASE = '/api/lab/sticker'
const FAVICON_BASE = '/api/lab/favicon-gen'
const GUIDE_BASE = '/api/lab/apple-guide'
const LINK_BASE = '/api/lab/link'
const USER_BASE = '/api/lab/user'

export const labStickerApi = {
  create: (input: {
    object: string
    color: string
    accessory: string
    doing: string
    style: string
    url: string
    deviceId?: string | null
    userId?: string | null
  }) => labApi.post<any>(`${STICKER_BASE}/create`, input),

  list: (input: {
    userId?: string | null
    page?: number
    take?: number
    live?: boolean
  }) => labApi.get<any[]>(`${STICKER_BASE}/list`, input),

  getById: (id: string) => labApi.get<any>(`${STICKER_BASE}/get-by-id`, { id }),

  hide: (input: { id: string }) =>
    labApi.post<any>(`${STICKER_BASE}/hide`, input),

  isAdmin: (userId: string) =>
    labApi.get<boolean>(`${STICKER_BASE}/is-admin`, { userId }),
}

export const labFaviconGenApi = {
  create: (input: any) => labApi.post<any>(`${FAVICON_BASE}/create`, input),

  list: (input: {
    userId?: string | null
    page?: number
    take?: number
    live?: boolean
  }) => labApi.get<any[]>(`${FAVICON_BASE}/list`, input),
}

export const labAppleGuideApi = {
  getAll: () => labApi.get<any[]>(`${GUIDE_BASE}/list`),
}

export const labLinkApi = {
  getLinks: () => labApi.get<any[]>(`${LINK_BASE}/list`),
}

export const labUserApi = {
  getUserPublicById: (id: string) =>
    labApi.get<any>(`${USER_BASE}/public-profile`, { id }),

  isAdmin: (userId: string) =>
    labApi.get<boolean>(`${USER_BASE}/is-admin`, { userId }),

  getSubscriptionFields: (userId: string) =>
    labApi.get<{
      subscriptionId: string | null
      currentPeriodEnd: number | null
      customerId: string | null
      variantId: number | null
    } | null>(`${USER_BASE}/subscription`, { userId }),

  getUserBasic: (userId: string) =>
    labApi.get<{ id: string; email: string; username: string | null } | null>(
      `${USER_BASE}/basic`,
      { userId },
    ),
}
