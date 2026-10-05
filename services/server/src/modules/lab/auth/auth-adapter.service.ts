import { Injectable, Logger } from '@nestjs/common'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { accounts, sessions, users } from '@/core/database/drizzle/schema'

/**
 * NextAuth (Auth.js) 适配器的服务端实现。
 *
 * 原先 apps/lab 通过 PrismaAdapter 直连数据库保存 user/account/session，
 * 现在改为由 services/server 持有这三张表，并通过 HTTP 暴露给 lab 使用，
 * 从而让 lab 不再依赖数据库。
 *
 * 字段按 Auth.js Adapter 的约定返回（camelCase），
 * 数据库内部使用 snake_case / 业务字段名，通过 select 显式映射。
 */
@Injectable()
export class LabAuthAdapterService {
  private readonly logger = new Logger(LabAuthAdapterService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  // ------------------------------------------------------------- 字段映射

  private mapUser(row: typeof users.$inferSelect) {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      emailVerified: row.emailVerified,
      image: row.image,
      role: row.role,
      username: row.username,
    }
  }

  private mapAccount(row: typeof accounts.$inferSelect) {
    return {
      id: row.id,
      userId: row.userId,
      type: row.type,
      provider: row.provider,
      providerAccountId: row.providerAccountId,
      refreshToken: row.refreshToken,
      accessToken: row.accessToken,
      expiresAt: row.expiresAt ? new Date(row.expiresAt * 1000) : null,
      tokenType: row.tokenType,
      scope: row.scope,
      idToken: row.idToken,
      sessionState: row.sessionState,
    }
  }

  private mapSession(row: typeof sessions.$inferSelect) {
    return {
      id: row.id,
      sessionToken: row.sessionToken,
      userId: row.userId,
      expires: row.expires,
    }
  }

  // ----------------------------------------------------------------- user

  async createUser(data: {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | null
    image?: string | null
  }) {
    const id = data.id ?? crypto.randomUUID()
    const now = new Date().toISOString()

    const [row] = await this.drizzle.db
      .insert(users)
      .values({
        id,
        name: data.name ?? null,
        email: data.email,
        emailVerified: data.emailVerified
          ? data.emailVerified.toISOString()
          : null,
        image: data.image ?? null,
        // users 表中以下列为 notNull 且无默认值，此处补齐以满足约束
        birthDay: now,
        createdAt: now,
        updatedAt: now,
        departmentId: '',
        psalt: '',
        userRegistered: now,
      })
      .returning()

    return row ? this.mapUser(row) : null
  }

  async getUser(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    return row ? this.mapUser(row) : null
  }

  async getUserByEmail(email: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    return row ? this.mapUser(row) : null
  }

  async getUserByAccount(providerAccountId: string, provider: string) {
    const [row] = await this.drizzle.db
      .select({ user: users })
      .from(accounts)
      .innerJoin(users, eq(accounts.userId, users.id))
      .where(
        and(
          eq(accounts.providerAccountId, providerAccountId),
          eq(accounts.provider, provider),
        ),
      )
      .limit(1)
    return row ? this.mapUser(row.user) : null
  }

  async updateUser(data: {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | null
    image?: string | null
  }) {
    const [row] = await this.drizzle.db
      .update(users)
      .set({
        ...(data.name !== undefined
          ? { name: data.name ?? null }
          : {}),
        ...(data.email !== undefined ? { email: data.email ?? data.id } : {}),
        ...(data.emailVerified !== undefined
          ? {
              emailVerified: data.emailVerified
                ? data.emailVerified.toISOString()
                : null,
            }
          : {}),
        ...(data.image !== undefined ? { image: data.image } : {}),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, data.id))
      .returning()
    return row ? this.mapUser(row) : null
  }

  async deleteUser(id: string) {
    await this.drizzle.db.delete(users).where(eq(users.id, id))
  }

  // -------------------------------------------------------------- account

  async createAccount(data: {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }) {
    const [row] = await this.drizzle.db
      .insert(accounts)
      .values({
        id: crypto.randomUUID(),
        userId: data.userId,
        type: data.type,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        refreshToken: data.refresh_token ?? null,
        accessToken: data.access_token ?? null,
        expiresAt: data.expires_at ?? null,
        tokenType: data.token_type ?? null,
        scope: data.scope ?? null,
        idToken: data.id_token ?? null,
        sessionState: data.session_state ?? null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // accounts 表中以下列为 notNull 且无默认值，第三方登录场景无值
        username: '',
        password: '',
      })
      .returning()
    return row ? this.mapAccount(row) : null
  }

  async getAccountById(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(accounts)
      .where(eq(accounts.id, id))
      .limit(1)
    return row ? this.mapAccount(row) : null
  }

  async updateAccount(data: Record<string, any> & { id: string }) {
    const { id, userId, providerAccountId, type, provider, ...rest } = data

    const [row] = await this.drizzle.db
      .update(accounts)
      .set({
        ...(userId !== undefined ? { userId } : {}),
        ...(type !== undefined ? { type } : {}),
        ...(provider !== undefined ? { provider } : {}),
        ...(providerAccountId !== undefined ? { providerAccountId } : {}),
        ...(rest.refresh_token !== undefined
          ? { refreshToken: rest.refresh_token }
          : {}),
        ...(rest.access_token !== undefined
          ? { accessToken: rest.access_token }
          : {}),
        ...(rest.expires_at !== undefined ? { expiresAt: rest.expires_at } : {}),
        ...(rest.token_type !== undefined ? { tokenType: rest.token_type } : {}),
        ...(rest.scope !== undefined ? { scope: rest.scope } : {}),
        ...(rest.id_token !== undefined ? { idToken: rest.id_token } : {}),
        ...(rest.session_state !== undefined
          ? { sessionState: rest.session_state }
          : {}),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(accounts.id, id))
      .returning()
    return row ? this.mapAccount(row) : null
  }

  async deleteAccount(providerAccountId: string, provider: string) {
    await this.drizzle.db
      .delete(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, providerAccountId),
          eq(accounts.provider, provider),
        ),
      )
  }

  // -------------------------------------------------------------- session

  async createSession(data: {
    sessionToken: string
    userId: string
    expires: Date
  }) {
    const now = new Date().toISOString()
    const [row] = await this.drizzle.db
      .insert(sessions)
      .values({
        id: crypto.randomUUID(),
        sessionToken: data.sessionToken,
        userId: data.userId,
        expires: data.expires.toISOString(),
        createdAt: now,
        updatedAt: now,
      })
      .returning()
    return row ? this.mapSession(row) : null
  }

  async getSessionAndUser(sessionToken: string) {
    const [row] = await this.drizzle.db
      .select({ session: sessions, user: users })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.sessionToken, sessionToken))
      .limit(1)

    if (!row) return null
    return {
      session: this.mapSession(row.session),
      user: this.mapUser(row.user),
    }
  }

  async updateSession(data: { sessionToken: string; expires?: Date; userId?: string }) {
    const [row] = await this.drizzle.db
      .update(sessions)
      .set({
        ...(data.expires ? { expires: data.expires.toISOString() } : {}),
        ...(data.userId ? { userId: data.userId } : {}),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sessions.sessionToken, data.sessionToken))
      .returning()
    return row ? this.mapSession(row) : null
  }

  async deleteSession(sessionToken: string) {
    await this.drizzle.db
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
  }
}
