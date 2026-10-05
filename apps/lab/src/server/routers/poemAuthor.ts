import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { labPoemAuthorApi } from '@/server/backend/lab-poem.api'

export const poemAuthorRouter = createTRPCRouter({
  count: publicProcedure.query(async () => labPoemAuthorApi.count()),

  sitemap: publicProcedure.query(async () => labPoemAuthorApi.sitemap()),

  findMany: publicProcedure
    .input(
      z
        .object({
          page: z.number().optional().default(1),
          pageSize: z.number().optional().default(28),
          keyword: z.string().optional(),
          select: z
            .array(
              z.enum([
                '_count',
                'name',
                'namePinYin',
                'introduce',
                'birthDate',
                'deathDate',
                'dynasty',
                'poems',
                'createdAt',
                'updatedAt',
              ])
            )
            .optional()
            .default([
              '_count',
              'name',
              'namePinYin',
              'introduce',
              'birthDate',
              'deathDate',
              'dynasty',
              'poems',
              'createdAt',
              'updatedAt',
            ]),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const { page = 1, pageSize = 28, keyword } = input ?? {}

      return labPoemAuthorApi.findMany({ page, pageSize, keyword })
    }),

  findById: publicProcedure.input(z.number()).query(async ({ input }) => {
    return labPoemAuthorApi.findById(input)
  }),

  findNotPoem: publicProcedure.query(async () => labPoemAuthorApi.findNotPoem()),

  create: publicProcedure
    .input(
      z.object({
        token: z.string(),
        id: z.number().optional(),
        name: z.string(),
        name_zh_Hant: z.string().optional(),
        birthDate: z.number().optional(),
        deathDate: z.number().optional(),
        introduce: z.string().optional(),
        namePinYin: z.string().optional(),
        dynasty: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')

      return labPoemAuthorApi.create({
        id: input.id,
        name: input.name,
        nameZhHant: input.name_zh_Hant,
        birthDate: input.birthDate,
        deathDate: input.deathDate,
        introduce: input.introduce,
        namePinYin: input.namePinYin,
        dynasty: input.dynasty,
      })
    }),

  deleteById: publicProcedure
    .input(
      z.object({
        token: z.string(),
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.token !== process.env.TOKEN) throw new Error('Invalid token')
      return labPoemAuthorApi.deleteById({ id: input.id, token: input.token })
    }),
})
