import * as z from "zod"

export const StickerModelSchema = z.object({
  id: z.string(),
  object: z.string(),
  color: z.string().nullish(),
  accessory: z.string().nullish(),
  doing: z.string().nullish(),
  style: z.string().nullish(),
  url: z.string(),
  deviceId: z.string().nullish(),
  userId: z.string().nullish(),
})
