import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
  Global,
} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from '@/config/jwt.config';
import { UsersModule } from '@/modules/user/users.module';
import { SystemModule } from '@/modules/admin/system/system.module';
import { MailModule } from '../mail/mail.module';
import { UserVerificationModule } from '@/modules/user/user-verification.module';
import { AuthResolver } from './auth.resolver';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { GithubStrategy } from './strategies/github.strategy';
import { HttpBearerStrategy } from './strategies/http-bearer.strategy';

const jwtModule = JwtModule.registerAsync({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    MailModule,
  ],
  inject: [
    jwtConfig.KEY,
    ConfigService,
  ],
  useFactory: async (
    config: ConfigType<typeof jwtConfig>,
    configService: ConfigService
  ) => {

    const secret = configService.get('jwt.secret');
    const expiresIn = configService.get('jwt.expiresIn');
    if (!secret) {
      throw new Error("Didn't get a valid jwt secret");
    }
    if (!expiresIn) {
      throw new Error("Jwt expire in value is not valid");
    }
    return {
      secret: secret,
      signOptions: {
        expiresIn: expiresIn, // '8h', default 60s
      }
    };
  },
});

@Module({
  imports: [
    forwardRef(() => UsersModule),

    MailModule,
    UserVerificationModule,
    forwardRef(() => SystemModule),
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
    // https://www.npmjs.com/package/@nestjs/jwt
    forwardRef(() => jwtModule),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    AuthResolver,
    PasswordService,
    HttpBearerStrategy,
    // GithubStrategy,
    JwtStrategy,
    LocalStrategy
  ],
  exports: [
    AuthService,
    PasswordService,
    TokenService,
  ],
})
export class AuthModule { }

// export class AuthModule implements NestModule {
//      public configure(consumber: MiddlewareConsumer) {
//         // apply、forRoute方法允許傳入多個參數
//         consumber
//             .apply(passport.authenticate('local', {
//                 session: false,
//             }))
//             .forRoutes({
//                 path: '/users',
//                 method: RequestMethod.ALL,
//             });
//     }
// }
