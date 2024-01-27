import * as z from "zod"

export const AftersaleModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  aftersal_sn: z.string(),
  orderId: z.string(),
  userId: z.string(),
  type: z.number().int(),
  reason: z.string(),
  amount: z.number(),
  pictures: z.string(),
  comment: z.string(),
  status: z.number().int(),
  handle_at: z.date(),
})
