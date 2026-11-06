import { Injectable } from '@nestjs/common'
import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus'
import { sql } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'

@Injectable()
export class DrizzleHealthIndicator {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key)
    try {
      await this.drizzleService.db.execute(sql`SELECT 1`)
      return indicator.up()
    } catch (err) {
      return indicator.down({ message: (err as Error).message })
    }
  }
}
