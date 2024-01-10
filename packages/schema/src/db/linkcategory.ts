import * as z from "zod"
import { CompleteLink, RelatedLinkModelSchema, CompleteLinkSubCategory, RelatedLinkSubCategoryModelSchema } from "./index"

export const LinkCategoryModelSchema = z.object({
  id: z.number().int(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number().int(),
  rank: z.number().int().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  parentId: z.number().int().nullish(),
})

export interface CompleteLinkCategory extends z.infer<typeof LinkCategoryModelSchema> {
  links: CompleteLink[]
  LinkSubCategory: CompleteLinkSubCategory[]
  parentCategory?: CompleteLinkCategory | null
  childCategories: CompleteLinkCategory[]
}

/**
 * RelatedLinkCategoryModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkCategoryModelSchema: z.ZodSchema<CompleteLinkCategory> = z.lazy(() => LinkCategoryModelSchema.extend({
  links: RelatedLinkModelSchema.array(),
  LinkSubCategory: RelatedLinkSubCategoryModelSchema.array(),
  parentCategory: RelatedLinkCategoryModelSchema.nullish(),
  childCategories: RelatedLinkCategoryModelSchema.array(),
}))
