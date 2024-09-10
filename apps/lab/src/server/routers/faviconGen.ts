import { router, publicProcedure } from '@/server/trpc/trpc'
import { FaviconGenModelSchema } from '@tongdelove/schema'
import { createFavicon } from '@/server/api/faviconGen'

export const faviconGenRouter = router({
  create: publicProcedure
    .input(
      FaviconGenModelSchema.omit({
        id: true,
        title: true,
        userId: true,
        createdAt: true,
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
        textOpacity: input.textOpacity,
        textStrokeColor: input.textStrokeColor,
        textStrokeOpacity: input.textStrokeOpacity,
        textStrokeWidth: input.textStrokeWidth,
        fineTuneVerticalPosition: input.fineTuneVerticalPosition,
        fineTuneHorizontalPosition: input.fineTuneHorizontalPosition,
        deviceId: input.deviceId,
        userId: ctx.session?.user.id,
        live: input.live,
      })
    }),
})
