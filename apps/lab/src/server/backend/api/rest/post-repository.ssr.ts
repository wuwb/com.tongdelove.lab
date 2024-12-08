import type { PrismaClientDbMain } from '@tongdelove/prisma'

export class PostRepositorySsr {
  constructor(private prisma: PrismaClientDbMain) {}

  /**
   * @throws Error
   */
  getPost = async (postId: number) => {
    try {
      const post = this.prisma.post.findUnique({
        where: { id: postId },
        include: { author: true },
      })
      if (!post) {
        throw new Error(`Post ${postId} can't be found`)
      }
      return post
    } catch (e) {
      throw new Error(`Post ${postId} can't be retrieved`)
    }
  }

  /**
   * @throws Error
   */
  getPosts = async (options?: { limit?: number; offset?: number }) => {
    const { limit, offset } = options ?? {}
    try {
      return await this.prisma.post.findMany({
        skip: offset,
        take: limit,
        where: {
          publishedAt: {
            not: null,
          },
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
      })
    } catch (e) {
      throw new Error(`Posts can't be retrieved`)
    }
  }
}
