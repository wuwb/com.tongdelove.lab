import * as z from "zod"
import { CompletePoem, RelatedPoemModelSchema } from "./index"

export const PoemCardModelSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  content: z.string().nullish(),
  poemId: z.number().int(),
})

export interface CompletePoemCard extends z.infer<typeof PoemCardModelSchema> {
  poem: CompletePoem
}

/**
 * RelatedPoemCardModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemCardModelSchema: z.ZodSchema<CompletePoemCard> = z.lazy(() => PoemCardModelSchema.extend({
  poem: RelatedPoemModelSchema,
}))
