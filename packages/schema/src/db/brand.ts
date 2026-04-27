import * as z from "zod"
import { Decimal } from "decimal.js"
import { CompleteProduct, RelatedProductModelSchema } from "./index"

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

export const BrandModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  title: z.string(),
  description: z.string(),
  pictures: z.string(),
  icon: z.string().nullish(),
  banner: z.string().nullish(),
  video: z.string().nullish(),
  counter_views: z.number().int().nullish(),
  status: z.string(),
  sort: z.number().int(),
  floor_price: z.number(),
})

export interface CompleteBrand extends z.infer<typeof BrandModelSchema> {
  products: CompleteProduct[]
}

/**
 * RelatedBrandModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBrandModelSchema: z.ZodSchema<CompleteBrand> = z.lazy(() => BrandModelSchema.extend({
  products: RelatedProductModelSchema.array(),
}))
