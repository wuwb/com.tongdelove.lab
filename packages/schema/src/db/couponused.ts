import * as z from "zod"

export const CouponUsedModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  couponId: z.string(),
  userId: z.string(),
  orderId: z.string(),
  usedAt: z.date(),
  status: z.number().int(),
  startAt: z.date(),
  endAt: z.date(),
})
