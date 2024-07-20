import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { getRandom } from '@/server/third/unsplash'

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
    .query(async ({ ctx, input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      const where = {
        AND: [
          { tags: { some: { name: input.tagName } } },
          {
            cards: { none: {} },
          },
        ],
      }

      const [result, count, urls] = await Promise.all([
        ctx.prisma.poem.findMany({
          where,
          select: {
            author: true,
            id: true,
            content: true,
            title: true,
          },
          orderBy: {
            id: 'asc',
          },
          skip: (input.page - 1) * 30,
          take: 30,
        }),
        ctx.prisma.poem.count({
          where,
        }),
        getRandom(),
      ])

      return {
        data: result,
        total: count,
        urls,
        pageCount: Math.ceil(count / 30),
      }
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
    .mutation(async ({ ctx, input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      return ctx.prisma.poemCard.create({
        data: {
          poemId: input.poemId,
          url: input.url,
          content: input.content,
        },
      })
    }),

  find: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(28),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input

      const [data, total] = await ctx.prisma.$transaction([
        ctx.prisma.poemCard.findMany({
          take: pageSize,
          skip: (page - 1) * pageSize,
          orderBy: {
            id: 'desc',
          },
        }),
        ctx.prisma.poemCard.count(),
      ])

      return {
        data,
        hasNext: page * pageSize < total,
        total,
        page,
        pageSize,
      }
    }),

  random: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.poemCard.count()
    const skip = Math.floor(Math.random() * count)

    return ctx.prisma.poemCard.findMany({
      take: 30,
      skip: skip,
      select: {
        id: true,
        content: true,
        url: true,
        poemId: true,
        poem: {
          select: { title: true },
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
  }),

  count: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.poemCard.count()
  }),

  findNeedCreateByQuota: publicProcedure
    .input(
      z.object({
        token: z.string(),
        quotas: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.token !== process.env.TOKEN) {
        throw new Error('token error')
      }

      if (!input.quotas.length) {
        throw new Error('quotas is empty')
      }

      const result = await ctx.prisma.$transaction(
        input.quotas.map((item) =>
          ctx.prisma.poem.findFirst({
            where: {
              content: {
                contains: item,
              },
            },
            select: {
              id: true,
              title: true,
              content: true,
              author: true,
            },
          })
        )
      )

      const exist = await ctx.prisma.$transaction(
        input.quotas.map((item) =>
          ctx.prisma.poemCard.findFirst({
            where: {
              content: { contains: item },
            },
            select: {
              id: true,
            },
          })
        )
      )

      const urls = await getRandom()

      type Result = Exclude<(typeof result)[number], null>

      const data = result
        .map((item, index) => {
          if (item) {
            item.content = input.quotas[index]!
          }

          return item
        })
        .filter((item, index) => {
          if (!item) return false
          if (exist[index]) return false

          return true
        })
        .slice(0, 30) as Result[]

      return {
        data,
        urls,
      }
    }),
})
