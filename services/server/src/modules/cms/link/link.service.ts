import { Injectable, Logger } from '@nestjs/common'
import { and, eq, count } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { link, category } from '@/core/database/drizzle/schema'
import { CreateLinkDTO } from './dto/create-link.dto'
import { UpdateLinkDTO } from './dto/update-link.dto'

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  async findOneById(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(link)
      .where(eq(link.id, id))
      .limit(1)
    return row ?? null
  }

  async findAll(param = {}) {
    const where =
      param && Object.keys(param).length
        ? and(
            ...Object.entries(param).map(([k, v]) =>
              eq((link as any)[k], v),
            ),
          )
        : undefined
    return this.drizzle.db.select().from(link).where(where)
  }

  async findMany(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit
    const [data, totalRes] = await Promise.all([
      this.drizzle.db
        .select()
        .from(link)
        .limit(limit)
        .offset(offset),
      this.drizzle.db.select({ value: count() }).from(link),
    ])
    return { data, total: Number(totalRes[0]?.value ?? 0) }
  }

  findOne(id: string) {
    return this.findWithCategory(id)
  }

  findOneWithCategory(id: string) {
    return this.findWithCategory(id)
  }

  private async findWithCategory(id: string) {
    const rows = await this.drizzle.db
      .select({
        title: link.title,
        description: link.description,
        url: link.url,
        categoryId: link.categoryId,
        category: { title: category.title },
      })
      .from(link)
      .leftJoin(category, eq(link.categoryId, category.id))
      .where(eq(link.id, id))
      .limit(1)
    return rows[0] ?? null
  }

  create(
    userId: string,
    categoryId: string,
    createLinkDTO: CreateLinkDTO,
  ) {
    return this.drizzle.db
      .insert(link)
      .values({
        id: randomUUID(),
        title: createLinkDTO.title,
        description: createLinkDTO.description,
        url: createLinkDTO.url,
        categoryId,
        userId,
        updatedAt: new Date().toISOString(),
      })
      .returning()
      .then((rows) => rows[0])
  }

  update(id: string, updateLinkDto: UpdateLinkDTO) {
    return `This action updates a #${id} link`
  }

  async remove(id: string) {
    const [row] = await this.drizzle.db
      .delete(link)
      .where(eq(link.id, id))
      .returning()
    return row
  }
}
