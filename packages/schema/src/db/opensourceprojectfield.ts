import * as z from "zod"

export const OpensourceProjectFieldModelSchema = z.object({
  id: z.string(),
  cid: z.string(),
  name: z.string(),
})
