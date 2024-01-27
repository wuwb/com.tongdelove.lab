import * as z from "zod"

export const OpensourceProjectCategroyModelSchema = z.object({
  id: z.string(),
  name: z.string(),
})
