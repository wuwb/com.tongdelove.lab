import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { eq, desc, count } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { gridPlan } from '@/core/database/drizzle/schema'

type ListParams = {
  page?: number
  pageSize?: number
}

@Injectable()
export class GridPlanService {
  private readonly logger = new Logger(GridPlanService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  async create(params: {
    name: string
    fundName?: string
    fundCode?: string
    config: unknown
  }) {
    const name = (params.name || '').trim()
    if (!name) {
      throw new HttpException('方案名称不能为空', HttpStatus.BAD_REQUEST)
    }
    if (!params.config || typeof params.config !== 'object') {
      throw new HttpException('方案配置不能为空', HttpStatus.BAD_REQUEST)
    }

    const [created] = await this.drizzle.db
      .insert(gridPlan)
      .values({
        id: randomUUID(),
        name,
        fundName: params.fundName || null,
        fundCode: params.fundCode || null,
        config: params.config,
        updatedAt: new Date().toISOString(),
      })
      .returning()

    return created
  }

  async list(params: ListParams) {
    const page = Math.max(Number(params.page) || 1, 1)
    const pageSize = Math.max(Number(params.pageSize) || 20, 1)

    const [data, countRes] = await Promise.all([
      this.drizzle.db
        .select()
        .from(gridPlan)
        .orderBy(desc(gridPlan.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
      this.drizzle.db.select({ value: count() }).from(gridPlan),
    ])

    return { data, count: Number(countRes[0]?.value ?? 0) }
  }

  async getById(id: string) {
    if (!id) {
      throw new HttpException('方案 id 不能为空', HttpStatus.BAD_REQUEST)
    }
    const [plan] = await this.drizzle.db
      .select()
      .from(gridPlan)
      .where(eq(gridPlan.id, id))
      .limit(1)
    if (!plan) {
      throw new HttpException('方案不存在', HttpStatus.NOT_FOUND)
    }
    return plan
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException('方案 id 不能为空', HttpStatus.BAD_REQUEST)
    }
    const [deleted] = await this.drizzle.db
      .delete(gridPlan)
      .where(eq(gridPlan.id, id))
      .returning()
    return deleted
  }
}
