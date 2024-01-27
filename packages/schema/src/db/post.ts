import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteProduct, RelatedProductModelSchema } from "./index"

export const PostModelSchema = z.object({
  id: z.string(),
  postAuthor: z.number().int(),
  postDate: z.date(),
  postDateGmt: z.date(),
  content: z.string().nullish(),
  postTitle: z.string(),
  postExcerpt: z.string().nullish(),
  postStatus: z.string(),
  commentStatus: z.string(),
  pingStatus: z.string(),
  postPassword: z.string(),
  postName: z.string(),
  toPing: z.string(),
  pinged: z.string(),
  postModified: z.date(),
  postModifiedGmt: z.date(),
  postContentFiltered: z.number().int(),
  postParent: z.number().int(),
  guid: z.string(),
  menuOrder: z.number().int(),
  postType: z.string(),
  postMimeType: z.string(),
  commentCount: z.number().int(),
  viewCount: z.number().int(),
  likesCount: z.number().int(),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  readTime: z.number().int().nullish(),
  slug: z.string(),
  title: z.string(),
  link: z.string().nullish(),
  image: z.string().nullish(),
  publishedAt: z.date().nullish(),
})

export interface CompletePost extends z.infer<typeof PostModelSchema> {
  user: CompleteUser
  Product: CompleteProduct[]
}

/**
 * RelatedPostModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModelSchema: z.ZodSchema<CompletePost> = z.lazy(() => PostModelSchema.extend({
  user: RelatedUserModelSchema,
  Product: RelatedProductModelSchema.array(),
}))
