import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { LangZod, transformPoem, transformTag } from '../trpc/utils'
import { pick } from 'es-toolkit'
import { type PoemAuthor } from '@tongdelove/schema'
import { type Locale } from '@/i18n/config'
import { labPoemTagApi } from '@/server/backend/lab-poem.api'

interface FindMany {
  input: {
    select: ('type' | 'name' | 'introduce' | '_count')[]
    page: number
    pageSize: number
    lang: Locale
    type?: string | null | undefined
  }
}

const findMany = async ({ input }: FindMany) => {
  const { select, page, pageSize, lang } = input

  const res = await labPoemTagApi.findMany({ type: input.type, page, pageSize })

  return {
    ...res,
    data: (res.data ?? []).map((item: any) =>
      pick(transformTag(item, lang), [...select, 'id']),
    ),
  }
}

export const poemTagRouter = createTRPCRouter({
  findMany: publicProcedure
    .input(
      z.object({
        select: z
          .array(z.enum(['name', 'type', 'introduce', '_count']))
          .default(['name', 'type', 'introduce']),
        type: z.string().or(z.null()).optional(),
        page: z.number().default(1),
        pageSize: z.number().default(28),
        lang: LangZod,
      })
    )
    .query(findMany),

  findCiPaiMing: publicProcedure
    .input(
      z.object({
        select: z
          .array(z.enum(['name', 'type', 'introduce', '_count']))
          .default(['name', 'type', 'introduce']),
        page: z.number().default(1),
        pageSize: z.number().default(28),
        lang: LangZod,
      })
    )
    .query(async ({ input }) => {
      return await findMany({
        input: {
          ...input,
          type: '词牌名',
        },
      })
    }),

  sitemap: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
      })
    )
    .query(async ({ input }) => labPoemTagApi.sitemap(input.type)),

  count: publicProcedure.query(async () => labPoemTagApi.count()),

  findStatisticsById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        lang: LangZod,
      })
    )
    .query(async ({ input }) => {
      const res = await labPoemTagApi.findStatisticsById(input.id)

      if (!res) return

      return {
        ...res,
        data: (res.data ?? []).map((item: any) => {
          const json = pick(transformPoem(item.poem ?? item, input.lang), [
            'id',
            'title',
            'titlePinYin',
            'author',
            'views',
          ])

          const author = json.author as Record<string, unknown> | undefined
          if (author) {
            json.author = pick(author, [
              'id',
              'name',
              'namePinYin',
            ]) as PoemAuthor
          }

          return json
        }),
        tag: transformTag(res.tag, input.lang),
      }
    }),

  findById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return labPoemTagApi.findById(input)
  }),

  conntentPoemIds: publicProcedure
    .input(
      z.object({
        token: z.string(),
        ids: z.array(z.number()),
        tagId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')

      return labPoemTagApi.connectPoemIds(input)
    }),

  deleteById: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => labPoemTagApi.deleteById(input)),

  create: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        token: z.string(),
        name: z.string(),
        name_zh_Hant: z.string().optional(),
        type: z.string().optional(),
        type_zh_Hant: z.string().optional(),
        introduce: z.string().optional(),
        introduce_zh_Hant: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')

      const { token, name_zh_Hant, type_zh_Hant, introduce_zh_Hant, ...rest } =
        input

      return labPoemTagApi.create({
        ...rest,
        nameZhHant: name_zh_Hant,
        typeZhHant: type_zh_Hant,
        introduceZhHant: introduce_zh_Hant,
      })
    }),
})
