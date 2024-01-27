import * as z from "zod"

export const FreeProjectModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  price: z.string(),
  duration: z.number().int(),
  time: z.date(),
  origin: z.string(),
  url: z.string(),
  originId: z.string().nullish(),
  status: z.string().nullish(),
  applyCount: z.number().int().nullish(),
  visitCount: z.number().int().nullish(),
  developerType: z.number().int().nullish(),
  specificRole: z.number().int().nullish(),
  type: z.string().nullish(),
  bargain: z.boolean().nullish(),
})
