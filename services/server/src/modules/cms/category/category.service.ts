import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { CreateCategoryDto, UpdateCategoryDto, MoveCategoryDto } from './dto/create-categories.dto'
import { CategoryWithChildren } from './entities/categories.entity'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      where: { isDeleted: false },
      orderBy: { sort: 'asc' },
    })
  }

  async findTree(): Promise<CategoryWithChildren[]> {
    const categories = await this.prisma.category.findMany({
      where: { isDeleted: false },
      orderBy: { sort: 'asc' },
    })

    return this.buildTree(categories as unknown as CategoryWithChildren[])
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: {
          where: { isDeleted: false },
          orderBy: { sort: 'asc' },
        },
        parent: true,
      },
    })

    if (!category || category.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return category
  }

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const parent = await this.prisma.category.findUnique({
        where: { id: createCategoryDto.parentId },
      })
      if (!parent || parent.isDeleted) {
        throw new BadRequestException('Parent category not found')
      }
    }

    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        level: createCategoryDto.parentId ? 'L2' : 'L1',
      },
    })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!existing || existing.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    if (updateCategoryDto.parentId) {
      if (updateCategoryDto.parentId === id) {
        throw new BadRequestException('Cannot set category as its own parent')
      }

      const descendants = await this.getDescendantIds(id)
      if (descendants.includes(updateCategoryDto.parentId)) {
        throw new BadRequestException('Cannot move category to its own descendant')
      }

      const parent = await this.prisma.category.findUnique({
        where: { id: updateCategoryDto.parentId },
      })
      if (!parent || parent.isDeleted) {
        throw new BadRequestException('Parent category not found')
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
        updatedAt: new Date(),
      },
    })
  }

  async move(id: string, moveCategoryDto: MoveCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!existing || existing.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    if (moveCategoryDto.targetParentId) {
      if (moveCategoryDto.targetParentId === id) {
        throw new BadRequestException('Cannot move category to itself')
      }

      const descendants = await this.getDescendantIds(id)
      if (descendants.includes(moveCategoryDto.targetParentId)) {
        throw new BadRequestException('Cannot move category to its own descendant')
      }

      const targetParent = await this.prisma.category.findUnique({
        where: { id: moveCategoryDto.targetParentId },
      })
      if (!targetParent || targetParent.isDeleted) {
        throw new BadRequestException('Target parent category not found')
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        parentId: moveCategoryDto.targetParentId || null,
        level: moveCategoryDto.targetParentId ? 'L2' : 'L1',
        updatedAt: new Date(),
      },
    })
  }

  async remove(id: string, recursive: boolean = false) {
    const existing = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: {
          where: { isDeleted: false },
        },
      },
    })

    if (!existing || existing.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    if (existing.children.length > 0 && !recursive) {
      throw new BadRequestException(
        `Cannot delete category with children. Use recursive=true to delete all children.`
      )
    }

    return this.prisma.$transaction(async (tx) => {
      const allIds = await this.getDescendantIds(id, tx as any)
      allIds.push(id)

      await tx.category.updateMany({
        where: { id: { in: allIds } },
        data: { isDeleted: true, updatedAt: new Date() },
      })

      return { deleted: allIds.length, ids: allIds }
    })
  }

  private buildTree(categories: CategoryWithChildren[]): CategoryWithChildren[] {
    const map = new Map<string, CategoryWithChildren>()
    const roots: CategoryWithChildren[] = []

    for (const category of categories) {
      map.set(category.id!, { ...category, children: [] })
    }

    for (const category of categories) {
      const node = map.get(category.id!)!
      if (category.parentId && map.has(category.parentId)) {
        const parent = map.get(category.parentId)!
        parent.children!.push(node)
      } else {
        roots.push(node)
      }
    }

    return this.sortTree(roots)
  }

  private sortTree(nodes: CategoryWithChildren[]): CategoryWithChildren[] {
    const sorted = nodes.sort((a, b) => (a.sort || 0) - (b.sort || 0))
    for (const node of sorted) {
      if (node.children && node.children.length > 0) {
        node.children = this.sortTree(node.children)
      }
    }
    return sorted
  }

  private async getDescendantIds(
    id: string,
    prisma: PrismaService = this.prisma
  ): Promise<string[]> {
    const ids: string[] = []
    const queue: string[] = [id]

    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = await prisma.category.findMany({
        where: { parentId: currentId, isDeleted: false },
        select: { id: true },
      })
      for (const child of children) {
        ids.push(child.id)
        queue.push(child.id)
      }
    }

    return ids
  }
}
