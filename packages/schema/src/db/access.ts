import * as z from "zod"

export const AccessModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  moduleName: z.string().nullish(),
  type: z.number().int().nullish(),
  actionName: z.string().nullish(),
  apiName: z.string().nullish(),
  icon: z.string().nullish(),
  url: z.string().nullish(),
  method: z.string().nullish(),
  parentId: z.string(),
  sort: z.number().int(),
  status: z.number().int().nullish(),
  description: z.string().nullish(),
  createdBy: z.string(),
  updatedBy: z.string(),
  remark: z.string().nullish(),
  version: z.number().int(),
})
