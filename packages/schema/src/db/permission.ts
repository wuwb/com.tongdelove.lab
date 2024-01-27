import * as z from "zod"
import { CompleteRole, RelatedRoleModelSchema } from "./index"

export const PermissionModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompletePermission extends z.infer<typeof PermissionModelSchema> {
  roles: CompleteRole[]
}

/**
 * RelatedPermissionModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPermissionModelSchema: z.ZodSchema<CompletePermission> = z.lazy(() => PermissionModelSchema.extend({
  roles: RelatedRoleModelSchema.array(),
}))
