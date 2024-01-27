import * as z from "zod"

export const LoginLogModelSchema = z.object({
  id: z.string(),
  logType: z.number().int(),
  traceId: z.string(),
  userId: z.string(),
  userType: z.string(),
  username: z.string(),
  ip: z.string(),
  result: z.string(),
  userAgent: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
