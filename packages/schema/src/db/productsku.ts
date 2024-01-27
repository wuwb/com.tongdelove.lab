import * as z from "zod"
import { CompleteProduct, RelatedProductModelSchema, CompleteOrderDetail, RelatedOrderDetailModelSchema } from "./index"

export const ProductSkuModelSchema = z.object({
  id: z.string(),
  productId: z.string(),
  attr_symbol_path: z.string(),
  price: z.number(),
  stock: z.number().int(),
})

export interface CompleteProductSku extends z.infer<typeof ProductSkuModelSchema> {
  product: CompleteProduct
  orderDetail: CompleteOrderDetail[]
}

/**
 * RelatedProductSkuModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductSkuModelSchema: z.ZodSchema<CompleteProductSku> = z.lazy(() => ProductSkuModelSchema.extend({
  product: RelatedProductModelSchema,
  orderDetail: RelatedOrderDetailModelSchema.array(),
}))
