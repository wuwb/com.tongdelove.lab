import {
  Controller,
  Get,
  Put,
  Param,
  Post,
  Delete,
  Body,
  Query,
  Patch,
  DefaultValuePipe,
  UseGuards,
  Logger,
  Request,
  ParseIntPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common'
import { and, desc, eq, ilike, or } from 'drizzle-orm'
import { PostService } from './post.service'
import { UpdatePostDto } from './dto/update-post.dto'
import { RoleEnum } from '@/common/enums/role.enum'
import { UserService } from '@/modules/system/user/user.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { post } from '@/core/database/drizzle/schema'
import { RolesGuard } from '@/common/guards/roles.guard'
import { Roles } from '@/common/decorators/roles.decorator'

@ApiTags('post')
@Controller('api/post')
export class PostController {
  private readonly logger = new Logger(PostController.name)

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly drizzle: DrizzleService
  ) {}

  @Get()
  async getPublishedPosts(@Query() query) {
    return this.postService.posts(query)
  }

  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get('drafts')
  findDrafts() {
    return this.postService.findDrafts()
  }

  async getPosts() {}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const result = this.postService.findPostById(id)
    if (!result) {
      throw new HttpException('Post not found', 404)
    }
    return result
  }

  @Get('/latest')
  async listLatestPosts() {
    const last = await this.postService.model
      .select()
      .from(post)
      .orderBy(desc(post.createdAt))
      .limit(1)
  }

  @Get('filtered-posts/:searchString')
  async listFilteredPosts(@Param('searchString') searchString: string) {
    return this.postService.posts({
      where: {
        OR: [
          {
            postTitle: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
  }

  @Post()
  @HttpCode(201)
  async createPost(@Body() data: any, @Request() req) {
    this.logger.debug('data: ', data)
    this.logger.debug('req.user: ', req.user)
    return this.postService.createPost(
      {
        slug: data.slug,
        title: data.title,
        postAuthor: 0,
        content: data.content || '',
        postTitle: data.postTitle,
        postExcerpt: data.postExcerpt || '',
        postStatus: data.postStatus,
        commentStatus: '',
        pingStatus: '',
        postPassword: '',
        postName: data.postName,
        toPing: '',
        pinged: '',
        postContentFiltered: 0,
        postParent: 0,
        guid: '',
        menuOrder: 0,
        postType: '',
        postMimeType: '',
        commentCount: 0,
        viewCount: 0,
        likesCount: 0,
        postDateGmt: new Date(),
        postModifiedGmt: new Date(),
        readTime: 0,
        keyword: data.keyword || '',
        status: data.status ?? false,
      },
      {
        slug: 'category',
        label: 'category',
        value: 'category',
        order: 0,
      }
    )
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  async updatePost(@Param() params, @Body() body) {
    return this.postService.updatePostById(params.id, body)
  }

  @Patch(':id')
  async patchPost(@Param() params, @Body() body) {
    return this.postService.updatePostById(params.id, body)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin)
  @HttpCode(204)
  async deletePost(@Param('id') id: string): Promise<any> {
    return this.postService.deletePost({
      id,
    })
  }

  @Post(':id/comments')
  async createCommentForPost() {}

  @Get(':id/comments')
  async getCommentsOfPost() {}

  @Get('feed')
  async feed(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc'
  ) {
    const conditions: any[] = [eq(post.postStatus, 'published')]
    if (searchString) {
      conditions.push(
        or(
          ilike(post.postTitle, `%${searchString}%`),
          ilike(post.content, `%${searchString}%`),
        ),
      )
    }

    const where = conditions.length ? and(...conditions) : undefined

    return this.drizzle.db
      .select()
      .from(post)
      .where(where as any)
      .orderBy(orderBy === 'asc' ? post.updatedAt : desc(post.updatedAt))
      .limit(Number(take) || 10)
      .offset(Number(skip) || 0)
  }
}
