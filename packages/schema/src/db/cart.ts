import * as z from "zod"
import { Decimal } from "decimal.js"
import { CompleteUser, RelatedUserModelSchema } from "./index"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const CartModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  productSn: z.string(),
  productName: z.string(),
  price: z.number(),
  number: z.number().int(),
  specifications: z.string(),
  isChecked: z.boolean(),
  pictures: z.string(),
})

export interface CompleteCart extends z.infer<typeof CartModelSchema> {
  user: CompleteUser
}

/**
 * RelatedCartModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModelSchema: z.ZodSchema<CompleteCart> = z.lazy(() => CartModelSchema.extend({
  user: RelatedUserModelSchema,
}))
