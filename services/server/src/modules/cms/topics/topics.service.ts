import { Injectable } from '@nestjs/common'
import { count, desc, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { topic } from '@/core/database/drizzle/schema'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { NotFoundException } from '@/common/exceptions/not-found.exception'
import { PaginationDto } from '@/shared/dto/pagination.dto'

@Injectable()
export class TopicsService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(createTopicDto: CreateTopicDto) {
    const [result] = await this.drizzle.db
      .insert(topic)
      .values(createTopicDto as any)
      .returning()
    return result
  }

  async findTopics(pager: Required<PaginationDto>, isAdmin = false) {
    const where = eq(topic.isDelete, false)
    const topics = await this.drizzle.db
      .select({
        uid: topic.uid,
        name: topic.name,
        useCount: topic.useCount,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
      })
      .from(topic)
      .where(where)
      .orderBy(desc(topic.useCount))
      .limit(pager.limit)
      .offset((pager.page - 1) * pager.limit)
    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(topic)
      .where(where)
    const total = Number(totalRes[0]?.value ?? 0)
    return {
      topics,
      total,
    }
  }

  async findOne(id: string) {
    const [result] = await this.drizzle.db
      .select()
      .from(topic)
      .where(eq(topic.id, id))
      .limit(1)
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  findOneByUid(uid: string) {
    return this.drizzle.db
      .select()
      .from(topic)
      .where(eq(topic.uid, uid))
      .limit(1)
      .then((rows) => rows[0] ?? null)
  }

  findOneNoWhere() {
    return this.drizzle.db
      .select()
      .from(topic)
      .limit(1)
      .then((rows) => rows[0] ?? null)
  }

  update(id: string, updateTopicDto: UpdateTopicDto) {
    return this.drizzle.db
      .update(topic)
      .set(updateTopicDto as any)
      .where(eq(topic.id, id))
      .returning()
      .then((rows) => rows[0])
  }

  updateByUid(uid: string, updateTopicDto: UpdateTopicDto) {
    return this.drizzle.db
      .update(topic)
      .set(updateTopicDto as any)
      .where(eq(topic.uid, uid))
      .returning()
      .then((rows) => rows[0])
  }

  remove(id: string) {
    return this.drizzle.db
      .delete(topic)
      .where(eq(topic.id, id))
      .returning()
      .then((rows) => rows[0])
  }
}
