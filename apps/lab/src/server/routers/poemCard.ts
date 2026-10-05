import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { labPoemCardApi } from '@/server/backend/lab-poem.api'

export const poemCardRouter = createTRPCRouter({
  /**
   * 获取需要生成 Card 的诗词
   */
  getGenerateCard: publicProcedure
    .input(
      z.object({
        token: z.string(),
        page: z.number().default(1),
        tagName: z.string().default('七言律诗'),
      })
    )
    .query(async ({ input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      return labPoemCardApi.getGenerateCard({
        token: input.token,
        page: input.page,
        tagName: input.tagName,
      })
    }),

  createCardItem: publicProcedure
    .input(
      z.object({
        token: z.string(),
        poemId: z.number(),
        content: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      return labPoemCardApi.createCardItem(input)
    }),

  find: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(28),
      })
    )
    .query(async ({ input }) => labPoemCardApi.find(input)),

  random: publicProcedure.query(async () => labPoemCardApi.random()),

  count: publicProcedure.query(async () => labPoemCardApi.count()),

  findNeedCreateByQuota: publicProcedure
    .input(
      z.object({
        token: z.string(),
        quotas: z.array(z.string()),
      })
    )
    .query(async ({ input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      if (!input.quotas.length) {
        throw new Error('quotas is empty')
      }

      return labPoemCardApi.findNeedCreateByQuota({
        token: input.token,
        quotas: input.quotas,
      })
    }),
})
