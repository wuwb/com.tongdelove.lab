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

export const CouponModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  discount: z.number(),
  type: z.number().int(),
  limit: z.number().int(),
  min: z.number(),
  condition: z.number().int(),
  goodsType: z.number().int(),
  goodsValue: z.string(),
  total: z.number().int(),
  usedCount: z.number().int(),
  timeType: z.number().int(),
  status: z.number().int(),
  expiration: z.date(),
  days: z.number().int(),
  startAt: z.date(),
  endAt: z.date(),
  tag: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  remark: z.string().nullish(),
  version: z.number().int(),
  maxReceiveCount: z.number().int(),
  count: z.number().int(),
})
