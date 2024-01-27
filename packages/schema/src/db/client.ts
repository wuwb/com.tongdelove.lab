import * as z from "zod"

export const ClientModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  taobao: z.string(),
  alipay: z.string(),
  contact: z.string(),
  phone: z.string(),
  lastOrder: z.date().nullish(),
})
