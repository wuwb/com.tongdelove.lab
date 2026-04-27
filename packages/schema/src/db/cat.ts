import * as z from "zod"

export const CatModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  filename: z.string(),
  views: z.number().int(),
  isPublished: z.boolean(),
})
