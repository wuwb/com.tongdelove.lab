import * as z from "zod"
import { CompleteProductSku, RelatedProductSkuModelSchema, CompletePost, RelatedPostModelSchema, CompleteBrand, RelatedBrandModelSchema } from "./index"

export const ProductModelSchema = z.object({
  id: z.string(),
  goods_sn: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  deleted: z.boolean(),
  slug: z.string(),
  title: z.string().nullish(),
  subTitle: z.string(),
  keywords: z.string(),
  brief: z.string(),
  description: z.string().nullish(),
  code: z.string(),
  flag: z.number().int(),
  brand_id: z.string(),
  category_id: z.string(),
  custom_id: z.string(),
  summary: z.string(),
  content: z.string(),
  is_on_sale: z.number().int(),
  sort: z.number().int(),
  image: z.string(),
  pic_url: z.string(),
  share_url: z.string(),
  is_new: z.number().int(),
  is_hot: z.number().int(),
  unit: z.string(),
  counter_price: z.number(),
  retail_price: z.number(),
  detail: z.string(),
  price: z.number(),
  sku: z.string(),
  published: z.boolean(),
  published_at: z.date(),
  biz_type: z.number().int(),
  postId: z.string().nullish(),
  brandId: z.string().nullish(),
})

export interface CompleteProduct extends z.infer<typeof ProductModelSchema> {
  productSku: CompleteProductSku[]
  Post?: CompletePost | null
  Brand?: CompleteBrand | null
}

/**
 * RelatedProductModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModelSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModelSchema.extend({
  productSku: RelatedProductSkuModelSchema.array(),
  Post: RelatedPostModelSchema.nullish(),
  Brand: RelatedBrandModelSchema.nullish(),
}))
