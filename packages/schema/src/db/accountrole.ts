import * as z from "zod"

export const AccountRoleModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  accountId: z.string(),
  roleId: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  remark: z.string().nullish(),
  version: z.number().int(),
})
