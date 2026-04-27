import * as z from "zod"
import { CompleteDept, RelatedDeptModelSchema, CompleteMenu, RelatedMenuModelSchema, CompleteUser, RelatedUserModelSchema, CompletePermission, RelatedPermissionModelSchema } from "./index"

export const RoleModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  key: z.string(),
  value: z.string(),
  remark: z.string(),
  sort: z.number().int(),
  scope: z.number().int(),
  menuCheckStrictly: z.boolean(),
  deptCheckStrictly: z.boolean(),
  status: z.number().int().nullish(),
  delFlag: z.number().int(),
  isDefault: z.number().int().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  permissionId: z.string().nullish(),
  createdBy: z.string(),
  updatedBy: z.string(),
  version: z.number().int(),
})

export interface CompleteRole extends z.infer<typeof RoleModelSchema> {
  depts: CompleteDept[]
  menus: CompleteMenu[]
  users: CompleteUser[]
  Permission?: CompletePermission | null
}

/**
 * RelatedRoleModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoleModelSchema: z.ZodSchema<CompleteRole> = z.lazy(() => RoleModelSchema.extend({
  depts: RelatedDeptModelSchema.array(),
  menus: RelatedMenuModelSchema.array(),
  users: RelatedUserModelSchema.array(),
  Permission: RelatedPermissionModelSchema.nullish(),
}))
