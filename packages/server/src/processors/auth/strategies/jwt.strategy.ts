import { Injectable, ExecutionContext } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtDto, EnumTokenType } from '../dto/jwt.dto';

import { AuthService } from '../auth.service';
import { HttpUnauthorizedError } from '@/common/errors/unauthorized.error';
import { ConfigService } from '@nestjs/config';
import { IAuthStrategy } from '../interface/IAuthStrategy';
import { UserInfo } from '../UserInfo';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt')
  implements IAuthStrategy {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserInfo): Promise<UserInfo> {
    console.log('payload: ', payload);
    // todo 判断 payload 类型，是 ApiToken 的话，进行验证
    const user = await this.authService.validateAuthData(payload);

    if (!user) {
      throw new HttpUnauthorizedError();
    }

    if (
      !Array.isArray(user.roles) ||
      typeof user.roles !== "object" ||
      user.roles === null
    ) {
      throw new Error("User roles is not a valid value");
    }

    return { ...user, roles: user.roles as string[] };
  }
}
