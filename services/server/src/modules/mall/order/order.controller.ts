import { Get, Injectable, Param, Query } from '@nestjs/common'
import { NotFoundException } from '@/common/exceptions/not-found.exception'
import { Prisma } from '@prisma/client/extension'
import { plainToClass } from 'class-transformer'
import { OrderService } from './order.service'

@Injectable()
export class OrderController {
  constructor(protected readonly orderService: OrderService) { }

  @Get('/:id/customer')
  async findOneCustomer(
    @Query() query,
    @Param() params: any
  ): Promise<any> {
    // 注册用户购买的，没有 customer 信息
    if (!params.id) {
      throw new NotFoundException()
    }
    const results = await this.orderService.getCustomer(params.id)
    if (results === null) {
      throw new NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      )
    }
    return results
  }
}
