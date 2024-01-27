import * as z from "zod"

export const AnalyzeModelSchema = z.object({
  id: z.string(),
  ip: z.string(),
  ua: z.string(),
  path: z.string(),
  timestamp: z.date(),
})
