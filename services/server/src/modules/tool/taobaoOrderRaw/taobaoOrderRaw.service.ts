import { Injectable, HttpException, Logger } from '@nestjs/common'
import { count, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { taobaoOrderRaw } from '@/core/database/drizzle/schema'

@Injectable()
export class TaobaoOrderRawService {
  private readonly logger = new Logger(TaobaoOrderRawService.name)

  constructor(private drizzle: DrizzleService) {}

  // 保存
  async createTaobaoOrderRaw(data) {
    const [row] = await this.drizzle.db
      .insert(taobaoOrderRaw)
      .values(data)
      .returning()
    return row
  }

  // 批量保存
  async createTaobaoOrderRaws(data: any[]) {
    const rows = await this.drizzle.db
      .insert(taobaoOrderRaw)
      .values(data)
      .onConflictDoNothing()
      .returning()
    return rows
  }

  async taobaoOrderRaw(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(taobaoOrderRaw)
      .where(eq(taobaoOrderRaw.id, id))
      .limit(1)
    console.log('data: ', row)
    return row ?? null
  }

  async taobaoOrderRaws(params: { skip?: number; take?: number }) {
    const { skip, take } = params
    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(taobaoOrderRaw)
    const total = Number(totalRes[0]?.value ?? 0)
    const data = await this.drizzle.db
      .select()
      .from(taobaoOrderRaw)
      .limit(Number(take) || 10)
      .offset(Number(skip) || 0)
    return {
      data,
      total,
    }
  }

  async list(current: number, page: number) {
    const data = await this.drizzle.db
      .select()
      .from(taobaoOrderRaw)
      .limit(page)
      .offset((current - 1) * page)
    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(taobaoOrderRaw)
    return {
      data,
      total: Number(totalRes[0]?.value ?? 0),
    }
  }

  async listAll() {}
}
