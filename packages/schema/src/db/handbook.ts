import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteHandBookChapter, RelatedHandBookChapterModelSchema } from "./index"

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
