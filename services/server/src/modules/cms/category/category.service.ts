import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { CreateCategoriesDto } from './dto/create-categories.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoriesDto: CreateCategoriesDto) {
    await this.prisma.category.create({
      data: {
        ...createCategoriesDto,
      },
    })
  }

  async updateCategory() {}

  async removeCategory() {}
}
