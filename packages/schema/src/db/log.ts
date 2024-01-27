import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const LogModelSchema = z.object({
  id: z.string(),
  traceId: z.string(),
  userId: z.string(),
  userType: z.string(),
  ip: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  module: z.string(),
  type: z.number().int(),
  name: z.string(),
  content: z.string(),
  status: z.number().int(),
  result: z.string(),
  exts: jsonSchema,
  requestMethod: z.string(),
  requestUrl: z.string(),
  userAgent: z.string(),
  methodName: z.string(),
  methodArgs: z.string(),
  startAt: z.date(),
  duration: z.number().int(),
  resultCode: z.number().int(),
  resultMsg: z.string(),
  resultData: jsonSchema,
})
