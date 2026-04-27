import * as z from "zod"

export const AvatarModelSchema = z.object({
  id: z.string(),
  filename: z.string(),
  mimetype: z.string(),
})
