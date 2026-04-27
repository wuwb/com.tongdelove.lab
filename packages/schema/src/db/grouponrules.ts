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

export const GrouponRulesModelSchema = z.object({
  id: z.string(),
  goodsId: z.string(),
  goodsName: z.string(),
  picUrl: z.string(),
  discount: z.number(),
  discountMember: z.number().int(),
  expireAt: z.date(),
  status: z.number().int(),
})
