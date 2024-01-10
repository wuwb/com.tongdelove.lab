import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema } from "./index"

export const PostModelSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  link: z.string().nullish(),
  image: z.string().nullish(),
  authorId: z.number().int().nullish(),
  publishedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePost extends z.infer<typeof PostModelSchema> {
  author?: CompleteUser | null
}

/**
 * RelatedPostModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModelSchema: z.ZodSchema<CompletePost> = z.lazy(() => PostModelSchema.extend({
  author: RelatedUserModelSchema.nullish(),
}))
