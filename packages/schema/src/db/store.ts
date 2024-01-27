import * as z from "zod"
import { CompleteTelephone, RelatedTelephoneModelSchema } from "./index"

export const StoreModelSchema = z.object({
  id: z.string(),
  level: z.string(),
  imgurl: z.string(),
  title: z.string(),
  description: z.string(),
  phoneId: z.string(),
  city: z.string(),
  detail: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  scopeList: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
})

export interface CompleteStore extends z.infer<typeof StoreModelSchema> {
  phone: CompleteTelephone
}

/**
 * RelatedStoreModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreModelSchema: z.ZodSchema<CompleteStore> = z.lazy(() => StoreModelSchema.extend({
  phone: RelatedTelephoneModelSchema,
}))
