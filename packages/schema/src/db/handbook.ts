import * as z from "zod"
import { Decimal } from "decimal.js"
import { CompleteUser, RelatedUserModelSchema, CompleteHandBookChapter, RelatedHandBookChapterModelSchema } from "./index"

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

export const HandBookModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  introduce: z.string(),
  summary: z.string(),
  authorIntro: z.string(),
  price: z.number(),
  completionAt: z.date(),
  isAllDone: z.boolean(),
  isAgree: z.boolean(),
  overURL: z.string(),
  wordCount: z.number().int(),
  saleCount: z.number().int(),
  commentCount: z.number().int(),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteHandBook extends z.infer<typeof HandBookModelSchema> {
  user: CompleteUser
  HandBookChapter: CompleteHandBookChapter[]
}

/**
 * RelatedHandBookModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHandBookModelSchema: z.ZodSchema<CompleteHandBook> = z.lazy(() => HandBookModelSchema.extend({
  user: RelatedUserModelSchema,
  HandBookChapter: RelatedHandBookChapterModelSchema.array(),
}))
