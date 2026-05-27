import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";

const dbUrl = process.env.TURSO_DATABASE_URL || "file:local.db";

console.log(`Using database: ${dbUrl}`);

const client = createClient({
  url: dbUrl,
  authToken: process.env.TURSO_AUTH_TOKEN
});
const db = drizzle(client);

async function initDatabase() {
  console.log("Initializing database...");

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS t3turbo_product (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      title TEXT,
      sub_title TEXT DEFAULT '',
      keywords TEXT DEFAULT '',
      brief TEXT DEFAULT '',
      description TEXT,
      code TEXT DEFAULT '',
      goods_sn TEXT DEFAULT '',
      sku TEXT DEFAULT '',
      image TEXT DEFAULT '',
      pic_url TEXT DEFAULT '',
      share_url TEXT DEFAULT '',
      unit TEXT DEFAULT '件',
      price REAL DEFAULT 0,
      counter_price REAL DEFAULT 0,
      retail_price REAL DEFAULT 0,
      is_on_sale INTEGER DEFAULT 1,
      is_new INTEGER DEFAULT 0,
      is_hot INTEGER DEFAULT 0,
      sort INTEGER DEFAULT 100,
      flag INTEGER DEFAULT 0,
      brand_id TEXT DEFAULT '',
      category_id TEXT DEFAULT '',
      custom_id TEXT DEFAULT '',
      summary TEXT DEFAULT '',
      content TEXT DEFAULT '',
      biz_type INTEGER DEFAULT 0,
      published INTEGER DEFAULT 0,
      published_at INTEGER,
      created_by TEXT DEFAULT '',
      updated_by TEXT DEFAULT '',
      remark TEXT,
      version INTEGER DEFAULT 1,
      is_deleted INTEGER DEFAULT 0,
      created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
      updated_at INTEGER DEFAULT (unixepoch()) NOT NULL
    )
  `);

  console.log("Created t3turbo_product table");

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS t3turbo_product_category (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      type INTEGER DEFAULT 0,
      title TEXT NOT NULL,
      keywords TEXT DEFAULT '',
      description TEXT DEFAULT '',
      pid INTEGER DEFAULT 0,
      status INTEGER DEFAULT 1,
      icons TEXT DEFAULT '',
      picture TEXT DEFAULT '',
      level TEXT DEFAULT '',
      sort INTEGER DEFAULT 50,
      slug TEXT,
      label TEXT,
      value TEXT,
      "order" INTEGER,
      only_child INTEGER DEFAULT 0,
      parent_id TEXT,
      created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
      updated_at INTEGER DEFAULT (unixepoch()) NOT NULL
    )
  `);

  console.log("Created t3turbo_product_category table");

  const categories = [
    { slug: "carton", title: "纸箱", sort: 1 },
    { slug: "folding-carton", title: "折叠纸盒", sort: 2 },
    { slug: "corrugatedbox", title: "瓦楞纸箱", sort: 3 },
    { slug: "bags", title: "手提袋", sort: 4 },
    { slug: "accessories", title: "配件", sort: 5 },
    { slug: "standard", title: "标准产品", sort: 6 },
    { slug: "blister-cards", title: "吸塑卡", sort: 7 },
    { slug: "clamshell-inserts", title: "吸塑内托", sort: 8 },
  ];

  for (const cat of categories) {
    await db.run(sql`
      INSERT OR IGNORE INTO t3turbo_product_category (slug, title, sort)
      VALUES (${cat.slug}, ${cat.title}, ${cat.sort})
    `);
  }

  console.log("Inserted product categories");

  const products = [
    {
      name: "珍珠棉卷",
      slug: "zhen-zhu-mian-juan",
      title: "EPE珍珠棉卷",
      subTitle: "环保缓冲包装材料",
      price: 25.00,
      image: "/assets/products/accessories/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 1,
    },
    {
      name: "标准纸箱",
      slug: "standard-carton",
      title: "标准邮政纸箱",
      subTitle: "多种规格可选",
      price: 3.50,
      image: "/assets/products/carton/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 2,
    },
    {
      name: "折叠彩盒",
      slug: "folding-color-box",
      title: "高档折叠彩盒",
      subTitle: "支持定制印刷",
      price: 5.80,
      image: "/assets/products/folding-carton/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 3,
    },
    {
      name: "瓦楞纸箱",
      slug: "corrugated-box",
      title: "加强瓦楞纸箱",
      subTitle: "抗压耐摔",
      price: 8.50,
      image: "/assets/products/corrugatedbox/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 4,
    },
    {
      name: "牛皮纸手提袋",
      slug: "kraft-paper-bag",
      title: "高档牛皮纸手提袋",
      subTitle: "环保可降解",
      price: 2.20,
      image: "/assets/products/bags/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 5,
    },
    {
      name: "礼品盒",
      slug: "gift-box",
      title: "精美礼品盒",
      subTitle: "高端定制",
      price: 15.00,
      image: "/assets/products/standard/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 6,
    },
    {
      name: "吸塑卡",
      slug: "blister-card",
      title: "PVC吸塑卡",
      subTitle: "透明展示",
      price: 1.50,
      image: "/assets/products/blister-cards/1.jpg",
      categoryId: "",
      isOnSale: 1,
      sort: 7,
    },
  ];

  for (const product of products) {
    await db.run(sql`
      INSERT OR IGNORE INTO t3turbo_product (name, slug, title, sub_title, price, image, category_id, is_on_sale, sort)
      VALUES (${product.name}, ${product.slug}, ${product.title}, ${product.subTitle}, ${product.price}, ${product.image}, ${product.categoryId}, ${product.isOnSale}, ${product.sort})
    `);
  }

  console.log("Inserted sample products");
  console.log("Database initialization completed!");

  const result = await db.all(sql`SELECT * FROM t3turbo_product`);
  console.log(`Total products: ${result.length}`);
}

initDatabase()
  .then(() => {
    client.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error initializing database:", err);
    client.close();
    process.exit(1);
  });
