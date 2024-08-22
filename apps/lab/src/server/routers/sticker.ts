import { createSticker } from '@/server/api/sticker'
import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'

export const stickerRouter = router({
  create: protectedProcedure.mutation(({ ctx }) => {
    console.log('ctx: ', ctx)

    return createSticker()
  }),
}) 
