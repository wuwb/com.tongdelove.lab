import { PrismaService } from "@/core/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogService {
    constructor(
        private readonly prisma: PrismaService,
    ) {

    }


}
