import * as z from "zod"
import { CompletePoem, RelatedPoemModelSchema, CompleteKeyword, RelatedKeywordModelSchema } from "./index"

export const PoemKeywordsModelSchema = z.object({
  id: z.number().int(),
  poemId: z.number().int(),
  keywordId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePoemKeywords extends z.infer<typeof PoemKeywordsModelSchema> {
  poem: CompletePoem
  keyword: CompleteKeyword
}

/**
 * RelatedPoemKeywordsModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemKeywordsModelSchema: z.ZodSchema<CompletePoemKeywords> = z.lazy(() => PoemKeywordsModelSchema.extend({
  poem: RelatedPoemModelSchema,
  keyword: RelatedKeywordModelSchema,
}))
