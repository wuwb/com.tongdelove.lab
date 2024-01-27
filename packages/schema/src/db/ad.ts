import * as z from "zod"

export const AdModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  title: z.string(),
  link: z.string(),
  position: z.string(),
  content: z.string(),
  start_at: z.date(),
  end_at: z.date(),
  enabled: z.boolean(),
})
