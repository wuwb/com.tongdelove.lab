import { Injectable } from '@nestjs/common'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { link } from '@/core/database/drizzle/schema'

/**
 * lab 链接导航业务（迁移自 apps/lab 的 server/api/link.ts）。
 */
@Injectable()
export class LabLinkService {
  constructor(private readonly drizzle: DrizzleService) {}

  getLinks() {
    return this.drizzle.db.select().from(link).limit(10).offset(0)
  }
}
