import * as z from "zod"
import { BoxType, PaperType, DetailType } from "@prisma/client"

export const BoxModelSchema = z.object({
  id: z.string(),
  isDeleted: z.boolean(),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  remark: z.string().nullish(),
  version: z.number().int(),
  boxType: z.nativeEnum(BoxType),
  paperType: z.nativeEnum(PaperType),
  lidType: z.number().int(),
  bottomType: z.number().int(),
  detailType: z.nativeEnum(DetailType),
  title: z.string(),
  imgList: z.string().array(),
  salesCount: z.number().int(),
})
