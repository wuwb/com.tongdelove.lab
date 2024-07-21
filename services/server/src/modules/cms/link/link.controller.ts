import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { LinkService } from './link.service'
import { CreateLinkDTO } from './dto/create-link.dto'
import { UpdateLinkDTO } from './dto/update-link.dto'
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard'
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('cms/link')
@Controller('/api/link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLinkDTO: CreateLinkDTO, @Request() req) {
    let categoryId = '1'

    // 判断用户权限

    // 判断分类是否存在，不存在时候返回错误。
    // this.categoryService.findById(categoryId);

    console.log('req.user: ', req.user)
    return this.linkService.create(req.user.id, categoryId, createLinkDTO)
  }

  @Get()
  async findMany(
    @Query('page', new ParseIntPipe()) current: number = 1,
    @Query('limit', new ParseIntPipe()) page: number = 10
  ) {
    const data = await this.linkService.findMany(current, page)

    return data
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDTO: UpdateLinkDTO) {
    return this.linkService.update(id, updateLinkDTO)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(id)
  }
}
