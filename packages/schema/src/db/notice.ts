import * as z from "zod"

export const NoticeModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  title: z.string(),
  content: z.string(),
  adminId: z.string(),
})
