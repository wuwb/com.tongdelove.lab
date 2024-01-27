import * as z from "zod"

export const SysConfigModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  value: z.string(),
  type: z.number().int(),
})
