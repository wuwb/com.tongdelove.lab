import * as z from "zod"

export const VerificationTokenModelSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
})
