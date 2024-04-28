import * as z from "zod"
import { CompletePoem, RelatedPoemModelSchema } from "./index"

export const PoemTagModelSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  name_zh_Hant: z.string().nullish(),
  type: z.string().nullish(),
  type_zh_Hant: z.string().nullish(),
  introduce: z.string().nullish(),
  introduce_zh_Hant: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompletePoemTag extends z.infer<typeof PoemTagModelSchema> {
  poems: CompletePoem[]
}

/**
 * RelatedPoemTagModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemTagModelSchema: z.ZodSchema<CompletePoemTag> = z.lazy(() => PoemTagModelSchema.extend({
  poems: RelatedPoemModelSchema.array(),
}))
