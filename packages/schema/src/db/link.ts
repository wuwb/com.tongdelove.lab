import * as z from "zod"
import { CompleteLinkCategory, RelatedLinkCategoryModelSchema, CompleteLinkSubCategory, RelatedLinkSubCategoryModelSchema, CompleteCategory, RelatedCategoryModelSchema, CompleteUser, RelatedUserModelSchema } from "./index"

export const LinkModelSchema = z.object({
  id: z.string(),
  icon: z.string().nullish(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  public: z.boolean(),
  status: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  catagoryId: z.number().int().nullish(),
  subCategoryId: z.number().int().nullish(),
  categoryId: z.string(),
  userId: z.string(),
})

export interface CompleteLink extends z.infer<typeof LinkModelSchema> {
  catagory?: CompleteLinkCategory | null
  subCategory?: CompleteLinkSubCategory | null
  category: CompleteCategory
  user: CompleteUser
}

/**
 * RelatedLinkModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkModelSchema: z.ZodSchema<CompleteLink> = z.lazy(() => LinkModelSchema.extend({
  catagory: RelatedLinkCategoryModelSchema.nullish(),
  subCategory: RelatedLinkSubCategoryModelSchema.nullish(),
  category: RelatedCategoryModelSchema,
  user: RelatedUserModelSchema,
}))
