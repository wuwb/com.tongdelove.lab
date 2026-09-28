import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  HttpCode,
  Logger,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GridPlanService } from './grid-plan.service'

@ApiTags('etf-grid-plan')
@Controller('api/etf/grid-plan')
export class GridPlanController {
  private readonly logger = new Logger(GridPlanController.name)

  constructor(private readonly gridPlanService: GridPlanService) {}

  @Post('create')
  @HttpCode(201)
  async create(
    @Body()
    body: {
      name: string
      fundName?: string
      fundCode?: string
      config: unknown
    },
  ) {
    this.logger.debug(`create grid plan: ${body?.name}`)
    try {
      return await this.gridPlanService.create(body)
    } catch (error) {
      this.logError('create grid plan failed', error)
      throw error
    }
  }

  @Get('list')
  async list(@Query() query: { page?: string; pageSize?: string }) {
    try {
      return await this.gridPlanService.list({
        page: Number(query.page),
        pageSize: Number(query.pageSize),
      })
    } catch (error) {
      this.logError('list grid plan failed', error)
      throw error
    }
  }

  @Get('get')
  async get(@Query('id') id: string) {
    try {
      return await this.gridPlanService.getById(id)
    } catch (error) {
      this.logError('get grid plan failed', error)
      throw error
    }
  }

  @Delete('remove')
  @HttpCode(200)
  async remove(@Body() body: { id?: string }) {
    try {
      return await this.gridPlanService.remove(body.id ?? '')
    } catch (error) {
      this.logError('remove grid plan failed', error)
      throw error
    }
  }

  private logError(message: string, error: unknown) {
    const err = error as Error
    this.logger.error(`${message}: ${err?.message ?? error}`)
    if (err?.stack) {
      this.logger.error(err.stack)
    }
  }
}
