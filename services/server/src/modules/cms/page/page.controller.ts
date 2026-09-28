import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { PageService } from './page.service'
import { page } from '@/core/database/drizzle/schema'

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  async getPagesSummary(@Query() query) {
    return this.pageService.model.select().from(page)
  }

  @Get('/:id')
  async getPage(@Param() params) {
    const { id } = params

    const result = await this.pageService.model
      .select()
      .from(page)
      .where(eq(page.id, id))
      .limit(1)
      .then((rows) => rows[0] ?? null)

    if (!result) {
      throw new Error('Page not found')
    }

    return result
  }

  @Get('/slug/:slug')
  async getPageBySlug(@Param('slug') slug: string) {
    if (typeof slug !== 'string') {
      throw new UnprocessableEntityException('slug must be string')
    }

    const result = await this.pageService.model
      .select()
      .from(page)
      .where(eq(page.slug, slug))
      .limit(1)
      .then((rows) => rows[0] ?? null)

    if (!result) {
      throw new Error('Page not found')
    }

    return result
  }

  @Post()
  async createPage(@Body() body) {
    return this.pageService.create(body)
  }

  @Put(':id')
  async modifyPage(@Param() params, @Body() body) {
    const { id } = params
    await this.pageService.updatePageById(id, body)

    return this.pageService.model
      .select()
      .from(page)
      .where(eq(page.id, id))
      .limit(1)
      .then((rows) => rows[0] ?? null)
  }

  @Patch(':id')
  async patchPage(@Param() params, @Body() body) {
    const { id } = params
    await this.pageService.updatePageById(id, body)

    return
  }

  @Delete(':id')
  async deletePage(@Param() params) {
    return this.pageService.deletePageById(params.id)
  }
}
