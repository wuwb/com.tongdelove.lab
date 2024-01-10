import * as z from "zod"
import { CompletePoemKeywords, RelatedPoemKeywordsModelSchema } from "./index"

export const PoemModelSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  locale: z.string().nullish(),
  author: z.string(),
  link: z.string().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePoem extends z.infer<typeof PoemModelSchema> {
  keywords: CompletePoemKeywords[]
}

/**
 * RelatedPoemModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemModelSchema: z.ZodSchema<CompletePoem> = z.lazy(() => PoemModelSchema.extend({
  keywords: RelatedPoemKeywordsModelSchema.array(),
}))
