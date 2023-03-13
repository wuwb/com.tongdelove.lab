import { forwardRef, Module } from '@nestjs/common';
import { MailModule } from '@/processors/mail/mail.module';
import { UserVerificationService } from './user-verification.service';
import { UsersModule } from './users.module';
import { PrismaModule } from '@/processors/prisma/prisma.module';

@Module({
    imports: [
        MailModule,
        UsersModule,
        PrismaModule,
    ],
    controllers: [
    ],
    providers: [
        UserVerificationService
    ],
    exports: [
        UserVerificationService,
    ],
})
export class UserVerificationModule { }
