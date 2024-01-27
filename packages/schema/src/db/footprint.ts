import * as z from "zod"

export const FootprintModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.string(),
  productId: z.string(),
})
