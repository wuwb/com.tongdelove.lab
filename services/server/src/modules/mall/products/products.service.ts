import { Injectable, Logger } from '@nestjs/common'
import { UpdateProductDto } from './dto/update-product.dto'
import { eq, ilike, desc, count } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { product, productSku } from '@/core/database/drizzle/schema'

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name)

  constructor(private readonly drizzle: DrizzleService) {
    this.logger.debug('ProductsService')
  }

  // crud

  async create(data: any) {
    const [created] = await this.drizzle.db
      .insert(product)
      .values(data as any)
      .returning()
    return created
  }

  async findAll(query: any) {
    const take = query?.take || 10
    const skip = query?.skip || 0
    const keyword = query?.keyword || ''

    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(product)
    const total = Number(totalRes[0]?.value ?? 0)

    const data = await this.drizzle.db
      .select()
      .from(product)
      .where(ilike(product.title, `%${keyword}%`))
      .orderBy(desc(product.title))
      .limit(take)
      .offset(skip)

    return {
      data,
      total,
    }
  }

  async findOne(id: string) {
    const [row] = await this.drizzle.db
      .select()
      .from(product)
      .where(eq(product.id, id))
      .limit(1)
    return row ?? null
  }

  async findPage() {
    return this.drizzle.db
      .select()
      .from(product)
      .where(eq(product.published, true))
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const [updated] = await this.drizzle.db
      .update(product)
      .set(updateProductDto as any)
      .where(eq(product.id, id))
      .returning()
    return updated
  }

  async remove(id: string) {
    const [deleted] = await this.drizzle.db
      .delete(product)
      .where(eq(product.id, id))
      .returning()
    return deleted
  }

  // relations

  async findDrafts() {
    return this.drizzle.db
      .select()
      .from(product)
      .where(eq(product.published, false))
  }

  async getProductSku(productId: string, args?: any) {
    return this.drizzle.db
      .select()
      .from(productSku)
      .where(eq(productSku.productId, productId))
      .limit(args?.take ?? 100)
      .offset(args?.skip ?? 0)
  }
}
