import { Injectable, HttpException, Logger, HttpStatus } from '@nestjs/common'
import { Prisma, Post } from '@prisma/client'
import { PrismaService } from '@/core/database/prisma/prisma.service'

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name)

  constructor(private prisma: PrismaService) {}

  get model() {
    return this.prisma.post
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    })
  }

  async posts(params: {
    skip?: number
    take?: number
    cursor?: Prisma.PostWhereUniqueInput
    where?: Prisma.PostWhereInput
    orderBy?: Prisma.PostOrderByWithRelationInput
  }) {
    const { skip, take, cursor, where, orderBy } = params
    const count = await this.prisma.post.count()
    const data = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
    if (!data) {
      throw new HttpException('Post not found', 404)
    }
    return {
      count,
      data,
    }
  }

  async findPostByPostName(postName: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        postName,
      },
    })
    if (!post) {
      throw new HttpException('Post not found', 404)
    }
    return post
  }

  async findPostById(id: string): Promise<Post> {
    const _post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    })
    if (!_post) {
      throw new HttpException('Post not found', 404)
    }
    return _post
  }

  async createPost(
    post: Prisma.PostCreateInput,
    category: Prisma.CategoryCreateInput
  ): Promise<any> {
    const newCategory = await this.prisma.category.create({
      data: {
        ...category,
      },
    })

    const newPost = await this.prisma.post.create({
      data: {
        ...post,
      },
    })

    const newPostCategory = await this.prisma.postCategory.create({
      data: {
        postId: newPost.id,
        categoryId: newCategory.id,
      },
    })

    return {
      post: newPost,
      category: newCategory,
    }
  }

  // 更新文章
  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUpdateInput
  }): Promise<Post> {
    const { data, where } = params
    return this.prisma.post.update({
      data,
      where,
    })
  }

  /**
   * 修改文章
   * @param post
   */
  async updatePostById(id, post) {
    const _post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    })
    if (!_post) {
      throw new HttpException('Post not found', 404)
    }
    if (_post.postAuthor != post.postAuthor) {
      throw new HttpException('can not update another users post', 404)
    }
    const updatedPost = this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        ...post,
      },
    })
    return updatedPost
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    })
  }

  async deleteManyPost() {}

  async deletePostById(id: string) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    })
  }

  async count() {}

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

  async findAll() {}
  async findDrafts() {}
}
