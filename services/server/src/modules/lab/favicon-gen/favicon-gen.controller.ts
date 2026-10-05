import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabFaviconGenService } from './favicon-gen.service'

@ApiTags('lab/favicon-gen')
@Controller('api/lab/favicon-gen')
export class LabFaviconGenController {
  constructor(private readonly faviconGenService: LabFaviconGenService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.faviconGenService.create(body)
  }

  @Get('list')
  list(@Query() query: any) {
    return this.faviconGenService.list({
      userId: query.userId,
      page: query.page ? Number(query.page) : 1,
      take: query.take ? Number(query.take) : 10,
      live: query.live === undefined ? undefined : query.live === 'true',
    })
  }
}
