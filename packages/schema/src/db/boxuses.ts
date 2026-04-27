import * as z from "zod"

export const BoxUsesModelSchema = z.object({
  id: z.string(),
  isDeleted: z.boolean(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  remark: z.string().nullish(),
  version: z.number().int(),
})
