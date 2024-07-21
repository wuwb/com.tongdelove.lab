import { Module } from '@nestjs/common'
import { HandbookController } from './handbook.controller'
import { BookController } from './book.controller'
import { BookService } from './book.service'
import { HandbookService } from './handbook.service'
import { UserModule } from '@/modules/system/user/user.module'

@Module({
  imports: [UserModule],
  controllers: [BookController, HandbookController],
  providers: [BookService, HandbookService],
  exports: [BookService, HandbookService],
})
export class BookModule {}
