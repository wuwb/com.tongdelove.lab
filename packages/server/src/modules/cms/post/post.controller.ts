import { Controller, Get, Put, Param, Post, Delete, Body, Query, Patch, DefaultValuePipe, UseGuards, Logger, Request, ParseIntPipe, HttpException, HttpCode } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { RoleEnum } from '@/common/enums/role.enum';
import { UserService } from '@/modules/system/user/user.service';
import { User, Post as PostModel, Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { skip } from 'rxjs';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import moment from 'moment';

@ApiTags('post')
@Controller('api/post')
export class PostController {
    private readonly logger = new Logger(PostController.name);

    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService,
        private readonly prisma: PrismaService,
    ) {
    }

    @Get()
    async getPublishedPosts(@Query() query) {
        return this.postService.posts(query);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get('drafts')
    findDrafts() {
        return this.postService.findDrafts();
    }

    async getPosts() {

    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        // todo: 判断链接显示设置类型，调用不同的方法查询
        const result = this.postService.findPostById(id);
        if (!result) {
            throw new HttpException('Post not found', 404);
        }
        return result;
    }

    @Get('/latest')
    async listLatestPosts() {
        const last = await this.postService.model.findFirst({
            orderBy: {
                createdAt: 'desc',
            }
        });
    }

    @Get('filtered-posts/:searchString')
    async listFilteredPosts(
        @Param('searchString') searchString: string,
    ) {
        return this.postService.posts({
            where: {
                OR: [
                    {
                        postTitle: { contains: searchString },
                    },
                    {
                        postContent: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @HasRoles(RoleEnum.USER, RoleEnum.ADMIN)
    @HttpCode(201)
    async createPost(@Body() data: Prisma.PostCreateInput, @Request() req) {
        this.logger.debug('data: ', data);
        this.logger.debug('req.user: ', req.user);
        return this.postService.createPost({
            postAuthor: 0,
            postContent: data.postContent || '',
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
        }, {
            slug: 'category',
        });
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

    // @Post()
    // async upload() {
    //   const stream = await this.getFileStream();
    //   const object = await this.oss.put(moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename, stream);
    //   if (object) {
    //       this.body = {
    //           success: 1,           // 0 表示上传失败，1 表示上传成功
    //           message: '上传成功',
    //           url: object.url,        // 上传成功时才返回
    //       };
    //   } else {
    //       this.body = {
    //           success: 0,           // 0 表示上传失败，1 表示上传成功
    //           message: '上传失败',
    //       };
    //   }
    // }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @HttpCode(204)
    async deletePost(@Param('id') id: string): Promise<PostModel> {
        return this.postService.deletePost({
            id,
        });
    }

    @Post(':id/comments')
    async createCommentForPost() { }

    @Get(':id/comments')
    async getCommentsOfPost() { }

    @Get('feed')
    async feed(
        @Query('take') take?: number,
        @Query('skip') skip?: number,
        @Query('searchString') searchString?: string,
        @Query('orderBy') orderBy?: 'asc' | 'desc',
    ) {
        const or = searchString
            ? {
                OR: [
                    { postTitle: { contains: searchString } },
                    { postContent: { contains: searchString } },
                ],
            }
            : {};

        return this.prisma.post.findMany({
            where: {
                postStatus: 'published',
                ...or,
            },
            take: Number(take) || undefined,
            skip: Number(skip) || undefined,
            orderBy: {
                updatedAt: orderBy,
            },
        });
    }
}
