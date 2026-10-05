import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabPoemService } from './poem.service'
import { getPoemTranslation, getRandomImages } from './poem.third-party'
import {
  ConnectPoemsTagDto,
  CreateAuthorDto,
  CreateCardItemDto,
  CreateTagDto,
  DeleteAuthorDto,
  DeletePoemDto,
  FindAuthorDto,
  FindByIdDto,
  FindByTagDto,
  FindCardQuotaPoemsDto,
  FindCardsDto,
  FindPoemByAuthorDto,
  FindPoemDto,
  FindPoemsNeedCardDto,
  FindTagDto,
  GenTranslationDto,
  IdParamDto,
  IsSamePoemDto,
  SearchPoemDto,
  TagSitemapDto,
} from './dto.poem'

/**
 * 内部管理 token 校验：原 apps/lab 的写操作通过 process.env.TOKEN 保护，
 * 迁移到 server 后保持同样的校验方式。
 */
const assertToken = (token: string) => {
  if (token !== process.env.TOKEN) {
    throw new Error('Invalid token')
  }
}

@ApiTags('lab/poem')
@Controller('api/lab/poem')
export class LabPoemController {
  constructor(private readonly poemService: LabPoemService) {}

  // ---------------------------------------------------------------- poem

  @Get('count')
  count() {
    return this.poemService.count()
  }

  /** 诗词列表（含 keywords），供 lab 的 /api/rest/poem 使用 */
  @Get('search-with-keywords')
  searchWithKeywords(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.poemService.searchPoemsWithKeywords({
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    })
  }

  @Get('search')
  search(@Query() query: SearchPoemDto) {
    return this.poemService.search(query.keyword ?? '')
  }

  @Get('sitemap')
  sitemap() {
    return this.poemService.sitemap()
  }

  @Get('find')
  find(@Query() query: FindPoemDto) {
    return this.poemService.find(query)
  }

  @Get('is-same')
  isSame(@Query() query: IsSamePoemDto) {
    return this.poemService.isSame(query)
  }

  @Get('find-by-author')
  findByAuthor(@Query() query: FindPoemByAuthorDto) {
    return this.poemService.findByAuthorId(query)
  }

  @Get('find-by-tag')
  findByTag(@Query() query: FindByTagDto) {
    return this.poemService.findByTagId(query)
  }

  @Get('find-by-id')
  findById(@Query() query: FindByIdDto) {
    return this.poemService.findById(query.id)
  }

  @Post('delete')
  async delete(@Body() body: DeletePoemDto) {
    assertToken(body.token)
    return this.poemService.deleteById(body.id)
  }

  @Post('gen-translation')
  async genTranslation(@Body() body: GenTranslationDto) {
    assertToken(body.token)
    return getPoemTranslation(body.content)
  }

  // ---------------------------------------------------------- poem_author

  @Get('author/count')
  countAuthors() {
    return this.poemService.countAuthors()
  }

  @Get('author/sitemap')
  authorSitemap() {
    return this.poemService.authorSitemap()
  }

  @Get('author/find')
  findAuthors(@Query() query: FindAuthorDto) {
    return this.poemService.findAuthors(query)
  }

  @Get('author/find-not-poem')
  findAuthorsWithoutPoem() {
    return this.poemService.findAuthorsWithoutPoem()
  }

  @Get('author/find-by-id')
  findAuthorById(@Query() query: IdParamDto) {
    return this.poemService.findAuthorById(query.id)
  }

  @Post('author/create')
  async createAuthor(@Body() body: CreateAuthorDto) {
    assertToken(body.token)
    return this.poemService.createAuthor(body)
  }

  @Post('author/delete')
  async deleteAuthor(@Body() body: DeleteAuthorDto) {
    assertToken(body.token)
    return this.poemService.deleteAuthorById(body.id)
  }

  // ------------------------------------------------------------- poem_tag

  @Get('tag/find')
  findTags(@Query() query: FindTagDto) {
    return this.poemService.findTags(query)
  }

  @Get('tag/count')
  countTags() {
    return this.poemService.countTags()
  }

  @Get('tag/sitemap')
  tagSitemap(@Query() query: TagSitemapDto) {
    return this.poemService.tagSitemap(query.type)
  }

  @Get('tag/find-by-id')
  findTagById(@Query() query: IdParamDto) {
    return this.poemService.findTagById(query.id)
  }

  @Get('tag/find-statistics-by-id')
  findTagStatisticsById(@Query() query: IdParamDto) {
    return this.poemService.findTagStatisticsById(query.id)
  }

  @Post('tag/connect-poems')
  async connectPoems(@Body() body: ConnectPoemsTagDto) {
    assertToken(body.token)
    return this.poemService.connectPoemsToTag({
      tagId: body.tagId,
      ids: body.ids,
    })
  }

  @Post('tag/create')
  async createTag(@Body() body: CreateTagDto) {
    assertToken(body.token)
    return this.poemService.createTag(body)
  }

  @Post('tag/delete')
  async deleteTag(@Body() body: IdParamDto & { token?: string }) {
    return this.poemService.deleteTagById(body.id)
  }

  // ------------------------------------------------------------ poem_card

  @Get('card/count')
  countCards() {
    return this.poemService.countCards()
  }

  @Get('card/find')
  findCards(@Query() query: FindCardsDto) {
    return this.poemService.findCards(query)
  }

  @Get('card/random')
  randomCards() {
    return this.poemService.randomCards()
  }

  @Get('card/need-create')
  async findPoemsNeedCard(@Query() query: FindPoemsNeedCardDto) {
    assertToken(query.token)
    const data = await this.poemService.findPoemsNeedCard(query)
    return { ...data, urls: await getRandomImages(30) }
  }

  @Post('card/create')
  async createCardItem(@Body() body: CreateCardItemDto) {
    assertToken(body.token)
    return this.poemService.createCardItem(body)
  }

  @Post('card/find-by-quota')
  async findCardQuotaPoems(@Body() body: FindCardQuotaPoemsDto) {
    assertToken(body.token)
    const data = await this.poemService.findCardQuotaPoems(body.quotas)
    return { data, urls: await getRandomImages(30) }
  }
}
