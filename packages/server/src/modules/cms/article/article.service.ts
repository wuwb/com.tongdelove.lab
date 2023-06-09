import { PrismaService } from '@/core/database/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findMany() { }

    async findInCategory(categoryId: string,) {
        this.prisma.article.findMany()
    }
}
