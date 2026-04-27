import * as z from "zod"
import { CompleteArticle, RelatedArticleModelSchema, CompleteLink, RelatedLinkModelSchema } from "./index"

export const CategoryModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  title: z.string(),
  type: z.number().int(),
  status: z.string(),
  description: z.string(),
  slug: z.string(),
  keywords: z.string(),
  pid: z.number().int(),
  icon_url: z.string(),
  pic_url: z.string(),
  level: z.string(),
  sort: z.number().int(),
  articleId: z.string().nullish(),
  createdBy: z.string(),
  updatedBy: z.string(),
  remark: z.string().nullish(),
  version: z.number().int(),
  label: z.string(),
  value: z.string(),
  order: z.number().int(),
  onlyChild: z.boolean(),
  parentId: z.string().nullish(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModelSchema> {
  Article?: CompleteArticle | null
  Link: CompleteLink[]
}

/**
 * RelatedCategoryModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModelSchema: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModelSchema.extend({
  Article: RelatedArticleModelSchema.nullish(),
  Link: RelatedLinkModelSchema.array(),
}))
