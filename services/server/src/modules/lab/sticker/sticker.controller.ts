import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabStickerService } from './sticker.service'

@ApiTags('lab/sticker')
@Controller('api/lab/sticker')
export class LabStickerController {
  constructor(private readonly stickerService: LabStickerService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.stickerService.create(body)
  }

  @Get('list')
  list(@Query() query: any) {
    return this.stickerService.list({
      userId: query.userId,
      page: query.page ? Number(query.page) : 1,
      take: query.take ? Number(query.take) : 10,
      live: query.live === undefined ? undefined : query.live === 'true',
    })
  }

  @Get('get-by-id')
  getById(@Query('id') id: string) {
    return this.stickerService.getById(id)
  }

  @Post('hide')
  hide(@Body() body: { id: string }) {
    return this.stickerService.hide(body.id)
  }

  @Get('is-admin')
  isAdmin(@Query('userId') userId: string) {
    return this.stickerService.isAdmin(userId ?? '')
  }
}
