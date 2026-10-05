import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { users } from '@/core/database/drizzle/schema'

/**
 * lab 用户信息业务（迁移自 apps/lab 的 server/api/user.ts）。
 */
@Injectable()
export class LabUserService {
  constructor(private readonly drizzle: DrizzleService) {}

  /** 公开用户信息字段 */
  private publicFields() {
    return {
      id: users.id,
      name: users.name,
      image: users.image,
      about: users.about,
      interests: users.interests,
      tagline: users.tagline,
      language: users.language,
      location: users.location,
      createdAt: users.createdAt,
      isPublic: users.isPublic,
      role: users.role,
    }
  }

  async getUserPublicById(id: string) {
    const [row] = await this.drizzle.db
      .select(this.publicFields())
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return row ?? null
  }

  /** 订阅信息（迁移自 apps/lab 的 lib/lemonsqueezy/subscription） */
  async getSubscriptionFields(userId: string) {
    const [row] = await this.drizzle.db
      .select({
        subscriptionId: users.subscriptionId,
        currentPeriodEnd: users.currentPeriodEnd,
        customerId: users.customerId,
        variantId: users.variantId,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return row ?? null
  }

  /** 基础用户信息，用于 checkout 等场景 */
  async getUserBasic(userId: string) {
    const [row] = await this.drizzle.db
      .select({ id: users.id, email: users.email, username: users.username })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return row ?? null
  }

  async isAdmin(userId: string) {
    if (!userId || userId.trim() === '') return false

    const [row] = await this.drizzle.db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return row?.role === 'admin'
  }
}
