import * as z from "zod"
import { CompleteArticle, RelatedArticleModelSchema } from "./index"

export const CollectionModelSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.string(),
  valueId: z.string(),
  type: z.number().int(),
  articleId: z.string().nullish(),
})

export interface CompleteCollection extends z.infer<typeof CollectionModelSchema> {
  article?: CompleteArticle | null
}

/**
 * RelatedCollectionModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollectionModelSchema: z.ZodSchema<CompleteCollection> = z.lazy(() => CollectionModelSchema.extend({
  article: RelatedArticleModelSchema.nullish(),
}))
