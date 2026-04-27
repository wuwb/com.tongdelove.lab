import * as z from "zod"

export const AutohotboxModelSchema = z.object({
  id: z.string(),
  code: z.string(),
  btcode: z.string(),
  name: z.string(),
  desc: z.string(),
  specification: z.string(),
  size: z.number().int(),
  volume: z.number(),
  weight: z.number(),
  boxWeight: z.number(),
})
