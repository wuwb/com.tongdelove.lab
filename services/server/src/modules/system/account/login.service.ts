import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class LoginService {
  private logger = new Logger(LoginService.name)

  /**
   * 后台管理用户登录
   */
  async adminLogin(loginDto: LoginDto, ipAddress: string) {
    try {
      // const { username, password } = loginDto
      // let sqlPassword: string | undefined
      // let findAccount: AccountEntity | null
      // // 手机号码登录
      // if (isMobilePhone(username, 'zh-CN')) {
      //   const findResult: AccountEntity | undefined = await getConnection()
      //     .createQueryBuilder(AccountEntity, 'account')
      //     .select([])
      //     .addSelect('account.password', 'password')
      //     .where('(account.mobile = :mobile)', { mobile: username })
      //     .getRawOne()
      //   sqlPassword = findResult?.password
      //   findAccount = await this.accountRepository.findOne({
      //     where: { mobile: username },
      //   })
      // }
      // // 邮箱登录
      // else if (isEmail(username)) {
      //   const findResult: AccountEntity | undefined = await getConnection()
      //     .createQueryBuilder(AccountEntity, 'account')
      //     .select([])
      //     .addSelect('account.password', 'password')
      //     .where('(account.email = :email)', { email: username })
      //     .getRawOne()
      //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      //   sqlPassword = findResult?.password
      //   findAccount = await this.accountRepository.findOne({
      //     where: { email: username },
      //   })
      // }
      // // 用户名等其他方式登录
      // else {
      //   const findResult: AccountEntity | undefined = await getConnection()
      //     .createQueryBuilder(AccountEntity, 'account')
      //     .select([])
      //     .addSelect('account.password', 'password')
      //     .where('(account.username = :username)', { username })
      //     .getRawOne()
      //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      //   this.logger.debug('findResult: ', findResult)
      //   sqlPassword = findResult?.password
      //   findAccount = await this.accountRepository.findOne({
      //     where: { username },
      //   })
      // }
      // this.logger.debug(password, sqlPassword)
      // assert.ok(findAccount !== null, new Error('用户不存在'))
      // // createAdminUserToken
      // // 登录成功
      // if (
      //   sqlPassword &&
      //   this.helperService.checkPassword(password, sqlPassword) &&
      //   findAccount
      // ) {
      //   // 更新登录时间
      //   const lastLogin = this.accountLastLoginRepository.create({
      //     accountId: findAccount!.id,
      //     lastLoginIp: ipAddress,
      //   })
      //   await this.accountLastLoginRepository.save(lastLogin)
      //   console.log(findAccount, '当前用户')
      //   // 签发 token
      //   const result = Object.assign(findAccount, {
      //     token: await this.tokenService.createAccessToken({
      //       id: findAccount.id,
      //       login: findAccount.username,
      //       password: findAccount.password,
      //     }),
      //   })
      //   // // 储存 token
      //   // const redisScope = this.configService.get('jwt.redisScope');
      //   // const tokenExpire = this.configService.get('jwt.tokenExpire');
      //   // const redisTokenKey = `${redisScope}:accessToken:${findAccount.id}`;
      //   // console.log('redisTokenKey: ', redisTokenKey);
      //   // console.log(' result.token: ', result.token);
      //   // await this.cacheService.set(redisTokenKey, result.token, tokenExpire);
      //   // 缓存数据
      //   this.cacheService.setUser(result)
      //   return result
      // } else {
      //   throw new HttpException('用户名或密码错误', HttpStatus.OK)
      // }
    } catch (e) {
      console.log(e, '?')
      throw new HttpException('用户名或密码错误', HttpStatus.OK)
    }
  }
}
