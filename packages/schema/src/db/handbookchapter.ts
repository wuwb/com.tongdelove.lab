import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteHandBook, RelatedHandBookModelSchema, CompleteHandBookChapterComment, RelatedHandBookChapterCommentModelSchema } from "./index"

export const HandBookChapterModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  browseCount: z.number().int(),
  commentCount: z.number().int(),
  rootComment: z.number().int(),
  tryRead: z.boolean(),
  content: z.string(),
  htmlContent: z.string(),
  wordCount: z.number().int(),
  userId: z.string(),
  bookId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteHandBookChapter extends z.infer<typeof HandBookChapterModelSchema> {
  user: CompleteUser
  book: CompleteHandBook
  comments: CompleteHandBookChapterComment[]
}

/**
 * RelatedHandBookChapterModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHandBookChapterModelSchema: z.ZodSchema<CompleteHandBookChapter> = z.lazy(() => HandBookChapterModelSchema.extend({
  user: RelatedUserModelSchema,
  book: RelatedHandBookModelSchema,
  comments: RelatedHandBookChapterCommentModelSchema.array(),
}))
