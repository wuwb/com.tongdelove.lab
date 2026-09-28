import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { order, customer, orderDetail } from '@/core/database/drizzle/schema'

@Injectable()
export class OrderService {
  constructor(protected readonly drizzle: DrizzleService) {}

  async getCustomer(customerId: string): Promise<any | null> {
    const [found] = await this.drizzle.db
      .select()
      .from(order)
      .where(eq(order.id, customerId))
      .limit(1)
    if (!found) {
      return null
    }
    const [cust] = await this.drizzle.db
      .select()
      .from(customer)
      .where(eq(customer.id, found.customerId ?? ''))
      .limit(1)
    return cust ?? null
  }

  async getOrderDetail(orderId: string): Promise<any[] | null> {
    return this.drizzle.db
      .select()
      .from(orderDetail)
      .where(eq(orderDetail.orderId, orderId))
  }
}
