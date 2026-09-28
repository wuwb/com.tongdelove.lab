import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { article } from '@/core/database/drizzle/schema'

@Injectable()
export class ArticleService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findMany() {
    return this.drizzle.db.select().from(article)
  }

  async findInCategory(categoryId: string) {
    return this.drizzle.db.select().from(article)
  }

  async allVerifyFail(id: string) {
    //
  }
}
