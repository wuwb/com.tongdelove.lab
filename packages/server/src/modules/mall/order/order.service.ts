import { PrismaService } from "@/core/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Customer, OrderDetail } from "@prisma/client";

@Injectable()
export class OrderService {
    constructor(
        protected readonly prisma: PrismaService,
    ) { }

    async getCustomer(
        customerId: string,
    ): Promise<Customer | null> {
        return this.prisma.order
            .findUnique({
                where: {
                    id: customerId,
                },
            })
            .customer();
    }

    async getOrderDetail(
        orderId: string,
    ): Promise<OrderDetail[] | null> {
        return this.prisma.order
            .findUnique({
                where: {
                    id: orderId,
                }
            })
            .orderDetail();
    }
}
