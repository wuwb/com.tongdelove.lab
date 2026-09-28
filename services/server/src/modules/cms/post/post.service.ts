import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { count, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { post, category, postCategory } from '@/core/database/drizzle/schema'

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  get model() {
    return this.drizzle.db
  }

  async post(postWhereUniqueInput: any): Promise<any | null> {
    const [row] = await this.drizzle.db.select().from(post).limit(1)
    return row ?? null
  }

  async posts(params: any) {
    const { skip, take } = params
    const countRes = await this.drizzle.db
      .select({ value: count() })
      .from(post)
    const total = Number(countRes[0]?.value ?? 0)
    const data = await this.drizzle.db
      .select()
      .from(post)
      .limit(take)
      .offset(skip)
    if (!data) {
      throw new HttpException('Post not found', 404)
    }
    return {
      count: total,
      data,
    }
  }

  async findPostByPostName(postName: string): Promise<any> {
    const [row] = await this.drizzle.db
      .select()
      .from(post)
      .where(eq(post.postName, postName))
      .limit(1)
    if (!row) {
      throw new HttpException('Post not found', 404)
    }
    return row
  }

  async findPostById(id: string): Promise<any> {
    const [row] = await this.drizzle.db
      .select()
      .from(post)
      .where(eq(post.id, id))
      .limit(1)
    if (!row) {
      throw new HttpException('Post not found', 404)
    }
    return row
  }

  async createPost(postData: any, categoryData: any): Promise<any> {
    const [newCategory] = await this.drizzle.db
      .insert(category)
      .values(categoryData as any)
      .returning()
    if (!newCategory) {
      throw new HttpException('Category create failed', 500)
    }
    const [newPost] = await this.drizzle.db
      .insert(post)
      .values(postData as any)
      .returning()
    if (!newPost) {
      throw new HttpException('Post create failed', 500)
    }
    await this.drizzle.db.insert(postCategory).values({
      id: randomUUID(),
      postId: newPost.id,
      categoryId: newCategory.id,
      updatedAt: new Date().toISOString(),
    })
    return {
      post: newPost,
      category: newCategory,
    }
  }

  async updatePost(params: any): Promise<any> {
    const { data, where } = params
    const [updated] = await this.drizzle.db
      .update(post)
      .set(data as any)
      .where(eq(post.id, where.id))
      .returning()
    return updated
  }

  async updatePostById(id: any, postData: any) {
    const [_post] = await this.drizzle.db
      .select()
      .from(post)
      .where(eq(post.id, id))
      .limit(1)
    if (!_post) {
      throw new HttpException('Post not found', 404)
    }
    if (_post.postAuthor != postData.postAuthor) {
      throw new HttpException('can not update another users post', 404)
    }
    const [updatedPost] = await this.drizzle.db
      .update(post)
      .set(postData as any)
      .where(eq(post.id, id))
      .returning()
    return updatedPost
  }

  async deletePost(where: any): Promise<any> {
    const [deleted] = await this.drizzle.db
      .delete(post)
      .where(eq(post.id, where.id))
      .returning()
    return deleted
  }

  async deleteManyPost() {}

  async deletePostById(id: string) {
    const [deleted] = await this.drizzle.db
      .delete(post)
      .where(eq(post.id, id))
      .returning()
    return deleted
  }

  async count() {}
  async searchPost(query) {}
  public addComment(slug: string, commentData) {}
  public deleteComment(slug: string, id: string) {}
  public findComments(slug: string) {}
  public favorite(id: string, slug: string) {}
  public unFavorite(id: string, slug: string) {}
  async slugify(title: string) {}
  async upvoteById(options) {}
  async findAll() {}
  async findDrafts() {}
}
