import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Account, Prisma } from '@prisma/client'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { HelperService } from '@/shared/helper/helper.service'

@Injectable()
export class AccountService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService
  ) { }

  async account() { }

  async accountById() { }

  async findAccountByOpenid(openid: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: {
        provider: 'wechat',
        providerAccountId: openid,
      } as Prisma.AccountWhereUniqueInput,
    })
  }

  async accounts() { }

  async createAccount(data): Promise<any> {
    const { username, email, mobile } = data
  }

  async createAccountByWechat(userInfo) {
    return this.prisma.account.create({
      data: {
        provider: 'wechat',
        providerAccountId: userInfo.openid,
        userId: '',
        type: 'user',
        refresh_token: userInfo.refreshToken,
        access_token: userInfo.accessToken,
        expires_at: null,
        token_type: '',
        scope: 'local',
        id_token: '',
        session_state: '',
        createdAt: '',
        updatedAt: '',
        isDeleted: false,
      },
    })
  }

  async updateAccount() { }

  async resetPassword(id: string): Promise<any> {
    const pass = this.helperService.makePassword(
      this.configService.get('defaultPassword', '123456')
    )

    const result = await this.prisma.user.update({
      data: {
        pass,
      },
      where: {
        id,
      },
    })

    if (result) {
      return '重置成功'
    } else {
      return '重置失败'
    }
  }

  async deleteAccount() { }
}
