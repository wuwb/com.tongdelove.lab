import { AuthModule } from '@/processors/auth/auth.module';
import { PrismaModule } from '@/processors/prisma/prisma.module';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { UsersModule } from '@/modules/user/users.module';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      UserEntity,
      CommentEntity,
    ]),
    UsersModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [
    PostController
  ],
  providers: [
    PostService,
  ],
  exports: [
    PostService,
  ]
})
export class PostModule { }
