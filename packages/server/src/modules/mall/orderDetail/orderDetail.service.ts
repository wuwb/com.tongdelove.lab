import { PrismaService } from "@/core/database/prisma/prisma.service";
import { Prisma } from "@prisma/client";

export class OrderDetailService {
    constructor(protected readonly prisma: PrismaService) { }

    async findOrder(
        orderId: string,
    ) {
        return this.prisma.order
            .findUniqueOrThrow({
                where: {
                    id: orderId,
                },
            });
    }
}
