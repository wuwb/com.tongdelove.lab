import { Injectable } from '@nestjs/common'
import { and, count, desc, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { stickers, users } from '@/core/database/drizzle/schema'

/**
 * lab 贴纸业务（迁移自 apps/lab 的 server/api/sticker.ts）。
 */
@Injectable()
export class LabStickerService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(input: {
    object: string
    color: string
    accessory: string
    doing: string
    style: string
    url: string
    deviceId?: string | null
    userId?: string | null
  }) {
    const [row] = await this.drizzle.db
      .insert(stickers)
      .values({
        id: crypto.randomUUID(),
        object: input.object,
        color: input.color,
        accessory: input.accessory,
        doing: input.doing,
        style: input.style,
        url: input.url,
        deviceId: input.deviceId ?? null,
        userId: input.userId ?? null,
      })
      .returning()
    return row ?? null
  }

  async list(input: {
    userId?: string | null
    page?: number
    take?: number
    live?: boolean
  }) {
    const page = input.page ?? 1
    const take = input.take ?? 10

    const conditions: Array<ReturnType<typeof eq>> = []
    if (input.userId) conditions.push(eq(stickers.userId, input.userId))
    if (input.live) conditions.push(eq(stickers.live, input.live))
    const where = conditions.length ? and(...conditions) : undefined

    return this.drizzle.db
      .select({
        id: stickers.id,
        url: stickers.url,
        createdAt: stickers.createdAt,
        object: stickers.object,
        live: stickers.live,
      })
      .from(stickers)
      .where(where)
      .orderBy(desc(stickers.createdAt))
      .limit(take)
      .offset((page - 1) * take)
  }

  async hide(id: string) {
    const [row] = await this.drizzle.db
      .update(stickers)
      .set({ live: false })
      .where(eq(stickers.id, id))
      .returning({ id: stickers.id })
    return row ?? null
  }

  /** 查询单个可见贴纸 */
  async getById(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(stickers)
      .where(and(eq(stickers.id, id), eq(stickers.live, true)))
      .limit(1)
    return row ?? null
  }

  async countAll() {
    const [row] = await this.drizzle.db
      .select({ value: count() })
      .from(stickers)
    return Number(row?.value ?? 0)
  }

  /** 校验用户是否具备管理员权限 */
  async isAdmin(userId: string) {
    if (!userId || userId.trim() === '') return false

    const [row] = await this.drizzle.db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return row?.role === 'admin'
  }
}
