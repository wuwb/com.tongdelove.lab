import * as z from "zod"
import { SourceEnum } from "@prisma/client"

export const SubscribesWebhookModelSchema = z.object({
  id: z.string(),
  webhook: z.string(),
  secret: z.string(),
  webhookType: z.string(),
  remindSource: z.nativeEnum(SourceEnum),
  remindType: z.string(),
})
