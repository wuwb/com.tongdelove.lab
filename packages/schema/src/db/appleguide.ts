import * as z from "zod"

export const AppleGuideModelSchema = z.object({
  id: z.number().int(),
  data: z.string(),
  createdAt: z.date().nullish(),
})
