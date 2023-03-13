import { PrismaService } from "@/processors/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Address, Prisma } from "@prisma/client";

@Injectable()
export class CustomerService {
    constructor(protected readonly prisma: PrismaService) { }

    async findOrders(
        orderId: string,
        args: Prisma.OrderFindManyArgs
    ) {
        return this.prisma.customer
            .findUniqueOrThrow({
                where: {
                    id: orderId,
                }
            })
            .orders(args);
    }

    async getAddress(id: string): Promise<Address[] | null> {
        return this.prisma.customer
            .findUnique({
                where: { id, },
            })
            .address();
    }
}
