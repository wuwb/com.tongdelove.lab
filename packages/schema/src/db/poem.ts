import * as z from "zod"
import { CompletePoemKeywords, RelatedPoemKeywordsModelSchema, CompletePoemAuthor, RelatedPoemAuthorModelSchema, CompletePoemTag, RelatedPoemTagModelSchema, CompletePoemCard, RelatedPoemCardModelSchema } from "./index"

export const PoemModelSchema = z.object({
  id: z.number().int(),
  slug: z.string(),
  title: z.string(),
  titlePinYin: z.string().nullish(),
  title_zh_Hant: z.string().nullish(),
  content: z.string(),
  conetntPinYin: z.string().nullish(),
  content_zh_Hant: z.string().nullish(),
  introduce: z.string().nullish(),
  introduce_zh_Hant: z.string().nullish(),
  translation: z.string().nullish(),
  translation_zh_Hant: z.string().nullish(),
  translation_en: z.string().nullish(),
  annotation: z.string().nullish(),
  annotation_zh_Hant: z.string().nullish(),
  locale: z.string().nullish(),
  authorId: z.number().int(),
  classify: z.string().nullish(),
  genre: z.string().nullish(),
  views: z.number().int(),
  link: z.string().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePoem extends z.infer<typeof PoemModelSchema> {
  keywords: CompletePoemKeywords[]
  author: CompletePoemAuthor
  tags: CompletePoemTag[]
  cards: CompletePoemCard[]
}

/**
 * RelatedPoemModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPoemModelSchema: z.ZodSchema<CompletePoem> = z.lazy(() => PoemModelSchema.extend({
  keywords: RelatedPoemKeywordsModelSchema.array(),
  author: RelatedPoemAuthorModelSchema,
  tags: RelatedPoemTagModelSchema.array(),
  cards: RelatedPoemCardModelSchema.array(),
}))
