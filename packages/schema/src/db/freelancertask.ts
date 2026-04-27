import * as z from "zod"
import { Decimal } from "decimal.js"
import { SourceEnum } from "@prisma/client"

// Helper schema for Decimal fields
z
  .instanceof(Decimal)
  .or(z.string())
  .or(z.number())
  .refine((value) => {
    try {
      return new Decimal(value)
    } catch (error) {
      return false
    }
  })
  .transform((value) => new Decimal(value))

export const FreelancerTaskModelSchema = z.object({
  id: z.string(),
  source: z.nativeEnum(SourceEnum),
  sourceId: z.string(),
  title: z.string(),
  desc: z.string(),
  minPrice: z.number(),
  maxPrice: z.number(),
  fixedPrice: z.string(),
  bargain: z.boolean(),
  cycle: z.number().int(),
  cycleName: z.string(),
  date: z.date(),
  url: z.string(),
  applyCount: z.number().int(),
  visitCount: z.number().int(),
  status: z.string(),
  auditStatus: z.number().int(),
  auditReason: z.string(),
  auditAt: z.date(),
  handleStatus: z.number().int(),
  handleAt: z.date(),
  userId: z.string(),
  userName: z.string(),
  userUrl: z.string(),
  type: z.number().int(),
  application: z.number().int(),
  tags: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
