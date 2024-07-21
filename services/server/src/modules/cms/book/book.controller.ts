import {
  Controller,
  Get,
  Injectable,
  Next,
  Param,
  Query,
  Res,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { BookService } from './book.service'
import { ApiException } from '@/common/exceptions/api.exception'

@Controller('api/book')
export class BookController {
  constructor(
    private readonly configService: ConfigService,
    private readonly bookService: BookService
  ) {}

  // 全部图书或分类下的图书(页面)
  @Get(':categoryPathname')
  async booksView(
    @Param(':categoryPathname') categoryPathname: string,
    @Query('page') page: number,
    @Res() res,
    @Next() next
  ): Promise<void> {
    const categories = await this.bookService.all()

    let category
    if (categoryPathname) {
      category = categories.find((item) => item.pathname === categoryPathname)
      if (!category) {
        throw new ApiException(404, 'Not found')
      }
    }
    let bookListQuery

    if (category) {
      bookListQuery = this.bookService.list({
        page,
        limit: 10,
      })
    } else {
      bookListQuery = this.bookService.list({
        page,
        limit: 10,
      })
    }

    const [bookList, recommendBookList] = await Promise.all([
      bookListQuery,
      this.bookService.listRecommend(),
    ])

    res.render('pages/books/books', {
      ...bookList,
      recommendBookList,
      categoryPathName: categoryPathname || 'all',
      categories,
    })
  }

  @Get(':id')
  async bookView(@Res() res) {
    //
    res.render('pages/books/bookDetail', {})
  }
}
