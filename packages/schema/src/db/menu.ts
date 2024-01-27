import * as z from "zod"
import { CompleteRole, RelatedRoleModelSchema } from "./index"

export const MenuModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  order: z.number().int(),
  path: z.string().nullish(),
  component: z.string().nullish(),
  query: z.string().nullish(),
  isFrame: z.number().int(),
  isCache: z.number().int(),
  visible: z.number().int().nullish(),
  status: z.number().int().nullish(),
  perms: z.string().nullish(),
  icon: z.string().nullish(),
  parentId: z.string().nullish(),
})

export interface CompleteMenu extends z.infer<typeof MenuModelSchema> {
  children: CompleteMenu[]
  parent?: CompleteMenu | null
  roles: CompleteRole[]
}

/**
 * RelatedMenuModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMenuModelSchema: z.ZodSchema<CompleteMenu> = z.lazy(() => MenuModelSchema.extend({
  children: RelatedMenuModelSchema.array(),
  parent: RelatedMenuModelSchema.nullish(),
  roles: RelatedRoleModelSchema.array(),
}))
