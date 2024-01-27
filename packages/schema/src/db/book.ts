import * as z from "zod"
import { BookStatus, ArticleContentType } from "@prisma/client"
import { CompleteUser, RelatedUserModelSchema, CompleteBookChapter, RelatedBookChapterModelSchema } from "./index"

export const BookModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
  browserCount: z.number().int(),
  commentCount: z.number().int(),
  chapterCount: z.number().int(),
  wordCount: z.number().int(),
  studyUserCount: z.number().int(),
  coverURL: z.string(),
  status: z.nativeEnum(BookStatus),
  starUserCount: z.number().int(),
  star: z.number().int(),
  content: z.string(),
  htmlContent: z.string(),
  contentType: z.nativeEnum(ArticleContentType),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteBook extends z.infer<typeof BookModelSchema> {
  user: CompleteUser
  BookChapter: CompleteBookChapter[]
}

/**
 * RelatedBookModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBookModelSchema: z.ZodSchema<CompleteBook> = z.lazy(() => BookModelSchema.extend({
  user: RelatedUserModelSchema,
  BookChapter: RelatedBookChapterModelSchema.array(),
}))
