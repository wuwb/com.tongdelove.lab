import type { Adapter } from 'next-auth/adapters'
import { labApi } from '@/server/backend/http-client'

/**
 * NextAuth 的远程适配器：把 user/account/session 的读写转发给 services/server。
 *
 * 原先这里使用 PrismaAdapter + PrismaClient，lab 需要直连数据库。
 * 改为前后端分离后，lab 不再持有数据库连接，认证数据由 server 统一管理。
 */

const BASE = '/api/lab/auth'

/**
 * 将 JSON 字符串（如 Date 字段）还原为 Date。
 */
const reviveDate = <T>(value: T): T => {
  if (typeof value === 'string') {
    // 仅还原 ISO 8601 格式的时间字符串
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value) as unknown as T
    }
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => reviveDate(item)) as unknown as T
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) {
      result[key] = reviveDate(item)
    }
    return result as T
  }
  return value
}

export function LabAuthAdapter(): Adapter {
  return {
    async createUser(data) {
      return reviveDate(
        await labApi.post(`${BASE}/user`, {
          ...data,
          emailVerified: data.emailVerified
            ? data.emailVerified.toISOString()
            : null,
        }),
      )
    },

    async getUser(id) {
      return reviveDate(
        await labApi.get(`${BASE}/user/${encodeURIComponent(id)}`),
      )
    },

    async getUserByEmail(email) {
      return reviveDate(
        await labApi.get(`${BASE}/user/email/${encodeURIComponent(email)}`),
      )
    },

    async getUserByAccount({ provider, providerAccountId }) {
      return reviveDate(
        await labApi.get(
          `${BASE}/user/account/${encodeURIComponent(provider)}/${encodeURIComponent(providerAccountId)}`,
        ),
      )
    },

    async updateUser(data) {
      return reviveDate(
        await labApi.put(`${BASE}/user`, {
          ...data,
          emailVerified: data.emailVerified
            ? data.emailVerified.toISOString()
            : undefined,
        }),
      )
    },

    async deleteUser(userId) {
      await labApi.del(`${BASE}/user/${encodeURIComponent(userId)}`)
    },

    async createAccount(data) {
      return reviveDate(await labApi.post(`${BASE}/account`, data))
    },

    async getAccountById(accountId) {
      return reviveDate(
        await labApi.get(`${BASE}/account/${encodeURIComponent(accountId)}`),
      )
    },

    async updateAccount(data) {
      return reviveDate(await labApi.put(`${BASE}/account`, data))
    },

    async deleteAccount(provider, providerAccountId) {
      await labApi.del(
        `${BASE}/account/${encodeURIComponent(provider)}/${encodeURIComponent(providerAccountId)}`,
      )
    },

    async createSession(data) {
      return reviveDate(
        await labApi.post(`${BASE}/session`, {
          ...data,
          expires: data.expires.toISOString(),
        }),
      )
    },

    async getSessionAndUser(sessionToken) {
      return reviveDate(
        await labApi.get(`${BASE}/session/${encodeURIComponent(sessionToken)}`),
      )
    },

    async updateSession(data) {
      return reviveDate(
        await labApi.put(`${BASE}/session`, {
          ...data,
          expires: data.expires ? data.expires.toISOString() : undefined,
        }),
      )
    },

    async deleteSession(sessionToken) {
      await labApi.del(`${BASE}/session/${encodeURIComponent(sessionToken)}`)
    },
  } as unknown as Adapter
}
