import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema } from "./index"

export const StickerModelSchema = z.object({
  id: z.string(),
  object: z.string(),
  color: z.string().nullish(),
  accessory: z.string().nullish(),
  doing: z.string().nullish(),
  style: z.string().nullish(),
  url: z.string(),
  userId: z.string(),
})

export interface CompleteSticker extends z.infer<typeof StickerModelSchema> {
  user: CompleteUser
}

/**
 * RelatedStickerModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStickerModelSchema: z.ZodSchema<CompleteSticker> = z.lazy(() => StickerModelSchema.extend({
  user: RelatedUserModelSchema,
}))
