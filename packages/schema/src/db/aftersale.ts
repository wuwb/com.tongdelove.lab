import * as z from "zod"
import { Decimal } from "decimal.js"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

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
