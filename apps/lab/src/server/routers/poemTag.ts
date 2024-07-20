import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { LangZod, transformPoem, transformTag } from '../trpc/utils'
import { pick } from 'lodash-es'
import { type PoemAuthor, type PrismaClient } from '@prisma/client'
import { type Locale } from '@/i18n/config'

interface FindMany {
  input: {
    select: ('type' | 'name' | 'introduce' | '_count')[]
    page: number
    pageSize: number
    lang: Locale
    type?: string | null | undefined
  }
  ctx: {
    db: PrismaClient
  }
}

const findMany = async ({ ctx, input }: FindMany) => {
  const { select, page, pageSize, lang } = input

  const [total, data] = await ctx.prisma.$transaction([
    ctx.prisma.poemTag.count({
      where: {
        type: {
          equals: input.type,
        },
      },
    }),
    ctx.prisma.poemTag.findMany({
      where: {
        type: {
          equals: input.type,
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: {
          select: {
            poems: true,
          },
        },
      },
      orderBy: {
        poems: {
          _count: 'desc',
        },
      },
    }),
  ])

  return {
    data: data.map((item) => pick(transformTag(item, lang), [...select, 'id'])),
    page,
    pageSize,
    hasNext: page * pageSize < total,
    total,
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
    .query(async ({ ctx, input }) => {
      return await findMany({
        ctx,
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
    .query(async ({ ctx, input }) => {
      return ctx.prisma.poemTag.findMany({
        where: { type: input.type },
        select: {
          id: true,
          updatedAt: true,
        },
      })
    }),

  count: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.$transaction([
      ctx.prisma.poemTag.count(),
      ctx.prisma.poemTag.count({
        where: {
          type: '词牌名',
        },
      }),
    ])
  }),

  findStatisticsById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        lang: LangZod,
      })
    )
    .query(async ({ input, ctx }) => {
      const { id } = input

      const [data, total, tag] = await ctx.prisma.$transaction([
        ctx.prisma.poem.findMany({
          where: { tags: { some: { id } } },
          include: { author: true },
        }),
        ctx.prisma.poem.count({
          where: { tags: { some: { id } } },
        }),
        ctx.prisma.poemTag.findUnique({ where: { id } }),
      ])

      if (!tag) return

      return {
        data: data.map((item) => {
          const json = pick(transformPoem(item, input.lang), [
            'id',
            'title',
            'titlePinYin',
            'author',
            'views',
          ])

          json.author = pick(json.author, [
            'id',
            'name',
            'namePinYin',
          ]) as PoemAuthor

          return json
        }),
        tag: transformTag(tag, input.lang),
        total,
      }
    }),

  findById: publicProcedure.input(z.number()).query(({ input, ctx }) =>
    ctx.prisma.poemTag.findFirst({
      where: { id: input },
      include: { poems: true },
    })
  ),

  conntentPoemIds: publicProcedure
    .input(
      z.object({
        token: z.string(),
        ids: z.array(z.number()),
        tagId: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')

      return ctx.prisma.poemTag.update({
        where: { id: input.tagId },
        data: {
          poems: {
            connect: input.ids.map((id) => ({ id })),
          },
        },
      })
    }),

  deleteById: publicProcedure
    .input(z.number())
    .mutation(({ input, ctx }) =>
      ctx.prisma.poemTag.delete({ where: { id: input } })
    ),

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
    .mutation(({ input, ctx }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')
      const { id } = input

      const objJson = {
        ...input,
        token: undefined,
      }

      if (id) {
        delete objJson.id

        return ctx.prisma.poemTag.update({
          where: { id },
          data: objJson,
        })
      }

      return ctx.prisma.poemTag.create({
        data: objJson,
      })
    }),
})
