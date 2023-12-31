import { Injectable, HttpException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Observable, of } from 'rxjs';
import { makeSalt, encryptPassword } from '@/utils/cryptogram';
import { User, Prisma, TaobaoOrderRaw } from '@prisma/client';
import { PrismaService } from '@/core/database/prisma/prisma.service';

@Injectable()
export class TaobaoOrderRawService {
    private readonly logger = new Logger(TaobaoOrderRawService.name);

    constructor(
        private prisma: PrismaService,
    ) { }

    // 保存
    async createTaobaoOrderRaw(data) {
        return this.prisma.taobaoOrderRaw.create({
            data: {
                ...data,
            }
        });
    }

    // 批量保存
    async createTaobaoOrderRaws(data: Prisma.TaobaoOrderRawCreateManyInput[]) {
        return this.prisma.taobaoOrderRaw.createMany({
            data: data,
            skipDuplicates: true,
        });
    }

    async taobaoOrderRaw(id: string) {
        let data = await this.prisma.taobaoOrderRaw.findUnique({
            where: {
                id,
            }
        });
        console.log('data: ', data);
        return data;
    }


    async taobaoOrderRaws(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TaobaoOrderRawWhereUniqueInput;
        where?: Prisma.TaobaoOrderRawWhereInput;
        orderBy?: Prisma.TaobaoOrderRawOrderByWithRelationInput;
    }): Promise<{ data: TaobaoOrderRaw[], total: number }> {
        const { skip, take, cursor, where, orderBy } = params;
        const total = await this.prisma.taobaoOrderRaw.count();
        const data = await this.prisma.taobaoOrderRaw.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });

        return {
            data,
            total,
        }
    }

    async list(current: number, page: number) {
        let [data, total] = await this.prisma.taobaoOrderRaw.findMany({
            skip: (current - 1) * page,
            take: page,
        });
        console.log('data: ', data);
        return {
            data,
            total,
        };
    }

    async listAll() {

    }



}
