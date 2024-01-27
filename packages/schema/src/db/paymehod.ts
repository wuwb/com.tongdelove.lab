import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema } from "./index"

export const PayMehodModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  payment_type: z.string(),
  card_number: z.number().int().nullish(),
  owner_name: z.string().nullish(),
  account_number: z.number().int().nullish(),
  expiration_date_mm: z.number().int().nullish(),
  expiration_date_yy: z.number().int().nullish(),
  identification_doc: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
})

export interface CompletePayMehod extends z.infer<typeof PayMehodModelSchema> {
  users: CompleteUser
}

/**
 * RelatedPayMehodModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPayMehodModelSchema: z.ZodSchema<CompletePayMehod> = z.lazy(() => PayMehodModelSchema.extend({
  users: RelatedUserModelSchema,
}))
