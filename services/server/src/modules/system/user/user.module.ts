import {
  forwardRef,
  Module,
  Global,
  OnModuleInit,
  Inject,
} from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { MailModule } from '@/core/mail/mail/mail.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MailModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async onModuleInit() {
    await this.createDefaultRole()
    await this.createSuperAdmin()
  }

  private async createDefaultRole() {
    // console.log('createDefaultRole');
  }

  private async createSuperAdmin() {
    // console.log('createSuperAdmin');
  }
}
