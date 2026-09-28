import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { and, asc, count, eq, inArray } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { category } from '@/core/database/drizzle/schema'
import { CreateCategoryDto, UpdateCategoryDto, MoveCategoryDto } from './dto/create-categories.dto'
import { CategoryWithChildren } from './entities/categories.entity'

@Injectable()
export class CategoryService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.isDeleted, false))
      .orderBy(asc(category.sort))
  }

  async findTree(): Promise<CategoryWithChildren[]> {
    const categories = await this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.isDeleted, false))
      .orderBy(asc(category.sort))

    return this.buildTree(categories as unknown as CategoryWithChildren[])
  }

  async findOne(id: string) {
    const [cat] = await this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.id, id))
      .limit(1)

    if (!cat || cat.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    const children = await this.drizzle.db
      .select()
      .from(category)
      .where(
        and(
          eq(category.parentId, id),
          eq(category.isDeleted, false),
        ),
      )
      .orderBy(asc(category.sort))

    const parent = cat.parentId
      ? await this.drizzle.db
          .select()
          .from(category)
          .where(eq(category.id, cat.parentId))
          .limit(1)
          .then((rows) => rows[0] ?? null)
      : null

    return { ...cat, children, parent }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const [parent] = await this.drizzle.db
        .select()
        .from(category)
        .where(eq(category.id, createCategoryDto.parentId))
        .limit(1)
      if (!parent || parent.isDeleted) {
        throw new BadRequestException('Parent category not found')
      }
    }

    const [created] = await this.drizzle.db
      .insert(category)
      .values({
        ...(createCategoryDto as any),
        level: createCategoryDto.parentId ? 'L2' : 'L1',
      })
      .returning()
    return created
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const [existing] = await this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.id, id))
      .limit(1)

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

      const [parent] = await this.drizzle.db
        .select()
        .from(category)
        .where(eq(category.id, updateCategoryDto.parentId))
        .limit(1)
      if (!parent || parent.isDeleted) {
        throw new BadRequestException('Parent category not found')
      }
    }

    const [updated] = await this.drizzle.db
      .update(category)
      .set({
        ...(updateCategoryDto as any),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(category.id, id))
      .returning()
    return updated
  }

  async move(id: string, moveCategoryDto: MoveCategoryDto) {
    const [existing] = await this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.id, id))
      .limit(1)

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

      const [targetParent] = await this.drizzle.db
        .select()
        .from(category)
        .where(eq(category.id, moveCategoryDto.targetParentId))
        .limit(1)
      if (!targetParent || targetParent.isDeleted) {
        throw new BadRequestException('Target parent category not found')
      }
    }

    const [updated] = await this.drizzle.db
      .update(category)
      .set({
        parentId: moveCategoryDto.targetParentId || null,
        level: moveCategoryDto.targetParentId ? 'L2' : 'L1',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(category.id, id))
      .returning()
    return updated
  }

  async remove(id: string, recursive: boolean = false) {
    const [existing] = await this.drizzle.db
      .select()
      .from(category)
      .where(eq(category.id, id))
      .limit(1)

    if (!existing || existing.isDeleted) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    if (!recursive) {
      const childCount = await this.drizzle.db
        .select({ value: count() })
        .from(category)
        .where(eq(category.parentId, id))
      if (Number(childCount[0]?.value ?? 0) > 0) {
        throw new BadRequestException(
          `Cannot delete category with children. Use recursive=true to delete all children.`,
        )
      }
    }

    return this.drizzle.db.transaction(async (tx) => {
      const allIds = await this.getDescendantIds(id, tx)
      allIds.push(id)

      await tx
        .update(category)
        .set({ isDeleted: true, updatedAt: new Date().toISOString() })
        .where(inArray(category.id, allIds))

      return { deleted: allIds.length, ids: allIds }
    })
  }

  private buildTree(categories: CategoryWithChildren[]): CategoryWithChildren[] {
    const map = new Map<string, CategoryWithChildren>()
    const roots: CategoryWithChildren[] = []

    for (const cat of categories) {
      map.set(cat.id!, { ...cat, children: [] })
    }

    for (const cat of categories) {
      const node = map.get(cat.id!)!
      if (cat.parentId && map.has(cat.parentId)) {
        const parent = map.get(cat.parentId)!
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
    db: any = this.drizzle.db,
  ): Promise<string[]> {
    const ids: string[] = []
    const queue: string[] = [id]

    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = await db
        .select({ id: category.id })
        .from(category)
        .where(
          and(
            eq(category.parentId, currentId),
            eq(category.isDeleted, false),
          ),
        )
      for (const child of children) {
        ids.push(child.id)
        queue.push(child.id)
      }
    }

    return ids
  }
}
