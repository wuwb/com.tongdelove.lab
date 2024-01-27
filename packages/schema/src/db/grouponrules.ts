import * as z from "zod"

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
