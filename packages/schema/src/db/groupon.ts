import * as z from "zod"

export const GrouponModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  orderId: z.string(),
  grouponId: z.string(),
  rulesId: z.string(),
  userId: z.string(),
  shareUrl: z.string(),
  creatorUserId: z.string(),
  creatorUserAt: z.date(),
  status: z.number().int(),
})
