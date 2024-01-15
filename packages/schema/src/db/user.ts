import * as z from "zod"
import { UserPermissionRole } from "@prisma/client"
import { CompleteAccount, RelatedAccountModelSchema, CompleteSession, RelatedSessionModelSchema, CompletePost, RelatedPostModelSchema } from "./index"

export const UserModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  avatar: z.string().nullish(),
  username: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  role: z.nativeEnum(UserPermissionRole),
  password: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModelSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  Post: CompletePost[]
}

/**
 * RelatedUserModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModelSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserModelSchema.extend({
  accounts: RelatedAccountModelSchema.array(),
  sessions: RelatedSessionModelSchema.array(),
  Post: RelatedPostModelSchema.array(),
}))
