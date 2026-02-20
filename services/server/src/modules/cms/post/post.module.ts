import { AuthModule } from '@/modules/system/auth/auth.module'
import { Module } from '@nestjs/common'
import { UserModule } from '@/modules/system/user/user.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  imports: [UserModule, AuthModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
