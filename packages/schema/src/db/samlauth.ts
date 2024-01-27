import * as z from "zod"

export const SAMLAuthModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  APIKey: z.string(),
  APISecret: z.string(),
})
