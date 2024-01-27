import * as z from "zod"

export const CarouselModelSchema = z.object({
  id: z.string(),
  imgurl: z.string(),
  title: z.string(),
  url: z.string(),
  description: z.string(),
  status: z.string(),
  remark: z.string(),
  type: z.number().int(),
  country: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  isAudit: z.number().int(),
  sort: z.number().int(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})
