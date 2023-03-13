import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UnprocessableEntityException } from "@nestjs/common";
import { PageService } from "./page.service";

@Controller('pages')
export class PageController {
  constructor(
    private readonly pageService: PageService,
  ) {
  }

  @Get()
  async getPagesSummary(@Query() query) {
    const { size, select, page, sortBy, sortOrder } = query;

    return this.pageService.model.findMany({
      where: {

      }
    });
  }

  @Get('/:id')
  async getPage(@Param() params) {
    const { id } = params;

    const result = this.pageService.model.findUnique({
      where: {
        id
      }
    });

    if (!result) {
      throw new Error('Page not found');
    }

    return result;
  }

  @Get('/slug/:slug')
  async getPageBySlug(@Param('slug') slug: string) {
    if (typeof slug !== 'string') {
      throw new UnprocessableEntityException('slug must be string')
    }

    const result = this.pageService.model.findUnique({
      where: {
        slug,
      }
    });

    if (!result) {
      throw new Error('Page not found');
    }

    return result;
  }

  @Post()
  async createPage(@Body() body) {
    return this.pageService.model.create(body);
  }

  @Put(':id')
  async modifyPage(@Param() params, @Body() body) {
    const { id } = params;
    await this.pageService.updatePageById(id, body);

    return this.pageService.model.findUnique({
      where: {
        id,
      }
    });
  }

  @Patch(':id')
  async patchPage(@Param() params, @Body() body) {
    const { id } = params
    await this.pageService.updatePageById(id, body)

    return
  }

  @Delete(':id')
  async deletePage(@Param() params) {
    return this.pageService.deletePageById(params.id);
  }
}
