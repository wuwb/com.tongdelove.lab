import { z } from 'zod'
import { publicProcedure } from '@/server/trpc/trpc'
import { LangZod, transformPoem, transformTag } from '../trpc/utils'
import { splitChineseSymbol } from '@/utils'
import { labPoemApi, labPoemTagApi } from '@/server/backend/lab-poem.api'

export const poemRouter = {
  count: publicProcedure.query(async () => {
    return labPoemApi.count()
  }),

  isSame: publicProcedure
    .input(
      z.object({
        authorId: z.number(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return labPoemApi.isSame({
        authorId: input.authorId,
        title: input.title.toLocaleLowerCase(),
      })
    }),

  /**
   * 根据 id 删除诗词
   */
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        token: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')
      return labPoemApi.deleteById({ id: input.id, token: input.token })
    }),

  findByAuthorId: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        pageSize: z.number().optional().default(28),
        authorId: z.number(),
        select: z
          .array(z.enum(['title', 'titlePinYin', 'content', 'views', 'author']))
          .optional(),
      })
    )
    .query(async ({ input }) => {
      return labPoemApi.findByAuthorId({
        authorId: input.authorId,
        page: input.page,
        pageSize: input.pageSize,
        select: input.select,
      })
    }),

  sitemap: publicProcedure.query(async () => labPoemApi.sitemap()),

  search: publicProcedure
    .input(z.string().default(''))
    .query(async ({ input }) => labPoemApi.search(input)),

  find: publicProcedure
    .input(
      z
        .object({
          page: z.number().optional().default(1),
          pageSize: z.number().optional().default(28),
          sort: z.enum(['updatedAt', 'improve', 'createdAt']).optional(),
          lang: LangZod,
        })
        .optional()
    )
    .query(async ({ input = {} }) => {
      const lang = input.lang || 'zh-Hans'
      const res = await labPoemApi.find({
        page: input.page ?? 1,
        pageSize: input.pageSize ?? 28,
        sort: input.sort,
      })

      return {
        ...res,
        data: (res.data ?? []).map((item: any) => transformPoem(item, lang)),
      }
    }),

  findByTagId: publicProcedure
    .input(
      z.object({
        id: z.number(),
        page: z.number().default(1),
        pageSize: z.number().default(28),
        lang: LangZod,
      })
    )
    .query(async ({ input }) => {
      const res = await labPoemApi.findByTagId({
        id: input.id,
        page: input.page,
        pageSize: input.pageSize,
      })

      if (!res) return

      return {
        ...res,
        data: (res.data ?? []).map((item: any) => transformPoem(item, input.lang)),
        tag: transformTag(res.tag, input.lang),
      }
    }),

  /**
   * 文心一言生成诗词译文
   */
  genTranslation: publicProcedure
    .input(
      z.object({
        token: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')
      return labPoemApi.genTranslation({
        token: input.token,
        content: input.content,
      })
    }),

  /**
   * 根据 id 查找诗词
   */
  findById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        lang: LangZod,
      })
    )
    .query(async ({ input }) => {
      const { id } = input
      const res = await labPoemApi.findById(id)

      if (!res) return

      // 特殊逻辑，自动标注五言绝句/七言绝句
      const has = (res.tags ?? []).find((tag: any) =>
        ['五言绝句', '七言绝句', '五言律诗', '七言律诗'].includes(tag.name),
      )

      if (!has) {
        const contentArr = splitChineseSymbol(res.content, false)

        let connectTagId = -1

        // 绝句
        if (contentArr?.length === 4) {
          if (contentArr.every((item) => item.length === 5)) {
            connectTagId = 109
          }
          if (contentArr.every((item) => item.length === 7)) {
            connectTagId = 110
          }
        }

        // 律诗
        if (contentArr?.length === 8) {
          if (contentArr.every((item) => item.length === 5)) {
            connectTagId = 105
          }

          if (contentArr.every((item) => item.length === 7)) {
            connectTagId = 108
          }
        }

        if (connectTagId !== -1) {
          void labPoemTagApi
            .connectPoemIds({
              token: process.env.TOKEN ?? '',
              ids: [id],
              tagId: connectTagId,
            })
            .catch((e) => {
              console.log(e)
            })
        }
      }

      return transformPoem(res, input.lang)
    }),
}
