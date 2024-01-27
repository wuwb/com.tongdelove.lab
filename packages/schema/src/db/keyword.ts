import * as z from "zod"
import { CompletePoemKeywords, RelatedPoemKeywordsModelSchema } from "./index"

export const KeywordModelSchema = z.object({
  id: z.string(),
  keyword: z.string(),
  url: z.string(),
  isHot: z.number().int(),
  isDefault: z.number().int(),
  sortOrder: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDelete: z.boolean(),
  name: z.string(),
  locale: z.string().nullish(),
})

export interface CompleteKeyword extends z.infer<typeof KeywordModelSchema> {
  poems: CompletePoemKeywords[]
}

/**
 * RelatedKeywordModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedKeywordModelSchema: z.ZodSchema<CompleteKeyword> = z.lazy(() => KeywordModelSchema.extend({
  poems: RelatedPoemKeywordsModelSchema.array(),
}))
