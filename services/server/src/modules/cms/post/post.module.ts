import { AuthModule } from '@/modules/system/auth/auth.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@/modules/system/user/entities/user.entity'
import { UserModule } from '@/modules/system/user/user.module'
import { CommentEntity } from './entities/comment.entity'
import { PostEntity } from './entities/post.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, CommentEntity]),
    UserModule,
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
