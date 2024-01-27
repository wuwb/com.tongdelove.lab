import * as z from "zod"

export const RegionModelSchema = z.object({
  id: z.string(),
  pid: z.string(),
  name: z.string(),
  type: z.number().int(),
  code: z.number().int(),
})
