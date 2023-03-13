import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as assert from 'assert';
import { getUrlQuery } from '@/utils';
import { CodeEnum, CodeMessage } from '@/common/enums/code.enum';
import { API_AUTH_KEY } from '@/common/constants';
// import { ApiAuthService } from '@/utils/shared/api-auth.service';
import { HelperService } from '@/utils/helper/helper.service';
import { AuthService } from '@/processors/auth/auth.service';
import { RedisService } from '@/processors/redis/redis.service';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    // private readonly apiAuthService: ApiAuthService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) { }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    this.logger.log('start auth guard');

    const request = context.switchToHttp().getRequest();

    let token = context.switchToRpc().getData().headers.token ||
      request.headers.authorization ||
      context.switchToHttp().getRequest().body.token ||
      getUrlQuery(request.url, 'token');

    this.logger.debug(`当前的token: ${token}`);

    const methodAuth = Reflect.getMetadata(API_AUTH_KEY, context.getHandler());
    const classAuth = Reflect.getMetadata(API_AUTH_KEY, context.getClass());


    this.logger.debug(`methodAuth: ${methodAuth}`);
    this.logger.debug(`classAuth: ${classAuth}`);

    if (token) {
      [, token] = token.trim().split(' ');

      this.logger.debug(token);

      try {
        const user = await this.validateRequest(token);
        this.logger.debug(user, '当前用户');
        if (user) {
          request.user = user;
          if (methodAuth || classAuth) {
            this.logger.debug('走资源守卫');
            const method = request.method;
            const url = request.url;
            return true; // this.apiAuthService.apiAuth(user, method, url);
          } else {
            this.logger.debug('不走资源守卫');
            return true;
          }
        } else {
          throw new HttpException(
            JSON.stringify({
              code: CodeEnum.TOKEN_ERROR,
              message: CodeMessage[CodeEnum.TOKEN_ERROR],
            }),
            HttpStatus.OK,
          );
        }
      } catch (err) {
        this.logger.error(err);
        throw new HttpException('auth error', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException(
        JSON.stringify({
          code: CodeEnum.NO_TOKEN,
          message: CodeMessage[CodeEnum.NO_TOKEN]
        }),
        HttpStatus.OK,
      );
    }
  }

  /**
   * 校验用户传递过来的token
   */
  private async validateRequest(token: string): Promise<any> {
    this.logger.debug('validateRequest');

    // 根据 token 解出 payload
    const payload = await this.authService.getCustomClaims(token);
    console.log('payload: ', payload);

    // 根据 payload 从redis 获取 token
    const redisScope = this.configService.get('jwt.redisScope');
    const redisTokenKey = `${redisScope}:accessToken:${payload.id}`;
    console.log('redisTokenKey: ', redisTokenKey);
    const redisToken = await this.redisService.get(redisTokenKey);

    console.log('token: ', token);
    console.log('redisToken: ', redisToken);

    // 验证是否为最新的 token，判断是否过期
    assert.ok(
      token === redisToken,
      new Error('Authentication Failed1'),
    );

    // 根据 payload 获取用户信息
    const userInfoKey = `${redisScope}:userinfo:${payload.id}`;
    const userInfo = await this.redisService.get(userInfoKey);
    console.log('userInfo: ', userInfo);
    if (!userInfo) {
      throw new Error('Authentication Failed2')
    }
    console.log('userInfo: ', userInfo);

    return userInfo;
  }
}
