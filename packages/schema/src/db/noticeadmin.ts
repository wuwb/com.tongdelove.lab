import * as z from "zod"

export const NoticeAdminModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  noticeId: z.string(),
  noticeTitle: z.string(),
  adminId: z.string(),
  readAt: z.date(),
})
