import { Injectable, HttpException, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { CreateLinkDTO } from './dto/create-link.dto';
import { UpdateLinkDTO } from './dto/update-link.dto';

@Injectable()
export class LinkService {
    private readonly logger = new Logger(LinkService.name);

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findOneById(id: string) {
        return this.prisma.website.findUnique({
            where: {
                id,
            }
        });
    }

    async findAll(param = {}) {
        const data = await this.prisma.website.findMany({
            where: {
                ...param,
            }
        });
        return data;
    }

    async findMany(page: number = 1, limit: number = 10) {
        const offset = (page - 1) * limit;

        const count = await this.prisma.website.count();

        const websites = await this.prisma.website.findMany({
            take: limit,
            skip: offset,
        });

        return { websites, count };
    }

    findOne(id: string) {
        return this.prisma.website.findUnique({
            where: { id: id },
            select: {
                title: true,
                description: true,
                url: true,
                categoryId: true,
                category: {
                    select: {
                        title: true,
                    }
                }
            },
        });
    }

    findOneWithCategory(id: string) {
        return this.prisma.website.findUnique({
            where: { id: id },
            select: {
                title: true,
                description: true,
                url: true,
                categoryId: true,
                category: {
                    select: {
                        title: true,
                    }
                }
            },
        });
    }

    create(userId: string, categoryId: string, createLinkDTO: CreateLinkDTO) {
        return this.prisma.website.create({
            data: {
                title: createLinkDTO.title,
                description: createLinkDTO.description,
                url: createLinkDTO.url,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    }
                }

            }
        });
    }

    update(id: string, updateLinkDto: UpdateLinkDTO) {
        return `This action updates a #${id} link`;
    }

    async remove(id: string) {
        return this.prisma.website.delete({
            where: {
                id,
            }
        });
    }
}
