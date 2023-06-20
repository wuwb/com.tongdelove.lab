import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { UserModule } from '@/modules/system/user/user.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { LogModule } from '@/modules/monitor/log/log.module';
import { JwtConfigService } from './jwt-config.service';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        // https://www.npmjs.com/package/@nestjs/jwt
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        AuthModule,
        UserModule,
        MenuModule,
        LogModule,
    ],
    controllers: [
        LoginController
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginService,
    ]
})
export class LoginModule { }
