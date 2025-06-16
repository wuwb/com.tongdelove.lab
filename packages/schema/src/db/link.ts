import * as z from "zod"
import { CompleteCategory, RelatedCategoryModelSchema, CompleteUser, RelatedUserModelSchema } from "./index"

export const LinkModelSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  icon: z.string().nullish(),
  public: z.boolean(),
  status: z.number().int(),
  parentId: z.string().nullish(),
  categoryId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteLink extends z.infer<typeof LinkModelSchema> {
  category: CompleteCategory
  user: CompleteUser
}

/**
 * RelatedLinkModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkModelSchema: z.ZodSchema<CompleteLink> = z.lazy(() => LinkModelSchema.extend({
  category: RelatedCategoryModelSchema,
  user: RelatedUserModelSchema,
}))
