import * as z from "zod"

export const ProductAttrKeyModelSchema = z.object({
  id: z.string(),
  product_id: z.number().int(),
  title: z.string(),
})
