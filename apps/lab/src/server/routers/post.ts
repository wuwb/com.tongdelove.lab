import { z } from 'zod'
import { publicProcedure } from '@/server/trpc/trpc'
import { labPostApi } from '@/server/backend/lab-post.api'

/**
 * 文章查询（迁移自 apps/lab）。
 *
 * 注意：写入能力（create/delete）依赖数据库写权限，已随数据库一起迁移到
 * services/server，前端如需写入应调用 server 提供的接口。
 */
export const postRouter = {
  all: publicProcedure.query(async () => {
    return labPostApi.list({ limit: 10 })
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return labPostApi.getById(input.id)
    }),
}
