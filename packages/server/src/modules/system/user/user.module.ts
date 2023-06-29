import { forwardRef, Module, Global, OnModuleInit, Inject } from '@nestjs/common';
import { DatabaseModule } from '@/core/database/database/database.module';
import { UserController } from './user.controller';
import { UserPageController } from './user.page.controller';
import { UserService } from './user.service';
import { MailModule } from '@/core/mail/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        DatabaseModule,
        MailModule,
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [
        UserController,
        UserPageController,
    ],
    providers: [
        UserService,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule implements OnModuleInit {

    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ) {

    }

    async onModuleInit() {
        await this.createDefaultRole();
        await this.createSuperAdmin();
    }

    private async createDefaultRole() {
        // console.log('createDefaultRole');
    }

    private async createSuperAdmin() {
        // console.log('createSuperAdmin');
    }
}
