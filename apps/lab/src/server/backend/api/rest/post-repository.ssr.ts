import { labPostApi } from '@/server/backend/lab-post.api'

/**
 * 文章读取仓储（迁移自 apps/lab）。
 *
 * 数据访问改为调用 services/server，lab 不再直连数据库。
 */
export class PostRepositorySsr {
  /**
   * @throws Error
   */
  getPost = async (postId: string) => {
    try {
      const post = await labPostApi.getById(postId)
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
    try {
      return await labPostApi.list(options)
    } catch (e) {
      throw new Error(`Posts can't be retrieved`)
    }
  }
}
