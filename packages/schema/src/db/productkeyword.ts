import * as z from "zod"

export const ProductKeywordModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  keyword: z.string(),
  url: z.string(),
  isHot: z.number().int(),
  isDefault: z.number().int(),
  sort: z.number().int(),
})
