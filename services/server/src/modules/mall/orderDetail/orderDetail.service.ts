import { Injectable, HttpException } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { order } from '@/core/database/drizzle/schema'

export class OrderDetailService {
  constructor(protected readonly drizzle: DrizzleService) {}

  async findOrder(orderId: string) {
    const [o] = await this.drizzle.db
      .select()
      .from(order)
      .where(eq(order.id, orderId))
      .limit(1)
    if (!o) {
      throw new HttpException(`Order ${orderId} not found`, 404)
    }
    return o
  }
}
