import { PrismaService } from '@/core/database/prisma/prisma.service';
import { pageWrapper } from '@/utils/pager';
import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { PaginationDto } from '@/common/dto/pagination.dto';


@Injectable()
export class TopicsService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async create(createTopicDto: CreateTopicDto) {
        const result = await this.prisma.topic.create({
            data: createTopicDto,
        });
        return result;
    }

    findAll(pager: Required<PaginationDto>, isAdmin = false) {
        const condition: any = {
            isDeleted: false,
        };
        if (isAdmin) {
            condition.userRole = 1;
        }
        return pageWrapper(
            () => {
                return this.prisma.topic.findMany({
                    skip: (pager.pageNum - 1) * pager.pageSize,
                    take: pager.pageSize,
                    where: condition,
                    orderBy: [{ useCount: 'desc' }],
                    select: {
                        isDeleted: false,
                        id: false,
                        uid: true,
                        name: true,
                        useCount: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
            },
            () =>
                this.prisma.topic.count({
                    where: condition,
                }),
            pager,
        );
    }

    async findOne(id: string) {
        const result = await this.prisma.topic.findUnique({
            where: {
                id,
            },
        });
        if (!result) {
            throw new NotFoundException();
        }
        return result;
    }

    findOneByUid(uid: string) {
        return this.prisma.topic.findUnique({
            where: {
                uid: uid,
            },
        });
    }

    findOneNoWhere() {
        return this.prisma.topic.findFirst();
    }

    update(id: string, updateTopicDto: UpdateTopicDto) {
        return this.prisma.topic.update({
            where: {
                id,
            },
            data: updateTopicDto,
        });
    }

    updateByUid(uid: string, updateTopicDto: UpdateTopicDto) {
        return this.prisma.topic.update({
            where: {
                uid: uid
            },
            data: updateTopicDto,
        });
    }

    remove(id: string) {
        return this.prisma.topic.delete({
            where: {
                id,
            },
        });
    }
}
