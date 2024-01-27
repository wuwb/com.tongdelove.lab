import * as z from "zod"

export const LocalAuthModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  password: z.string(),
})
