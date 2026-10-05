import { Injectable } from '@nestjs/common'
import { asc } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { appleGuide } from '@/core/database/drizzle/schema'

/**
 * lab Apple 购买指南业务（迁移自 apps/lab 的 appleGuide router）。
 */
@Injectable()
export class LabAppleGuideService {
  constructor(private readonly drizzle: DrizzleService) {}

  getAll() {
    return this.drizzle.db.select().from(appleGuide).orderBy(asc(appleGuide.id))
  }
}
