import * as z from "zod"
import { CompleteOrder, RelatedOrderModelSchema, CompleteProductSku, RelatedProductSkuModelSchema } from "./index"

export const OrderDetailModelSchema = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  payId: z.string().nullish(),
  orderId: z.string(),
  productSkuId: z.string(),
  productName: z.string(),
  productPic: z.string(),
  unitPrice: z.number(),
  quantity: z.number().int().nullish(),
  totalPrice: z.number(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
})

export interface CompleteOrderDetail extends z.infer<typeof OrderDetailModelSchema> {
  order: CompleteOrder
  productSku: CompleteProductSku
}

/**
 * RelatedOrderDetailModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderDetailModelSchema: z.ZodSchema<CompleteOrderDetail> = z.lazy(() => OrderDetailModelSchema.extend({
  order: RelatedOrderModelSchema,
  productSku: RelatedProductSkuModelSchema,
}))
