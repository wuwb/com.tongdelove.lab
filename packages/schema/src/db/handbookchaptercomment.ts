import * as z from "zod"
import { CompleteHandBookChapter, RelatedHandBookChapterModelSchema } from "./index"

export const HandBookChapterCommentModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  sequence: z.number().int(),
  HandBookChapterId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteHandBookChapterComment extends z.infer<typeof HandBookChapterCommentModelSchema> {
  HandBookChapter: CompleteHandBookChapter
}

/**
 * RelatedHandBookChapterCommentModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHandBookChapterCommentModelSchema: z.ZodSchema<CompleteHandBookChapterComment> = z.lazy(() => HandBookChapterCommentModelSchema.extend({
  HandBookChapter: RelatedHandBookChapterModelSchema,
}))
