import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteStore, RelatedStoreModelSchema, CompleteAddress, RelatedAddressModelSchema, CompleteFeedback, RelatedFeedbackModelSchema } from "./index"

export const TelephoneModelSchema = z.object({
  id: z.string(),
  number: z.string(),
  region_code: z.string(),
  country_code: z.string(),
  userId: z.string(),
})

export interface CompleteTelephone extends z.infer<typeof TelephoneModelSchema> {
  user: CompleteUser
  store: CompleteStore[]
  address: CompleteAddress[]
  feedback: CompleteFeedback[]
}

/**
 * RelatedTelephoneModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTelephoneModelSchema: z.ZodSchema<CompleteTelephone> = z.lazy(() => TelephoneModelSchema.extend({
  user: RelatedUserModelSchema,
  store: RelatedStoreModelSchema.array(),
  address: RelatedAddressModelSchema.array(),
  feedback: RelatedFeedbackModelSchema.array(),
}))
