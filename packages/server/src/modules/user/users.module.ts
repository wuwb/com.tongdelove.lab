import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@/processors/database/database.module';
import { UsersController } from './users.controller';
import { AuthModule } from '@/processors/auth/auth.module';
import { UserController } from './user.controller';
import { UsersPageController } from './users.page.controller';
import { UserService } from './user.service';
import { PrismaModule } from '@/processors/prisma/prisma.module';
import { MailModule } from '@/processors/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { QQService } from '@/utils/helper/qq.service';
import { HelperModule } from '@/utils/helper/helper.module';
// import { HttpService } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    DatabaseModule,
    MailModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [
    UserController,
    UsersPageController,
  ],
  providers: [
    UserService,
    HelperModule,
  ],
  exports: [
    UserService,
  ],
})
export class UsersModule { }
