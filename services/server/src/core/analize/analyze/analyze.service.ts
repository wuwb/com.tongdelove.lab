import { Injectable } from '@nestjs/common'
import { and, count, gte, lte } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { analyze } from '@/core/database/drizzle/schema'

@Injectable()
export class AnalyzeService {
  constructor(private readonly drizzle: DrizzleService) {}

  async getRangeAnalyzeData(
    from = new Date('2000-01-01'),
    to = new Date(),
    options?: {
      page?: number
      limit?: number
    }
  ) {
    const { limit = 50, page = 1 } = options || {}
    // timestamp 列在 drizzle 中是 mode: 'string'，需传 ISO 字符串而非 Date
    const where = and(
      gte(analyze.timestamp, from.toISOString()),
      lte(analyze.timestamp, to.toISOString()),
    )
    const [countRes, list] = await Promise.all([
      this.drizzle.db.select({ value: count() }).from(analyze).where(where),
      this.drizzle.db
        .select()
        .from(analyze)
        .where(where)
        .limit(limit)
        .offset((page - 1) * limit),
    ])
    return {
      list,
      count: Number(countRes[0]?.value ?? 0),
    }
  }
}
