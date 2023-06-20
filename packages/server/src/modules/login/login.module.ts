import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '@/modules/system/auth/auth.module';
import { UserModule } from '@/modules/system/user/user.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { LogModule } from '@/modules/monitor/log/log.module';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
    imports: [
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
