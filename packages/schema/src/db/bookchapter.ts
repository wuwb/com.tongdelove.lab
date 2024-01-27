import * as z from "zod"
import { ArticleContentType } from "@prisma/client"
import { CompleteUser, RelatedUserModelSchema, CompleteBook, RelatedBookModelSchema } from "./index"

export const BookChapterModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  wordCount: z.number().int(),
  browserCount: z.number().int(),
  commentCount: z.number().int(),
  rootCommentCount: z.number().int(),
  content: z.string(),
  htmlContent: z.string(),
  contentType: z.nativeEnum(ArticleContentType),
  userId: z.string(),
  parentId: z.number().int(),
  bookId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteBookChapter extends z.infer<typeof BookChapterModelSchema> {
  user: CompleteUser
  book: CompleteBook
}

/**
 * RelatedBookChapterModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBookChapterModelSchema: z.ZodSchema<CompleteBookChapter> = z.lazy(() => BookChapterModelSchema.extend({
  user: RelatedUserModelSchema,
  book: RelatedBookModelSchema,
}))
