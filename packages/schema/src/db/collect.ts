import * as z from "zod"

export const CollectModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  user_id: z.number().int(),
  value_id: z.number().int(),
  type: z.number().int(),
})
