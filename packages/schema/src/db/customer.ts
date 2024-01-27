import * as z from "zod"
import { CompleteOrder, RelatedOrderModelSchema, CompleteAddress, RelatedAddressModelSchema } from "./index"

export const CustomerModelSchema = z.object({
  id: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
  addressId: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
})

export interface CompleteCustomer extends z.infer<typeof CustomerModelSchema> {
  orders: CompleteOrder[]
  address: CompleteAddress[]
}

/**
 * RelatedCustomerModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCustomerModelSchema: z.ZodSchema<CompleteCustomer> = z.lazy(() => CustomerModelSchema.extend({
  orders: RelatedOrderModelSchema.array(),
  address: RelatedAddressModelSchema.array(),
}))
