import * as z from "zod"
import { CompleteTelephone, RelatedTelephoneModelSchema } from "./index"

export const FeedbackModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.string(),
  username: z.string(),
  feedType: z.string(),
  telephoneId: z.string(),
  mobile: z.string(),
  content: z.string(),
  status: z.number().int(),
  hasPicture: z.number().int(),
  picUtls: z.string(),
})

export interface CompleteFeedback extends z.infer<typeof FeedbackModelSchema> {
  telephone: CompleteTelephone
}

/**
 * RelatedFeedbackModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFeedbackModelSchema: z.ZodSchema<CompleteFeedback> = z.lazy(() => FeedbackModelSchema.extend({
  telephone: RelatedTelephoneModelSchema,
}))
