import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabPostService } from './post.service'

@ApiTags('lab/post')
@Controller('api/lab/post')
export class LabPostController {
  constructor(private readonly postService: LabPostService) {}

  @Get()
  findMany(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.postService.getPosts({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const row = await this.postService.getPost(id)
    if (!row) {
      throw new Error(`Post ${id} can't be found`)
    }
    return row
  }
}
