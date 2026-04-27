import * as z from "zod"
import { CommoditiesCategoryEnum } from "@prisma/client"

export const CommoditiesModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  enName: z.string(),
  category: z.nativeEnum(CommoditiesCategoryEnum),
  createdAt: z.string(),
  updatedAt: z.string(),
})
