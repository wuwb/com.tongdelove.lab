import * as z from "zod"
import { CompleteLink, RelatedLinkModelSchema, CompleteLinkCategory, RelatedLinkCategoryModelSchema } from "./index"

export const LinkSubCategoryModelSchema = z.object({
  id: z.number().int(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  categoryId: z.number().int(),
})

export interface CompleteLinkSubCategory extends z.infer<typeof LinkSubCategoryModelSchema> {
  links: CompleteLink[]
  category: CompleteLinkCategory
}

/**
 * RelatedLinkSubCategoryModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkSubCategoryModelSchema: z.ZodSchema<CompleteLinkSubCategory> = z.lazy(() => LinkSubCategoryModelSchema.extend({
  links: RelatedLinkModelSchema.array(),
  category: RelatedLinkCategoryModelSchema,
}))
