import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { TemuRequestService } from './temu-request.service'
import { CleaningService } from './cleaning.service'
import {
  BatchCreateTemuRequestDto,
  QueryTemuRequestDto,
  CreateCleaningJobDto,
} from './dto'
import { ApiKeyGuard } from './guards/api-key.guard'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('temu-request')
@Controller('api/temu-requests')
@UseGuards(ApiKeyGuard)
export class TemuRequestController {
  constructor(
    private readonly temuRequestService: TemuRequestService,
    private readonly cleaningService: CleaningService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '批量接收 Temu 请求数据' })
  async createBatch(@Body() dto: BatchCreateTemuRequestDto) {
    return this.temuRequestService.createBatch(dto)
  }

  @Get()
  @ApiOperation({ summary: '查询 Temu 请求数据' })
  async findAll(@Query() query: QueryTemuRequestDto) {
    return this.temuRequestService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID查询请求数据' })
  async findOne(@Param('id') id: string) {
    return this.temuRequestService.findOne(id)
  }

  @Post('clean')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: '触发数据清洗任务' })
  async triggerCleaning(@Body() dto: CreateCleaningJobDto) {
    return this.cleaningService.createJob(dto)
  }

  @Get('clean-status/:id')
  @ApiOperation({ summary: '查询清洗任务状态' })
  async getCleaningStatus(@Param('id') id: string) {
    return this.cleaningService.getJobStatus(id)
  }

  @Get('cleaning-jobs/recent')
  @ApiOperation({ summary: '获取最近的清洗任务' })
  async getRecentJobs(@Query('limit') limit?: number) {
    return this.cleaningService.getRecentJobs(limit)
  }
}
