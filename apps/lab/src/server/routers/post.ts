import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc/trpc'
import type { TRPCRouterRecord } from "@trpc/server";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ 
      orderBy: { 
        id: 'desc' 
      } ,
      limit: 10,
    })
  }),
  byId: publicProcedure.input(z.object({ id: z.number() }))
  .query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input.id } })
  }),
  create: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input })
    }),
  delete: publicProcedure.input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } })
  }),
} satisfies TRPCRouterRecord;
