import * as z from "zod"
import { CommentStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModelSchema, CompleteArticle, RelatedArticleModelSchema } from "./index"

export const CommentModelSchema = z.object({
  id: z.string(),
  commentPostId: z.string(),
  commentAuthor: z.string(),
  commentAuthorEmail: z.string(),
  commentAuthorUrl: z.string(),
  commentAuthorIp: z.string(),
  commentDate: z.date(),
  commentDateGmt: z.date(),
  commentkarma: z.number().int(),
  commentApproved: z.number().int(),
  commentAgent: z.string(),
  commentType: z.string(),
  commentParent: z.number().int(),
  userId: z.string(),
  type: z.number().int(),
  replay: z.string(),
  hasPicture: z.number().int(),
  picUrls: z.string(),
  star: z.number().int(),
  valueId: z.string(),
  content: z.string(),
  htmlContent: z.string(),
  adminContent: z.string(),
  status: z.nativeEnum(CommentStatus),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  parentId: z.string(),
  rootId: z.string(),
  latest: z.string(),
  commentCount: z.number().int(),
  likedCount: z.number().int(),
  sourceId: z.number().int(),
  articleId: z.string().nullish(),
})

export interface CompleteComment extends z.infer<typeof CommentModelSchema> {
  user: CompleteUser
  Article?: CompleteArticle | null
}

/**
 * RelatedCommentModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModelSchema: z.ZodSchema<CompleteComment> = z.lazy(() => CommentModelSchema.extend({
  user: RelatedUserModelSchema,
  Article: RelatedArticleModelSchema.nullish(),
}))
