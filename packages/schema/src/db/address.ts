import * as z from "zod"
import { CompleteCustomer, RelatedCustomerModelSchema, CompleteTelephone, RelatedTelephoneModelSchema } from "./index"

export const AddressModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  name: z.string(),
  userId: z.string(),
  conuntry: z.string(),
  province: z.string(),
  city: z.string(),
  county: z.string(),
  street: z.string(),
  detail: z.string(),
  address_1: z.string().nullish(),
  address_2: z.string().nullish(),
  areaCode: z.string(),
  postcode: z.string(),
  zip: z.number().int().nullish(),
  mobile: z.string(),
  isDefault: z.boolean(),
  customerId: z.string(),
  telephoneId: z.string(),
  phoneId: z.string(),
})

export interface CompleteAddress extends z.infer<typeof AddressModelSchema> {
  customer: CompleteCustomer
  phone: CompleteTelephone
}

/**
 * RelatedAddressModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressModelSchema: z.ZodSchema<CompleteAddress> = z.lazy(() => AddressModelSchema.extend({
  customer: RelatedCustomerModelSchema,
  phone: RelatedTelephoneModelSchema,
}))
