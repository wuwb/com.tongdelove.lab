import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Logger,
  Query,
  Request,
} from '@nestjs/common'
import { TopicsService } from './topics.service'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiPagedResponse, Pageable } from '@/utils/pager'
import { SelectTopicDto } from './dto/select-topic.dto'
import { PaginationDto } from '@/shared/dto/pagination.dto'

@ApiTags('topics')
// @ApiBearerAuth()
@Controller({
  path: 'topics',
  version: VERSION_NEUTRAL,
})
export class TopicsController {
  private readonly logger = new Logger(TopicsController.name)
  constructor(private readonly topicsService: TopicsService) {}

  @ApiOperation({ summary: '新建标签' })
  @Post()
  create(@Body() createTopicDto: CreateTopicDto, @Request() req) {
    return this.topicsService.create(createTopicDto)
  }

  @ApiPagedResponse(SelectTopicDto)
  @ApiOperation({ summary: '获取所有标签，包含排序算法' })
  @Get()
  findAll(
    @Pageable() @Query() pager: Required<PaginationDto>,
    @Query('onlyAdmin') onlyAdmin: boolean
  ) {
    this.logger.log('findAll')
    const onlyAdminP = String(onlyAdmin) == 'true'
    return this.topicsService.findTopics(pager, onlyAdminP)
  }

  @Get(':id')
  @ApiResponse({ type: SelectTopicDto })
  @ApiOperation({ summary: '获取某个标签信息' })
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(id)
  }

  @Get(':uid')
  @ApiResponse({ type: SelectTopicDto })
  @ApiOperation({ summary: '获取某个标签信息' })
  findOneByUid(@Param('uid') uid: string) {
    return this.topicsService.findOneByUid(uid)
  }

  @Post(':uid')
  @ApiOperation({ summary: '更新标签' })
  update(@Body() updateTagDto: UpdateTopicDto, @Param('uid') uid: string) {
    return this.topicsService.updateByUid(uid, updateTagDto)
  }

  @Patch(':id')
  patchUpdate(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(id)
  }
}
