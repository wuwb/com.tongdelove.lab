import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'
import { z } from 'zod'
import { getUserPublicById, isAdmin } from '../api/user'

export const userRouter = router({
  getUserProfile: publicProcedure.input(z.string()).query(({ input }) => {
    return getUserPublicById(input)
  }),
})
