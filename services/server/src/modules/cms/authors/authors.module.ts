import { Module } from '@nestjs/common'
import { AuthorResolver } from './authors.resolver'
import { AuthorsService } from './authors.service'
import { PostModule } from '../post/post.module'

@Module({
  imports: [PostModule],
  providers: [AuthorsService, AuthorResolver],
})
export class AuthorsModule {}
