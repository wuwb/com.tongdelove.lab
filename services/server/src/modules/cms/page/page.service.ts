import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { page } from '@/core/database/drizzle/schema'

@Injectable()
export class PageService {
  constructor(private readonly drizzle: DrizzleService) {}

  get model() {
    return this.drizzle.db
  }

  public async create(doc: any) {
    const [created] = await this.drizzle.db
      .insert(page)
      .values(doc)
      .returning()
    return created
  }

  async updatePageById(id: string, body: any) {}

  async deletePageById(id: string) {
    const [deleted] = await this.drizzle.db
      .delete(page)
      .where(eq(page.id, id))
      .returning()
    return deleted
  }
}
