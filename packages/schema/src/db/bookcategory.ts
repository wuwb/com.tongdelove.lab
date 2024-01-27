import * as z from "zod"

export const BookCategoryModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  sequence: z.number().int(),
  parentId: z.string(),
  pathname: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
