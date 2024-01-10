import * as z from "zod"
import { CompleteLinkCategory, RelatedLinkCategoryModelSchema, CompleteLinkSubCategory, RelatedLinkSubCategoryModelSchema } from "./index"

export const LinkModelSchema = z.object({
  id: z.string(),
  icon: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  public: z.boolean(),
  status: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  catagoryId: z.number().int(),
  subCategoryId: z.number().int(),
  subcategoryId: z.string().nullish(),
})

export interface CompleteLink extends z.infer<typeof LinkModelSchema> {
  catagory: CompleteLinkCategory
  subCategory?: CompleteLinkSubCategory | null
}

/**
 * RelatedLinkModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkModelSchema: z.ZodSchema<CompleteLink> = z.lazy(() => LinkModelSchema.extend({
  catagory: RelatedLinkCategoryModelSchema,
  subCategory: RelatedLinkSubCategoryModelSchema.nullish(),
}))
