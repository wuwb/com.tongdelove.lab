import * as z from "zod"

export const StorageModelSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number().int(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDelete: z.boolean(),
})
