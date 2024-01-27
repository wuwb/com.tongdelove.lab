import * as z from "zod"

export const PageModelSchema = z.object({
  id: z.string(),
  slug: z.string(),
})
