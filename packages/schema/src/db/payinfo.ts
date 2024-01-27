import * as z from "zod"

export const PayInfoModelSchema = z.object({
  id: z.string(),
  user_id: z.number().int(),
  pay_id: z.string(),
  pay_status: z.number().int(),
  pay_at: z.date(),
  pay_platform: z.number().int(),
  pay_type: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
