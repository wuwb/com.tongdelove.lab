import { router, publicProcedure } from '@/server/trpc/trpc'
import { z } from 'zod'
import { FaviconGenModelSchema } from '@tongdelove/schema'
import { createFavicon } from '@/server/api/faviconGen'

export const faviconGenRouter = router({
  create: publicProcedure
    .input(
      z.object(
        FaviconGenModelSchema.omit({
          id: true,
          createdAt: true,
          live: true,
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      return createFavicon({
        text: input.text,
        size: input.size,
        radius: input.radius,
        backgroundColor: input.backgroundColor,
        fontFamily: input.fontFamily,
        fontWeight: input.fontWeight,
        fontSize: input.fontSize,
        fontRotate: input.fontRotate,
        textColor: input.textColor,
        fineTuneVerticalPosition: input.fineTuneVerticalPosition,
        fineTuneHorizontalPosition: input.fineTuneHorizontalPosition,
        deviceId: input.deviceId,
        userId: ctx.session?.user.id,
      })
    }),
})
