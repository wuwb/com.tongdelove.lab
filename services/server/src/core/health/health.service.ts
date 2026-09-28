import { Injectable } from '@nestjs/common'
import { sql } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'

@Injectable()
export class HealthService {
  constructor(protected readonly drizzle: DrizzleService) {}

  async isDbReady(): Promise<boolean> {
    try {
      await this.drizzle.db.execute(sql`SELECT 1`)
      return true
    } catch (error) {
      return false
    }
  }
}
