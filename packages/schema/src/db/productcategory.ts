import * as z from "zod"

export const ProductCategoryModelSchema = z.object({
  id: z.string(),
  type: z.number().int(),
  title: z.string(),
  keywords: z.string(),
  description: z.string(),
  pid: z.number().int(),
  status: z.number().int(),
  icons: z.string(),
  picture: z.string(),
  level: z.string(),
  sort: z.number().int(),
})
