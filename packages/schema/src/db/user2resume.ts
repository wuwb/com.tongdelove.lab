import * as z from "zod"

export const User2ResumeModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  resumeId: z.string(),
})
