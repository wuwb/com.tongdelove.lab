import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '@/modules/system/user/user.service'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { OAuth2Client } from 'google-auth-library'
import { MailService } from '@/core/mail/mail/mail.service'
import { SchedulerRegistry } from '@nestjs/schedule'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { v4 as uuidv4 } from 'uuid'
import { UserVerificationService } from '@/modules/system/user/user-verification.service'
import { UserInfo } from './interface/UserInfo'
import { PasswordService } from './password.service'
import { TokenService } from './token.service'
import { isEmail, isEmpty, isMobilePhone } from 'class-validator'
import { CacheService } from '@/core/cache/cache/cache.service'
import { CAPTCHA_IMAGE_KEY } from '@/common/constants/redis.constant'
import { ApiException } from '@/common/exceptions/api.exception'
import { JwtService } from '@/core/auth/jwt/jwt.service'
import { CommonStatusEnum } from '@/common/enums/CommonStatus.enum'
import { LoginLogTypeEnum } from '@/common/enums/LoginLogType.enum'
import { LoginResultEnum } from '@/modules/login/LoginResult.enum'
import { LoginLogService } from '@/modules/monitor/log/LoginLog.service'
import { LoginLogCreateReqDTO } from '@/modules/monitor/log/dto/LoginLogCreateReq.dto'
import { TraceUtil } from '@/utils/TraceUtil'
import { RequestUtil } from '@/utils/Request.util'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly userVerificationService: UserVerificationService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly loginLogService: LoginLogService,
    private readonly jwtService: JwtService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {}

  async checkImageCaptcha(uuid: string, code: string) {
    const result = await this.cacheService.get(`${CAPTCHA_IMAGE_KEY}:${uuid}`)
    if (isEmpty(result) || code.toLowerCase() !== result.toLowerCase()) {
      throw new ApiException(10001, '验证码错误')
    }
    await this.cacheService.del(`${CAPTCHA_IMAGE_KEY}:${uuid}`)
  }

  /**
   * 注册
   */
  async register(requestBody: any): Promise<any> {
    console.log('requestBody: ', requestBody)
    const { username, password, repassword, email } = requestBody

    if (password !== repassword) {
      throw new HttpException('两次密码输入不一致', 400)
    }

    // 用户已经存在，
    // 判断是否激活，已激活提示用户登录，
    // 未激活，提示重新发送激活邮件。
    const user = await this.userService.findByLogin(username)
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.EXPECTATION_FAILED)
    }

    // 用户不存在，创建用户

    // const hasher = new PasswordHash()
    // const userPass = hasher.build(password);

    const userPass = this.passwordService.hash(password)

    const newActivationKey = uuidv4()

    const result = await this.prisma.$transaction(async (prisma) => {
      const createdUser = await this.userService.create({
        data: {
          login: username,
          pass: userPass, // 废弃
          password: userPass,
          email,
          activationKey: newActivationKey,
          username: username,
          gender: 0,
          birthday: '',
          last_login_time: '',
          last_login_ip: '',
          level: 0,
          weixin_openid: '',
          session_key: '',
        },
      })

      const timeout = setTimeout(
        async () => {
          await this.userService.updateByRemoveActivationKey(createdUser.id)
        },
        30 * 60 * 1000
      )

      const sendMail = await this.mailService.sendActivationKeyEmail(
        createdUser,
        newActivationKey
      )

      // 邮件发送成功后开始计时清除计时器
      await this.schedulerRegistry.addTimeout(
        `clear-activationKey-${createdUser.id}`,
        timeout
      )

      // 普通注册不需要，第三方注册需要绑定 acouunt
      // const createdAccount = await this.accountService.create({
      //   provider: 'email',
      // });

      return createdUser
    })
    const { accessToken, refreshToken } =
      await this.tokenService.createTokens(result)
    return {
      user: {
        id: result.id,
        login: result.login,
        email: result.email,
      },
      accessToken,
      refreshToken,
    }
  }

  // 登录校验，JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<UserInfo> {
    // 判断账号是否存在
    this.logger.log(`username: ${username}`)
    this.logger.log(`password: ${password}`)
    // todo, 判断登录名类型，调用不同的查询用户方法
    let user
    let loginType
    if (isMobilePhone(username, 'zh-CN')) {
      loginType = LoginLogTypeEnum.LOGIN_MOBILE
      user = await this.userService.findByMobilePhone(username)
    } else if (isEmail(username)) {
      loginType = LoginLogTypeEnum.LOGIN_EMAIL
      user = await this.userService.findByEmail(username)
    } else {
      loginType = LoginLogTypeEnum.LOGIN_USERNAME
      user = await this.userService.getByUsername(username)
    }
    if (!user) {
      this.createLoginLog(
        user.id,
        username,
        loginType,
        LoginResultEnum.BAD_CREDENTIALS
      )
      throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED)
    }

    // 判断密码是否存在
    const checked = this.passwordService.compare(password, user.pass)
    if (!checked) {
      this.createLoginLog(
        user.id,
        username,
        loginType,
        LoginResultEnum.BAD_CREDENTIALS
      )
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED)
    }
    this.logger.log(`密码正确`)

    // 判断账号是否禁用
    if (user.status === CommonStatusEnum.DISABLE) {
      throw new ApiException(10001, 'AUTH_LOGIN_USER_DISABLED')
    }
    this.logger.log(`账号未禁用`)

    // 用户存在，密码正确。生成 token
    // todo, 在 userService 中直接过滤掉
    delete user.pass
    delete user.password

    return user
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    console.log('certificate user: ', user)
    const payload = {
      username: user.userLogin,
      sub: user.ID,
      realName: user.userNicename,
      role: user.role,
    }
    console.log('JWT验证 - Step 3: 处理 jwt 签证')
    try {
      const token = this.jwtService.sign(payload)
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      }
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      }
    }
  }

  refreshToken(token: string) {
    try {
      const { id } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      })
      return this.tokenService.createRefreshToken({
        id,
      })
    } catch (err) {
      throw new HttpException('refreshToken', HttpStatus.UNAUTHORIZED)
    }
  }

  // payload 是 token 等信息，根据 token 信息获取用户信息
  async validateAuthData(payload): Promise<any> {
    console.log('payload: ', payload)
    // todo: 数据库里判断是否有该用户，获取该用户详细信息
    const user = await this.userService.findById(payload.sub)

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED)
    }
    // 会自动生成完整用户信息
    const { pass, password, ...result } = user
    return result
    // return {
    //     id: payload.sub,
    //     login: payload.login,
    //     ...user,
    // };
  }

  // async validateUser2(token: string): Promise<any> {
  //     return this.userService.findOneByToken(token);
  // }

  // public async validate(payload: object): Promise<boolean> {
  //     // 給定 where 條件，依據 token payload 的 ID 作為 where 條件。
  //     const queryCondition = { where: { ID: payload['ID'] } };
  //     const user = await this.userService.findOne(queryCondition);
  //     // 有該筆資料，回傳 true
  //     if (user) {
  //         return true;
  //     } else {
  //         return false;
  //     }
  // }

  get secret(): string {
    return this.configService.get('jwt.secret', '')
  }

  /**
   * 快速获取 payload 数据
   *
   * @param {string} $token JWT token
   */
  async getCustomClaims(token: string) {
    try {
      const jwtData: any = await this.jwtService.decode(token)

      this.logger.debug('jwtData: ', jwtData)

      return jwtData.customClaims
    } catch (err) {
      this.logger.error(err)
      // 过期错误
      if (typeof err === 'string') {
        const result = await this.refreshToken(token)
        this.logger.debug(`new token ${result}`)
        return result
      }
    }
  }

  // async authenticateWithGoogle(credential: string) {
  //     const clientID = this.configService.get<string>('google.clientID');
  //     const clientSecret = this.configService.get<string>('google.clientSecret');

  //     const OAuthClient = new OAuth2Client(clientID, clientSecret);
  //     const client = await OAuthClient.verifyIdToken({ idToken: credential });
  //     const userPayload = client.getPayload();

  //     if (!userPayload || !userPayload.email) {
  //         throw new Error('google account not found.');
  //     }

  //     // todo
  //     // 找到邮箱的账号，直接进行登录，需要保证注册的时候必须验证邮箱，且邮箱不能修改
  //     // 这种方法比较简陋，改成账号手动绑定的高级一些
  //     try {
  //         // 先从 account 中取出，判断有无绑定 user，
  //         // 没有的话，返回提示绑定，或者自动创建账号，
  //         // 有的话，取出 user
  //         const user = await this.userService.findByEmail(userPayload.email);

  //         return user;
  //     } catch (error: any) {
  //         if (error.status !== HttpStatus.NOT_FOUND) {
  //             throw new HttpException(error, HttpStatus.BAD_GATEWAY);
  //         }
  //     }
  // }

  async removeUser(id: string) {
    return this.userService.removeById(id)
  }

  async forgotPassword(email: string) {
    return this.userVerificationService.generateResetKey(email)
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findByResetToken(
      resetPasswordDto.resetToken
    )

    if (!user) {
      throw Error('链接已经失效，请重新申请。')
    }

    const password = this.passwordService.hash(resetPasswordDto.password)

    await this.userService.updateById(user.id, {
      password,
      resetToken: null,
    })

    try {
      this.schedulerRegistry.deleteTimeout(`clear-resetToken-${user.id}`)
    } catch {
      //
    }
  }

  private createLoginLog(
    userId: string,
    username: string,
    loginType: LoginLogTypeEnum,
    loginResult: number
  ) {
    // 插入登录日志
    const reqDto: LoginLogCreateReqDTO = {
      logType: loginType,
      traceId: TraceUtil.getTraceId(),
      userId,
      userType: 'admin', // 根据登录入口不同设置？
      username,
      userAgent: RequestUtil.getUserAgent(),
      ip: RequestUtil.getClientIP(),
      result: loginResult,
    }
    this.loginLogService.create(reqDto)

    // // 更新登录 IP 地址和时间
    // this.accountLastLoginService.create(reqDto);
  }
}
