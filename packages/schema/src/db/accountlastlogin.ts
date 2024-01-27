import * as z from "zod"

export const AccountLastLoginModelSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  lastLoginIp: z.string().nullish(),
  lastLoginAddress: z.string().nullish(),
  lastLoginTime: z.date(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
