import * as z from "zod"
import { CompleteRole, RelatedRoleModelSchema, CompleteUser, RelatedUserModelSchema } from "./index"

export const DeptModelSchema = z.object({
  id: z.string(),
  parentId: z.string(),
  name: z.string(),
  sort: z.number().int(),
  leader: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
  status: z.number().int(),
  delFlag: z.number().int(),
  deptId: z.string(),
})

export interface CompleteDept extends z.infer<typeof DeptModelSchema> {
  children: CompleteDept[]
  parent: CompleteDept
  roles: CompleteRole[]
  users: CompleteUser[]
}

/**
 * RelatedDeptModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeptModelSchema: z.ZodSchema<CompleteDept> = z.lazy(() => DeptModelSchema.extend({
  children: RelatedDeptModelSchema.array(),
  parent: RelatedDeptModelSchema,
  roles: RelatedRoleModelSchema.array(),
  users: RelatedUserModelSchema.array(),
}))
