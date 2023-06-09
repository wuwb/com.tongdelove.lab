import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Connection } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from '@/core/database/prisma/prisma.service';

@Injectable()
export class PostService {
    private readonly logger = new Logger(PostService.name);

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        private connection: Connection,
        private prisma: PrismaService,
    ) { }

    get model() {
        return this.prisma.post;
    }

    async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput
        });
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        const count = await this.prisma.post.count();
        const data = await this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        if (!data) {
            throw new HttpException('Post not found', 404);
        }
        return {
            count,
            data,
        };
    }

    async tgetPost(id: string) {
        return this.postRepository.findOne({
            where: {
                id,
            },
        })
            .then(res => res)
            .catch((e) => {
                throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    async tlistPosts() {
        return this.postRepository.find()
            .then(res => res)
            .catch((e) => {
                throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    async findPostByPostName(postName: string): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: {
                postName,
            }
        });
        if (!post) {
            throw new HttpException('Post not found', 404);
        }
        return post;
    }

    async findPostById(id: string): Promise<Post> {
        const _post = await this.prisma.post.findUnique({
            where: {
                id,
            }
        });
        if (!_post) {
            throw new HttpException('Post not found', 404);
        }
        return _post;
    }

    async findManyPost(keyword?: string, skip = 0, limit = 10): Promise<PostEntity[]> {
        // if (keyword) {
        //   return this.postRepository.find({
        //     where: {
        //       title: {
        //         $regex: `.*${keyword}.*`,
        //       }
        //     },
        //   });
        // } else {
        return this.postRepository.find();
        // }
    }

    async findAndCount() {
        // const [posts, postsCount] =  this.postRepository.findAndCount();
        const qb = await getRepository(PostEntity)
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author');
        const postsCount = await qb.getCount();
        const posts = await qb.getMany();
        return { posts, postsCount };
    }

    /**
     * 创建文章
     */
    async createPost(post: Prisma.PostCreateInput, category: Prisma.CategoryCreateInput): Promise<any> {
        const newCategory = await this.prisma.category.create({
            data: {
                ...category,
            },
        })

        const newPost = await this.prisma.post.create({
            data: {
                ...post,
            },
        });

        const newPostCategory = await this.prisma.postCategory.create({
            data: {
                postId: newPost.id,
                categoryId: newCategory.id,
            }
        });

        return {
            post: newPost,
            category: newCategory,
        }
    }

    async createManyPost(posts: PostEntity[]) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(posts[0]);
            await queryRunner.manager.save(posts[1]);

            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }

        // 方法二：
        // await this.connection.transaction(async manager => {
        //     await manager.save(posts[0]);
        //     await manager.save(posts[1]);
        // });
    }

    // 更新文章
    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        const { data, where } = params;
        return this.prisma.post.update({
            data,
            where,
        });
    }

    async tupdate(dto: UpdatePostDto) {
        if (dto.id) {
            this.postRepository.update({
                id: dto.id,
            }, dto)
                .then(() => {
                    return 'update success';
                })
                .catch((e) => {
                    throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
                })
        } else {
            const post = this.postRepository.create(dto)
            return this.postRepository.save(post)
                .then((data) => {
                    return {
                        id: data.id,
                    };
                })
                .catch((e) => {
                    throw new HttpException(e.message || 'database action fail', HttpStatus.INTERNAL_SERVER_ERROR);
                });
        }
    }

    /**
     * 修改文章
     * @param post
     */
    async updatePostById(id, post) {
        const _post = await this.prisma.post.findUnique({
            where: {
                id: id,
            }
        });
        if (!_post) {
            throw new HttpException('Post not found', 404);
        }
        if (_post.postAuthor != post.postAuthor) {
            throw new HttpException('can not update another users post', 404);
        }
        const updatedPost = this.prisma.post.update({
            where: {
                id: id,
            },
            data: {
                ...post,
            }
        });
        return updatedPost;
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }

    async deleteManyPost() {

    }

    async deletePostById(id: string) {
        return this.prisma.post.delete({
            where: {
                id,
            }
        });
    }

    async count() {

    }

    async searchPost(query) {
        //
    }

    public addComment(slug: string, commentData) {
        //
    }

    public deleteComment(slug: string, id: string) {
        //
    }

    public findComments(slug: string) {
        //
    }

    public favorite(id: string, slug: string) {
        //
    }

    public unFavorite(id: string, slug: string) {
        //
    }

    async slugify(title: string) {
        //
    }

    async upvoteById(options) {
        //
    }

    async findAll() {

    }
    async findDrafts() { }
}
