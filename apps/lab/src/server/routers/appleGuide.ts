import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { prisma } from '@/server/db/prisma'

export const appleGuideRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const result = prisma.appleGuide.findMany()
    return result
  }),
})
