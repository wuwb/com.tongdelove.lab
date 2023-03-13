import { Controller, Get } from "@nestjs/common";


@Controller('categories')
export class CategoryController {
  constructor(

  ) {}

  @Get('/')
  async getCategories() {

  }

  @Get('/:query')
  async getCategoryById() {

  }
}
