import { Injectable } from '@nestjs/common'
import { and, desc, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { faviconGen } from '@/core/database/drizzle/schema'

/**
 * lab favicon 生成业务（迁移自 apps/lab 的 server/api/faviconGen.ts）。
 */
@Injectable()
export class LabFaviconGenService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(input: {
    text: string
    size: number
    radius?: number
    backgroundColor: string
    fontFamily: string
    fontWeight?: number
    fontSize: number
    fontRotate?: number
    textColor: string
    textOpacity?: number
    textStrokeColor: string
    textStrokeOpacity?: number
    textStrokeWidth?: number
    fineTuneVerticalPosition: number
    fineTuneHorizontalPosition: number
    deviceId?: string | null
    userId?: string | null
    live?: boolean
    fork?: boolean
  }) {
    if (input.size < 16 || input.size > 2048) {
      throw new Error('size error.')
    }

    const [row] = await this.drizzle.db
      .insert(faviconGen)
      .values({
        id: crypto.randomUUID(),
        text: input.text,
        size: input.size,
        radius: input.radius ?? 0,
        backgroundColor: input.backgroundColor,
        fontFamily: input.fontFamily,
        fontWeight: input.fontWeight ?? 400,
        fontSize: input.fontSize,
        fontRotate: input.fontRotate ?? 0,
        textColor: input.textColor,
        textOpacity: input.textOpacity ?? 1,
        textStrokeColor: input.textStrokeColor,
        textStrockOpacity: input.textStrokeOpacity ?? 1,
        textStrokeWidth: input.textStrokeWidth ?? 0,
        fineTuneVerticalPostion: input.fineTuneVerticalPosition,
        fineTuneHorizontalPosition: input.fineTuneHorizontalPosition,
        // schema 中该两列为 notNull，沿用 Prisma model 的默认值
        fontHeight: 0,
        fontLead: 0,
        deviceId: input.deviceId ?? null,
        userId: input.userId ?? null,
        live: input.live ?? true,
        fork: input.fork ?? true,
        updatedAt: new Date().toISOString(),
      })
      .returning()
    return row ?? null
  }

  async list(input: { userId?: string | null; page?: number; take?: number; live?: boolean }) {
    const page = input.page ?? 1
    const take = input.take ?? 10

    const conditions: Array<ReturnType<typeof eq>> = []
    if (input.userId) conditions.push(eq(faviconGen.userId, input.userId))
    if (input.live) conditions.push(eq(faviconGen.live, input.live))
    const where = conditions.length ? and(...conditions) : undefined

    return this.drizzle.db
      .select()
      .from(faviconGen)
      .where(where)
      .orderBy(desc(faviconGen.createdAt))
      .limit(take)
      .offset((page - 1) * take)
  }
}
