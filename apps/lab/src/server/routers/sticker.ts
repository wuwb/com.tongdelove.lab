import { createSticker, listStickers, hideSticker } from '@/server/api/sticker'
import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'
import { z } from 'zod'
import { generatePresignedUrlUserImage } from '../api/s3'
import { STICKER_ENDPOINT } from '@/utils/constants/sticker'
import { isAdmin } from '../api/user'
import { getById } from '../api/sticker'
import { createStripeCheckoutSession } from '@/server/api/credit'

export const stickerRouter = router({
  create: publicProcedure
    .input(
      z.object({
        object: z.string(),
        color: z.string(),
        accessory: z.string(),
        doing: z.string(),
        style: z.string(),
        deviceId: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // const basePrompt =
      //   input.object +
      //   ', vivid, cute, friendly, bright, simple sticker in Pixar style, clear background with' +
      //   input.color +
      //   'color theme and border, with a' +
      //   input.accessory +
      //   'accessory and doing ' +
      //   input.doing +
      //   'and in ' +
      //   input.style +
      //   'style'

      // const newUrl = STICKER_ENDPOINT + '?prompt=' + basePrompt

      // const response = await fetch(newUrl, {
      //   method: 'GET',
      // })
      // console.log('response.ok: ', response.ok)
      // if (!response.ok) {
      //   throw new Error('genereate failed')
      // }

      // console.log('response: ', response)

      // const blob = await response.blob()
      // const objectUrl = URL.createObjectURL(blob)

      // // 生成链接
      // const key = `stickers/${Date.now()}`
      // const presignedUrl = await generatePresignedUrlUserImage({
      //   key,
      //   contentType: 'image/png',
      //   bucket: `lab-sticker`,
      // })

      // console.log('presignedUrl: ', presignedUrl)

      // // 上传
      // await fetch(presignedUrl, {
      //   method: 'PUT',
      //   body: new File([blob], 'generated.png', {
      //     type: 'image/png',
      //   }),
      // })

      // const imageUrl = `https://${presignedUrl.split('/')[2]}/${key}`

      // console.log('imageUrl: ', imageUrl)

      return createSticker({
        object: input.object,
        color: input.color,
        accessory: input.accessory,
        doing: input.doing,
        style: input.style,
        url: input.url,
        deviceId: input.deviceId,
        userId: ctx.session?.user.id,
      })
    }),
  listHomePage: publicProcedure
    .input(
      z.object({
        page: z.number(),
        take: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.take > 200) {
        throw new Error('too many takes')
      }
      return listStickers({
        page: input.page,
        take: input.take,
        live: true,
      })
    }),
  listMyStickers: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        take: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.take > 200) {
        throw new Error('too many takes')
      }
      return listStickers({
        userId: ctx.session.user.id,
        page: input.page,
        take: input.take,
      })
    }),
  hide: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const hasAdminRole = await isAdmin(ctx.session.user.id)
      if (!hasAdminRole) {
        throw new Error('You are not authorized to perform this action')
      }
      return hideSticker({
        id: input.id,
      })
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return getById({
        id: input.id,
      })
    }),

  purchase: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        successUrl: z.string().optional(),
        cancelUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return createStripeCheckoutSession({
        userId: ctx.session.user.id,
        cents: 99,
        name: `Sticker ${input.id}`,
        description: `Purchase Sticker ${input.id}`,
        successUrl: input.successUrl,
        cancelUrl: input.cancelUrl,
      })
    }),
})
