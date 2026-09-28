import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { accounts, users } from '@/core/database/drizzle/schema'
import { HelperService } from '@/shared/helper/helper.service'

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly drizzle: DrizzleService,
    private readonly helperService: HelperService
  ) {}

  async account() {}

  async accountById() {}

  async findAccountByOpenid(openid: string): Promise<any | null> {
    const [row] = await this.drizzle.db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, 'wechat'),
          eq(accounts.providerAccountId, openid),
        ),
      )
      .limit(1)
    return row ?? null
  }

  async accounts() {}

  async createAccount(data): Promise<any> {
    const { username, email, mobile } = data
  }

  async createAccountByWechat(userInfo) {
    const [created] = await this.drizzle.db
      .insert(accounts)
      .values({
        id: randomUUID(),
        provider: 'wechat',
        providerAccountId: userInfo.openid,
        userId: '',
        username: userInfo.openid,
        password: userInfo.openid,
        type: 'user',
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        expiresAt: null,
        tokenType: '',
        scope: 'local',
        idToken: '',
        sessionState: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
      })
      .returning()
    return created
  }

  async updateAccount() {}

  async resetPassword(id: string): Promise<any> {
    const pass = this.helperService.makePassword(
      this.configService.get('defaultPassword', '123456')
    )

    const [result] = await this.drizzle.db
      .update(users)
      .set({ userPass: pass })
      .where(eq(users.id, id))
      .returning()

    if (result) {
      return '重置成功'
    } else {
      return '重置失败'
    }
  }

  async deleteAccount() {}
}
