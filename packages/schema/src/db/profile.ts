import * as z from "zod"

export const ProfileModelSchema = z.object({
  id: z.string(),
  bio: z.string().nullish(),
})
