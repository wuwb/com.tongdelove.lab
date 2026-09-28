import {
  Injectable,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { and, eq, or, sql, type AnyColumn, type InferSelectModel } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { users, roles, roleToUser, depts } from '@/core/database/drizzle/schema'
import { ApiException } from '@/common/exceptions/api.exception'
import { QueryUserDto } from './dto/query-user.dto'

type UserRow = InferSelectModel<typeof users>
type UserWithRoles = UserRow & {
  roles?: { id: string; key: string }[]
  dept?: { id: string; name: string } | null
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  async all(): Promise<UserRow[]> {
    return this.drizzle.db.select().from(users)
  }

  async findUsers(
    query: QueryUserDto,
    page: number,
    limit: number,
    options?: { include?: Record<string, unknown>; select?: Record<string, unknown> },
  ) {
    this.logger.debug(query)
    const skip = (page - 1) * limit
    const where = query ? this.buildUserWhere(query) : undefined
    const [data, totalRes] = await Promise.all([
      this.drizzle.db
        .select()
        .from(users)
        .where(where)
        .limit(limit)
        .offset(skip),
      this.drizzle.db.select({ value: sql<number>`count(*)` }).from(users).where(where),
    ])
    return { data, total: Number(totalRes[0]?.value ?? 0) }
  }

  private buildUserWhere(query: any) {
    const conditions: ReturnType<typeof eq>[] = []
    if (query?.username) {
      conditions.push(eq(users.username, String(query.username)))
    }
    if (query?.email) {
      conditions.push(eq(users.email, String(query.email)))
    }
    if (query?.userLogin) {
      conditions.push(eq(users.userLogin, String(query.userLogin)))
    }
    return conditions.length ? and(...conditions) : undefined
  }

  async get(args: { where: { id?: string }; select?: Record<string, unknown> }) {
    this.logger.log(`findOne args: ${JSON.stringify(args)}`)
    const user = await this.drizzle.db
      .select()
      .from(users)
      .where(args.where.id ? eq(users.id, args.where.id) : undefined)
      .limit(1)
    if (!user[0]) {
      throw new ApiException(10001, '未找到用户')
    }
    return user[0]
  }

  async getByUsername(username: string) {
    this.logger.log('login: ', username)
    return this.findByField(users.username, username)
  }

  async getByUsernameState(username: string) {
    const result = await this.drizzle.db
      .select({ id: users.id, password: users.password })
      .from(users)
      .where(eq(users.userLogin, username))
      .limit(1)
    return result[0] ?? null
  }

  async basicInfo(id: string): Promise<Partial<UserRow> | null> {
    const result = await this.drizzle.db
      .select({
        id: users.id,
        username: users.username,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    return result[0] ?? null
  }

  async detailInfo(id: string): Promise<Partial<UserRow> | null> {
    return this.basicInfo(id)
  }

  async findById(id: string): Promise<UserWithRoles | null> {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    if (!user) {
      return null
    }
    const [roleRows, deptRows] = await Promise.all([
      this.drizzle.db
        .select({ id: roles.id, key: roles.key })
        .from(roleToUser)
        .innerJoin(roles, eq(roleToUser.b, roles.id))
        .where(eq(roleToUser.a, user.id)),
      user.deptId
        ? this.drizzle.db
            .select({ id: depts.id, name: depts.name })
            .from(depts)
            .where(eq(depts.id, user.deptId))
            .limit(1)
        : Promise.resolve([]),
    ])
    return { ...user, roles: roleRows, dept: deptRows[0] ?? null }
  }

  async findByLogin(login: string): Promise<UserRow | null> {
    this.logger.log('login: ', login)
    return this.findByField(users.userLogin, login)
  }

  async findByMobilePhone(login: string): Promise<UserRow | null> {
    return this.findByField(users.userLogin, login)
  }

  async findOneWithRoles(loginName: string): Promise<UserRow> {
    const user = await this.findByField(users.userLogin, loginName)
    if (!user) {
      throw new HttpException('User does not exist', 404)
    }
    return user
  }

  async findByResetToken(resetKey: string) {
    const user = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.userResetKey, resetKey))
      .limit(1)
    if (!user[0]) {
      throw new HttpException(
        'A user with this email does not exist.',
        HttpStatus.NOT_FOUND,
      )
    }
    return user[0]
  }

  async findByEmail(email: string): Promise<UserRow> {
    const user = await this.findByField(users.email, email)
    if (!user) {
      throw new HttpException(
        'A user with this email does not exist.',
        HttpStatus.NOT_FOUND,
      )
    }
    return user
  }

  async findByIdentifier(identifier: string): Promise<UserRow> {
    const user = await this.drizzle.db
      .select()
      .from(users)
      .where(or(eq(users.userLogin, identifier), eq(users.email, identifier)))
      .limit(1)
    if (!user[0]) {
      throw new HttpException(
        'A user with this username/email does not exist.',
        HttpStatus.NOT_FOUND,
      )
    }
    return user[0]
  }

  private async findByField(field: AnyColumn, value: string) {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(field, value))
      .limit(1)
    return result[0] ?? null
  }

  async create(data: Partial<UserRow>): Promise<UserRow> {
    const [created] = await this.drizzle.db
      .insert(users)
      .values(data as any)
      .returning()
    if (!created) {
      throw new NotFoundException('user not found')
    }
    return created
  }

  // 兼容旧调用名（user.controller 使用）
  async tcreate(data: any) {
    return this.create(data)
  }

  async updateById(id: string, data: Partial<UserRow>) {
    const [updated] = await this.drizzle.db
      .update(users)
      .set(data as any)
      .where(eq(users.id, id))
      .returning()
    return updated
  }

  async updateUserInfo(userId: string, updateUserInfoDto: { login: string; [k: string]: unknown }) {
    const existing = await this.drizzle.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.userLogin, updateUserInfoDto.login))
      .limit(1)
    if (existing[0]) {
      throw new ApiException(10001, `已经存在名为${updateUserInfoDto.login}`)
    }
    const { login, ...rest } = updateUserInfoDto
    const [updated] = await this.drizzle.db
      .update(users)
      .set(rest as any)
      .where(eq(users.id, userId))
      .returning()
    return updated
  }

  async updatePassword(
    userId: string,
    oldPass: string,
    newPass: string
  ): Promise<boolean> {
    const user = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
    if (!user[0]) {
      throw new ApiException(10001, '未找到用户')
    }
    await this.drizzle.db
      .update(users)
      .set({ password: newPass })
      .where(eq(users.id, userId))
    return true
  }

  async verifyUpdatedEmail(token: string) {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.userActivationKey, token))
      .limit(1)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    const [updated] = await this.drizzle.db
      .update(users)
      .set({ emailVerified: new Date().toISOString() })
      .where(eq(users.id, user.id))
      .returning()
    return updated
  }

  async removeById(id: string) {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    const [deleted] = await this.drizzle.db
      .delete(users)
      .where(eq(users.id, id))
      .returning()
    return deleted
  }

  // 以下为原 Prisma 泛型方法的兼容占位，保持接口签名，内部走 drizzle。
  async update(args: { where: { id: string }; data: Partial<UserRow> }): Promise<UserRow> {
    const updated = await this.updateById(args.where.id, args.data)
    if (!updated) {
      throw new NotFoundException('user not found')
    }
    return updated
  }

  async delete(args: { where: { id: string } }): Promise<UserRow> {
    const [deleted] = await this.drizzle.db
      .delete(users)
      .where(eq(users.id, args.where.id))
      .returning()
    if (!deleted) {
      throw new NotFoundException('user not found')
    }
    return deleted
  }

  async updateByRemoveActivationKey(id: string) {
    const [updated] = await this.drizzle.db
      .update(users)
      .set({ userActivationKey: null })
      .where(eq(users.id, id))
      .returning()
    return updated
  }
}
