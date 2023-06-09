import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { UserModule } from '@/modules/system/user/user.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { LogModule } from '@/modules/monitor/log/log.module';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import jwtConfig from '@/config/jwt.config';
import { MailModule } from '@/core/mail/mail/mail.module';

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
        // https://www.npmjs.com/package/@nestjs/jwt
        forwardRef(() => jwtModule),
        AuthModule,
        UserModule,
        MenuModule,
        LogModule,
    ],
    controllers: [LoginController],
    providers: [LoginService],
    exports: [
        LoginService,
    ]
})
export class LoginModule { }
