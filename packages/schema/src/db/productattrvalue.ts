import * as z from "zod"

export const ProductAttrValueModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  attr_key_id: z.number().int(),
  product_id: z.number().int(),
  symbol: z.number().int(),
  value: z.string(),
})
