import { PrismaService } from '@/core/database/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    private readonly logger = new Logger(ProductsService.name);

    constructor(
        private prisma: PrismaService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
        this.logger.debug('ProductsService', prisma);
    }

    // crud

    async create(data: Prisma.ProductCreateInput) {
        return this.prisma.product.create({
            data,
        });
    }

    async findAll(query) {
        const take = query.take || 10;
        const skip = query.skip || 0;
        const keyword = query.keyword || '';

        const total = await this.prisma.product.count();

        const data = await this.prisma.product.findMany({
            skip: skip,
            take: take,
            where: {
                title: {
                    contains: keyword,
                },
            },
            orderBy: {
                title: 'desc',
            },
        });

        return {
            data,
            total,
        }
    }

    async findOne(id: string) {
        return this.prisma.product.findUnique({
            where: {
                id,
            }
        });
    }

    async findPage() {
        return this.prisma.product.findMany({ where: { published: true } });
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return this.prisma.product.update({
            where: { id: id },
            data: updateProductDto,
        });
    }

    async remove(id: string) {
        return this.prisma.product.delete({
            where: {
                id,
            }
        });
    }

    // relations

    async findDrafts() {
        return this.prisma.product.findMany({ where: { published: false } });
    }

    async getProductSku(
        productId: string,
        args: Prisma.ProductFindManyArgs,
    ) {
        return this.prisma.product
            .findUniqueOrThrow({
                where: {
                    id: productId,
                }
            })
            .productSku();
    }
}
