import { sql } from "drizzle-orm";
import { integer, text, real } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "./_sqlite_table";

export const products = sqliteTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title"),
  subTitle: text("sub_title").default(""),
  keywords: text("keywords").default(""),
  brief: text("brief").default(""),
  material: text("material").default(""),
  sustainability: text("sustainability").default(""),
  minimumOrderQuantity: integer("minimum_order_quantity").default(1),
  description: text("description"),
  code: text("code").default(""),
  goodsSn: text("goods_sn").default(""),
  sku: text("sku").default(""),
  image: text("image").default(""),
  picUrl: text("pic_url").default(""),
  shareUrl: text("share_url").default(""),
  unit: text("unit").default("件"),
  price: real("price").default(0),
  counterPrice: real("counter_price").default(0),
  retailPrice: real("retail_price").default(0),
  isOnSale: integer("is_on_sale", { mode: "boolean" }).default(true),
  isNew: integer("is_new", { mode: "boolean" }).default(false),
  isHot: integer("is_hot", { mode: "boolean" }).default(false),
  sort: integer("sort").default(100),
  flag: integer("flag").default(0),
  brandId: text("brand_id").default(""),
  categoryId: text("category_id").default(""),
  customId: text("custom_id").default(""),
  summary: text("summary").default(""),
  content: text("content").default(""),
  detail: text("content").default(""),
  bizType: integer("biz_type").default(0),
  published: integer("published", { mode: "boolean" }).default(false),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdBy: text("created_by").default(""),
  updatedBy: text("updated_by").default(""),
  remark: text("remark"),
  version: integer("version").default(1),
  isDeleted: integer("is_deleted", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdateFn(() => sql`(unixepoch())`),
});

export const productCategories = sqliteTable("product_category", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: integer("type").default(0),
  title: text("title").notNull(),
  keywords: text("keywords").default(""),
  description: text("description").default(""),
  pid: integer("pid").default(0),
  status: integer("status").default(1),
  icons: text("icons").default(""),
  picture: text("picture").default(""),
  level: text("level").default(""),
  sort: integer("sort").default(50),
  slug: text("slug"),
  label: text("label"),
  value: text("value"),
  order: integer("order"),
  onlyChild: integer("only_child", { mode: "boolean" }).default(false),
  parentId: text("parent_id"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdateFn(() => sql`(unixepoch())`),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductCategory = typeof productCategories.$inferSelect;
export type NewProductCategory = typeof productCategories.$inferInsert;
