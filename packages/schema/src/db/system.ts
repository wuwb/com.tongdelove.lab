import * as z from "zod"

export const SystemModelSchema = z.object({
  id: z.string(),
  key_name: z.string(),
  key_value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDelete: z.boolean(),
})
