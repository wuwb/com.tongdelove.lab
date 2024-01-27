import * as z from "zod"

export const SubscribesWebhook2userModelSchema = z.object({
  id: z.string(),
  webhookId: z.string(),
  userId: z.string(),
})
