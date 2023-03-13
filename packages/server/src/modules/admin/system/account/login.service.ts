import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { isMobilePhone, isEmail } from 'class-validator';
import { AccountLastLoginEntity } from './entities/account.last.login.entity';
import { LoginResDto } from './dto/login.res.dto';
import { RedisService } from '@/processors/redis/redis.service';
import { HelperService } from '@/utils/helper/helper.service';
import { AuthService } from '@/processors/auth/auth.service';
import * as assert from 'assert';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  private logger = new Logger(LoginService.name);

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(AccountLastLoginEntity)
    private readonly accountLastLoginRepository: Repository<AccountLastLoginEntity>,
    private readonly helperService: HelperService,
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * 后台管理用户登录
   */
  async adminLogin(loginDto: LoginDto, ipAddress: string): Promise<LoginResDto> {
    try {
      const { username, password } = loginDto;

      let sqlPassword: string | undefined;
      let findAccount: AccountEntity | null;

      // 手机号码登录
      if (isMobilePhone(username, 'zh-CN')) {
        const findResult: AccountEntity | undefined = await getConnection()
          .createQueryBuilder(AccountEntity, 'account')
          .select([])
          .addSelect('account.password', 'password')
          .where('(account.mobile = :mobile)', { mobile: username })
          .getRawOne();
        sqlPassword = findResult?.password;
        findAccount = await this.accountRepository.findOne({ where: { mobile: username } });
      }
      // 邮箱登录
      else if (isEmail(username)) {
        const findResult: AccountEntity | undefined = await getConnection()
          .createQueryBuilder(AccountEntity, 'account')
          .select([])
          .addSelect('account.password', 'password')
          .where('(account.email = :email)', { email: username })
          .getRawOne();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sqlPassword = findResult?.password;
        findAccount = await this.accountRepository.findOne({ where: { email: username } });
      }
      // 用户名等其他方式登录
      else {
        const findResult: AccountEntity | undefined = await getConnection()
          .createQueryBuilder(AccountEntity, 'account')
          .select([])
          .addSelect('account.password', 'password')
          .where('(account.username = :username)', { username })
          .getRawOne();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.logger.debug('findResult: ', findResult);
        sqlPassword = findResult?.password;
        findAccount = await this.accountRepository.findOne({ where: { username } });
      }

      this.logger.debug(password, sqlPassword);

      assert.ok(findAccount !== null, new Error('用户不存在'));

      // createAdminUserToken

      // 登录成功
      if (sqlPassword && this.helperService.checkPassword(password, sqlPassword) && findAccount) {

        // 更新登录时间
        const lastLogin = this.accountLastLoginRepository.create({
          accountId: findAccount!.id,
          lastLoginIp: ipAddress,
        });
        await this.accountLastLoginRepository.save(lastLogin);

        console.log(findAccount, '当前用户');

        // 签发 token
        const result = Object.assign(findAccount, {
          token: await this.authService.create({
            id: findAccount.id,
            username: findAccount.username,
            password: findAccount.password,
            mobile: findAccount.mobile,
            email: findAccount.email,
            avatar: findAccount.avatar,
            status: findAccount.status,
            platform: findAccount.platform,
            isSuper: findAccount.isSuper,
          }),
        });

        // // 储存 token
        // const redisScope = this.configService.get('jwt.redisScope');
        // const tokenExpire = this.configService.get('jwt.tokenExpire');
        // const redisTokenKey = `${redisScope}:accessToken:${findAccount.id}`;
        // console.log('redisTokenKey: ', redisTokenKey);
        // console.log(' result.token: ', result.token);
        // await this.redisService.set(redisTokenKey, result.token, tokenExpire);

        // 缓存数据
        this.redisService.cacheUser(result);

        return result;
      } else {
        throw new HttpException('用户名或密码错误', HttpStatus.OK);
      }
    } catch (e) {
      console.log(e, '?');
      throw new HttpException('用户名或密码错误', HttpStatus.OK);
    }
  }
}
