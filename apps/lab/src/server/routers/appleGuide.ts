import { publicProcedure } from '@/server/trpc/trpc'
import { prisma } from '@/server/db/prisma'

export const appleGuideRouter = {
  getAll: publicProcedure.query(({ ctx }) => {
    const result = prisma.appleGuide.findMany()
    console.log('result: ', result)
    return result
  }),
}
