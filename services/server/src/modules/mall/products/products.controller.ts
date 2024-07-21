import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Product } from './entities/product.entity'
import { API_ROOT_PATH } from '@/common/constants/index.constant'

@Controller(`${API_ROOT_PATH}/products`)
@ApiTags('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name)

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: Product })
  create(@Body() data) {
    return this.productsService.create(data)
  }

  @Get()
  findAll(@Query() query) {
    this.logger.debug('get all products')
    return this.productsService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({ type: Product })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Get('page')
  async findPage() {
    return this.productsService.findPage()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }

  @Get('drafts')
  findDrafts() {
    return this.productsService.findDrafts()
  }
}
