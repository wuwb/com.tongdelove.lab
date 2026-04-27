import * as z from "zod"

export const AccountTokenModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  username: z.string(),
  mobile: z.string(),
  email: z.string(),
  platform: z.string(),
  isSuper: z.number().int(),
  expireTime: z.date(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  createdBy: z.string(),
  updatedBy: z.string(),
  remark: z.string().nullish(),
  version: z.number().int(),
})
