import { createSticker } from '@/server/api/sticker'
import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'
import { z } from 'zod'
import { generatePresignedUrlUserImage } from '../api/s3'
import { STICKER_ENDPOINT } from '@/utils/constants/sticker'

export const stickerRouter = router({
  create: protectedProcedure
    .input(z.object({
      object: z.string(),
      color: z.string(),
      accessory: z.string(),
      doing: z.string(),
      style: z.string(),
      deviceId: z.string(),
      url: z.string()
    }))
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
        userId: ctx.session.user.id,
      })
  }),
}) 
