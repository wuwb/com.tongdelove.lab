import * as z from "zod"
import { CompletePoem, RelatedPoemModelSchema } from "./index"

export const PoemAuthorModelSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  name_zh_Hant: z.string().nullish(),
  namePinYin: z.string().nullish(),
  introduce: z.string().nullish(),
  birthDate: z.number().int().nullish(),
  deathDate: z.number().int().nullish(),
  dynasty: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompletePoemAuthor extends z.infer<typeof PoemAuthorModelSchema> {
  poems: CompletePoem[]
}

/**
 * RelatedPoemAuthorModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemAuthorModelSchema: z.ZodSchema<CompletePoemAuthor> = z.lazy(() => PoemAuthorModelSchema.extend({
  poems: RelatedPoemModelSchema.array(),
}))
