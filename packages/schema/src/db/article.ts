import * as z from "zod"
import { ArticleStatus, ArticleContentType } from "@prisma/client"
import { CompleteCategory, RelatedCategoryModelSchema, CompleteTag, RelatedTagModelSchema, CompleteCollection, RelatedCollectionModelSchema, CompleteComment, RelatedCommentModelSchema, CompleteUser, RelatedUserModelSchema } from "./index"

export const ArticleModelSchema = z.object({
  id: z.string(),
  lastCommentAt: z.date(),
  name: z.string(),
  browseCount: z.number().int(),
  commentCount: z.number().int(),
  rootCommentCont: z.number().int(),
  likedCount: z.number().int(),
  wordCount: z.number().int(),
  hot: z.number().int(),
  status: z.nativeEnum(ArticleStatus),
  content: z.string(),
  htmlContent: z.string(),
  summary: z.string(),
  coverURL: z.string(),
  contentType: z.nativeEnum(ArticleContentType),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteArticle extends z.infer<typeof ArticleModelSchema> {
  categories: CompleteCategory[]
  tags: CompleteTag[]
  collections: CompleteCollection[]
  comments: CompleteComment[]
  user: CompleteUser
}

/**
 * RelatedArticleModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedArticleModelSchema: z.ZodSchema<CompleteArticle> = z.lazy(() => ArticleModelSchema.extend({
  categories: RelatedCategoryModelSchema.array(),
  tags: RelatedTagModelSchema.array(),
  collections: RelatedCollectionModelSchema.array(),
  comments: RelatedCommentModelSchema.array(),
  user: RelatedUserModelSchema,
}))
