import * as z from "zod"

export const OpensourceLicenseModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
})
