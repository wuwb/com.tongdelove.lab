import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteCategory, RelatedCategoryModelSchema } from "./index"

export const WebsiteModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  userId: z.string(),
  categoryId: z.string(),
})

export interface CompleteWebsite extends z.infer<typeof WebsiteModelSchema> {
  user: CompleteUser
  category: CompleteCategory
}

/**
 * RelatedWebsiteModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWebsiteModelSchema: z.ZodSchema<CompleteWebsite> = z.lazy(() => WebsiteModelSchema.extend({
  user: RelatedUserModelSchema,
  category: RelatedCategoryModelSchema,
}))
