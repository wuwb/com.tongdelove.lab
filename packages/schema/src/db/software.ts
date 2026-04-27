import * as z from "zod"

export const SoftwareModelSchema = z.object({
  id: z.string(),
  avatar_url: z.string(),
  description: z.string(),
  name: z.string(),
  download_url: z.string(),
  source_url: z.string(),
  url: z.string(),
  category: z.string(),
  platform: z.string(),
  recommend: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
