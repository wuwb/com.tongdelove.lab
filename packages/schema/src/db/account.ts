import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema } from "./index"

export const AccountModelSchema = z.object({
  id: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refreshToken: z.string().nullish(),
  accessToken: z.string().nullish(),
  expiresAt: z.number().int().nullish(),
  tokenType: z.string().nullish(),
  scope: z.string().nullish(),
  idToken: z.string().nullish(),
  sessionState: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  refresh_token_expires_in: z.number().int().nullish(),
})

export interface CompleteAccount extends z.infer<typeof AccountModelSchema> {
  user: CompleteUser
}

/**
 * RelatedAccountModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountModelSchema: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountModelSchema.extend({
  user: RelatedUserModelSchema,
}))
