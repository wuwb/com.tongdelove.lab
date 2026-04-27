import * as z from "zod"

export const CommoditiesPriceModelSchema = z.object({
  id: z.string(),
  type: z.string(),
  time: z.date(),
  price: z.number(),
  change: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
