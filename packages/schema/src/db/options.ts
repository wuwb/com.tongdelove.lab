import * as z from "zod"

export const OptionsModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  autoload: z.string(),
})
