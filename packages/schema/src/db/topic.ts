import * as z from "zod"

export const TopicModelSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  useCount: z.number().int(),
  userId: z.string(),
  isDeleted: z.boolean(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  description: z.string(),
  category: z.string(),
  relate_topics: z.string(),
  filename: z.string(),
  views: z.number().int(),
  isPublished: z.boolean(),
})
