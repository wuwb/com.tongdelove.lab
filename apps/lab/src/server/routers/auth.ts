import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/trpc/trpc'
import type { TRPCRouterRecord } from '@trpc/server'

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @myapp/auth package
    return 'you can see this secret message!'
  }),
} satisfies TRPCRouterRecord
