import { Injectable, HttpException, Logger } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { customer, order, address } from '@/core/database/drizzle/schema'

@Injectable()
export class CustomerService {
  constructor(protected readonly drizzle: DrizzleService) {}

  // 创建客户
  async create() {}

  // 更新
  async update() {}

  // 删除
  // 查询列表

  // 查询

  // 查询客户选项

  // 导出 Excel 文件
  async export(uid: any) {}

  async exist(name: any, item: any): Promise<boolean> {
    return true
  }

  async save(data: any) {}

  async findOrders(orderId: string, args?: any) {
    return this.drizzle.db
      .select()
      .from(order)
      .where(eq(order.customerId, orderId))
      .limit(args?.take ?? 100)
      .offset(args?.skip ?? 0)
  }

  async getAddress(id: string) {
    return this.drizzle.db
      .select()
      .from(address)
      .where(eq(address.customerId, id))
  }
}
