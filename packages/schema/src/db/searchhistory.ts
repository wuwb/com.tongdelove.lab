import * as z from "zod"

export const SearchHistoryModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  keyword: z.string(),
  from: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
