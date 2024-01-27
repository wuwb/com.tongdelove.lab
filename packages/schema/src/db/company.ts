import * as z from "zod"

export const CompanyModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  enName: z.string(),
  formerName: z.string(),
  type: z.number().int(),
  registryAt: z.date(),
  registryAddress: z.string(),
  identifier: z.string(),
  legalEntity: z.string(),
  property: z.number().int(),
  chairman: z.number().int(),
  location: z.string(),
  address: z.string(),
  hasBranch: z.number().int(),
  staffSize: z.number().int(),
  registeredCapital: z.number().int(),
  website: z.string(),
  email: z.string(),
  classificationId: z.string(),
})
