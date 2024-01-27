import * as z from "zod"
import { CompleteArticle, RelatedArticleModelSchema } from "./index"

export const TagModelSchema = z.object({
  id: z.string(),
  articleId: z.string().nullish(),
})

export interface CompleteTag extends z.infer<typeof TagModelSchema> {
  Article?: CompleteArticle | null
}

/**
 * RelatedTagModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTagModelSchema: z.ZodSchema<CompleteTag> = z.lazy(() => TagModelSchema.extend({
  Article: RelatedArticleModelSchema.nullish(),
}))
