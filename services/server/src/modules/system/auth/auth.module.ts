import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { UserModule } from '@/modules/system/user/user.module'
// import { SystemModule } from '@/modules/system/system.module';
import { UserVerificationModule } from '@/modules/system/user/user-verification.module'
import { AuthResolver } from './auth.resolver'
import { PasswordService } from './password.service'
import { TokenService } from './token.service'
import { GithubStrategy } from './strategies/github.strategy'
import { HttpBearerStrategy } from './strategies/http-bearer.strategy'
import { LogModule } from '@/modules/monitor/log/log.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtConfigService } from '@/core/auth/jwt/jwt-config.service'

@Module({
  imports: [
    forwardRef(() => UserModule),
    UserVerificationModule,
    // forwardRef(() => SystemModule),
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
    // https://www.npmjs.com/package/@nestjs/jwt
    // forwardRef(() => jwtModule),
    LogModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    AuthResolver,
    HttpBearerStrategy,
    // GithubStrategy,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthService, PasswordService, TokenService],
})
export class AuthModule {}

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
