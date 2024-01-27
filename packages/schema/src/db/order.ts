import * as z from "zod"
import { CompleteUser, RelatedUserModelSchema, CompleteCustomer, RelatedCustomerModelSchema, CompleteOrderDetail, RelatedOrderDetailModelSchema } from "./index"

export const OrderModelSchema = z.object({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.string(),
  order_sn: z.string(),
  status: z.number().int(),
  aftersale_status: z.number().int(),
  consignee: z.string(),
  phone_id: z.string(),
  address_id: z.number().int(),
  message: z.string(),
  product_price: z.number(),
  freight_price: z.number(),
  coupon_price: z.number(),
  integral_price: z.number(),
  groupon_price: z.number(),
  order_price: z.number(),
  actual_price: z.number(),
  pay_id: z.string(),
  paymentMethod: z.string(),
  paymentAt: z.date(),
  sendAt: z.date(),
  ship_sn: z.string(),
  ship_channel: z.string(),
  shipAt: z.date(),
  refund_amount: z.number(),
  refund_type: z.string(),
  refund_content: z.string(),
  refund_at: z.date(),
  confirm_at: z.date(),
  comments: z.number().int(),
  endAt: z.date(),
  closedAt: z.date(),
  customerId: z.string().nullish(),
  discount: z.number().nullish(),
  annotation: z.string().nullish(),
  totalPrice: z.number().int().nullish(),
})

export interface CompleteOrder extends z.infer<typeof OrderModelSchema> {
  user: CompleteUser
  customer?: CompleteCustomer | null
  orderDetail: CompleteOrderDetail[]
}

/**
 * RelatedOrderModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModelSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModelSchema.extend({
  user: RelatedUserModelSchema,
  customer: RelatedCustomerModelSchema.nullish(),
  orderDetail: RelatedOrderDetailModelSchema.array(),
}))
