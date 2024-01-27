import * as z from "zod"

export const HeatingBagModelSchema = z.object({
  id: z.string(),
  weight: z.number().int(),
  cost: z.number().int(),
  company: z.number().int(),
})
