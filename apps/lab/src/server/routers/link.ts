import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc'
import { getLinks } from '@/server/api/link'

export const linkRouter = createTRPCRouter({
  getLinks: publicProcedure.query(({ ctx }) => {
    return getLinks()
  }),
})
