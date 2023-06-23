import { Injectable } from "@nestjs/common";
import { LoginLogCreateReqDTO } from "./dto/LoginLogCreateReq.dto";
import { PrismaService } from "@/core/database/prisma/prisma.service";

@Injectable()
export class LoginLogService {

    constructor(
        private readonly prisma: PrismaService,
    ) {

    }

    create(data: LoginLogCreateReqDTO) {
        this.prisma.loginLog.create({
            data: {
                ...data
            }
        });
    }
}
