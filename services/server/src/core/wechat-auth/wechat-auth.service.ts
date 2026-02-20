import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { UserService } from '@/modules/system/user/user.service'
import {
  AccessTokenInfo,
  AccessConfig,
  WechatError,
  WechatUserInfo,
} from './wechat-auth.interface'
import { lastValueFrom } from 'rxjs'
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { AuthService } from '@/modules/system/auth/auth.service'
import { AccountService } from '@/modules/system/user/account/account.service'
import { ConfigService } from '@nestjs/config'
import { LoginService } from '@/modules/login/login.service'

@Injectable()
export class WechatAuthService {
  private readonly logger = new Logger(WechatAuthService.name)

  constructor(
    private readonly usersService: UserService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly configSerivce: ConfigService,
    private readonly loginService: LoginService
  ) {}

  accessTokenInfo: AccessTokenInfo

  isExpires(data) {
    return false
  }

  async getAccessToken(code) {
    const APPID = this.configSerivce.get('wechat.APPID')
    const APPSECRET = this.configSerivce.get('wechat.APPSECRET')
    const apiServer = this.configSerivce.get('wechat.apiServer')

    if (!APPSECRET) {
      throw new BadRequestException('[getAccessToken]必须有appSecret')
    }
    if (
      !this.accessTokenInfo ||
      (this.accessTokenInfo && this.isExpires(this.accessTokenInfo))
    ) {
      // 使用httpService请求accessToken数据
      // : AxiosResponse<WechatError & AccessConfig, any>
      const res: any = await lastValueFrom(
        this.httpService.get(
          `${apiServer}/sns/oauth2/access_token?appid=${APPID}&secret=${APPSECRET}&code=${code}&grant_type=authorization_code`
        )
      )

      if (res.data.errcode) {
        throw new BadRequestException(
          `[getAccessToken] errcode:${res.data.errcode}, errmsg:${res.data.errmsg}`
        )
      }
      this.accessTokenInfo = {
        accessToken: res.data.access_token,
        expiresIn: res.data.expires_in,
        getTime: Date.now(),
        openid: res.data.openid, // openid 是判断用户的唯一标识
      }
    }

    return this.accessTokenInfo.accessToken
  }

  async loginWithWechat(code: string) {
    // 获取 access_token
    await this.getAccessToken(code)

    // 查找用户是否存在，
    // todo
    // 先在 account 表中查询用户是否存在，不存在的话让用户选择新建账户还是绑定已有账户
    let account = await this.getUserByOpenid()
    if (!account) {
      // 创建新的 account
      // 获取微信用户信息，注册新用户
      const userInfo = await this.accessTokenInfo

      account = await this.accountService.createAccountByWechat(userInfo)
    }

    if (!account.userId) {
      // 绑定已有账户，或创建 user
    }

    // 根据 account，查询 user 表，获取用户信息
    const user = await this.usersService.findById(account.userId)

    // return this.loginService.login(user);
  }

  async getUserByOpenid() {
    return await this.accountService.findAccountByOpenid(
      this.accessTokenInfo.openid
    )
  }
}
