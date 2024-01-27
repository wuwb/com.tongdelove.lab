import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const NotificationModelSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  senderId: z.string(),
  deletedAt: z.date().nullish(),
  entityId: z.string().nullish(),
  entityType: z.string(),
  metaData: jsonSchema,
  readAt: z.date().nullish(),
  recipientId: z.string(),
})
