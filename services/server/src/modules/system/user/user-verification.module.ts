import { forwardRef, Module } from '@nestjs/common'
import { MailModule } from '@/core/mail/mail/mail.module'
import { UserVerificationService } from './user-verification.service'
import { UserModule } from './user.module'

@Module({
  imports: [MailModule, UserModule],
  controllers: [],
  providers: [UserVerificationService],
  exports: [UserVerificationService],
})
export class UserVerificationModule {}
