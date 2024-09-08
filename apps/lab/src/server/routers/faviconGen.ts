import { router, publicProcedure } from '@/server/trpc/trpc'
import { FaviconGenModelSchema } from '@tongdelove/schema'
import { createFavicon } from '@/server/api/faviconGen'

export const faviconGenRouter = router({
  create: publicProcedure
    .input(
      FaviconGenModelSchema.omit({
        title: true,
        id: true,
        createdAt: true,
        live: true,
        userId: true,
      })
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
        textStrokeColor: input.textStrokeColor,
        textStrokeWidth: input.textStrokeWidth,
        fineTuneVerticalPosition: input.fineTuneVerticalPosition,
        fineTuneHorizontalPosition: input.fineTuneHorizontalPosition,
        deviceId: input.deviceId,
        userId: ctx.session?.user.id,
      })
    }),
})
