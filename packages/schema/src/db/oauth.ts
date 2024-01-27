import * as z from "zod"

export const OAuthModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  oauthName: z.string(),
  oauthId: z.string(),
  oauthAccessToken: z.string(),
  oauthExpires: z.number().int(),
})
