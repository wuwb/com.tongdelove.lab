import { Injectable } from '@nestjs/common'
import { and, desc, eq, isNotNull } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { post, users } from '@/core/database/drizzle/schema'

/**
 * lab 文章业务（迁移自 apps/lab 的 PostRepositorySsr）。
 */
@Injectable()
export class LabPostService {
  constructor(private readonly drizzle: DrizzleService) {}

  /** 查询单篇文章（含作者） */
  async getPost(postId: string) {
    const [row] = await this.drizzle.db
      .select({ post: post, author: users })
      .from(post)
      .leftJoin(users, eq(post.userId, users.id))
      .where(eq(post.id, postId))
      .limit(1)

    return row ? { ...row.post, author: row.author } : null
  }

  /** 查询已发布的文章列表（含作者） */
  async getPosts(options?: { limit?: number; offset?: number }) {
    const { limit, offset } = options ?? {}

    const base = this.drizzle.db
      .select({ post: post, author: users })
      .from(post)
      .leftJoin(users, eq(post.userId, users.id))
      .where(isNotNull(post.publishedAt))
      .orderBy(desc(post.publishedAt))

    const query =
      limit !== undefined && offset !== undefined
        ? base.limit(limit).offset(offset)
        : limit !== undefined
          ? base.limit(limit)
          : offset !== undefined
            ? base.offset(offset)
            : base

    const rows = await query

    return rows.map((row) => ({
      ...row.post,
      author: row.author
        ? {
            firstName: row.author.firstName,
            lastName: row.author.lastName,
            username: row.author.username,
          }
        : null,
    }))
  }
}
