import * as z from "zod"

export const IndustrialClassificationModelSchema = z.object({
  id: z.string(),
  industryId: z.string(),
  name: z.string(),
  parentId: z.string().nullish(),
  level_type: z.number().int(),
  pinyin: z.string(),
  description: z.string(),
  sort_order: z.number().int(),
  status: z.number().int(),
})
