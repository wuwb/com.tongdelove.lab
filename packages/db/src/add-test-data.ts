import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";

const dbUrl = process.env.DATABASE_URL || "file:/Users/wuwenbin/Workspace/wu/com.tongdelove.lab/local.db";

console.log(`Using database: ${dbUrl}`);

const client = createClient({ url: dbUrl });
const db = drizzle(client);

async function addTestData() {
  console.log("Checking existing products...");
  
  const existingProducts = await db.all(sql`SELECT * FROM t3turbo_product`);
  console.log(`Existing products: ${existingProducts.length}`);
  
  const existingCategories = await db.all(sql`SELECT * FROM t3turbo_product_category`);
  console.log(`Existing categories: ${existingCategories.length}`);

  if (existingCategories.length === 0) {
    console.log("Inserting categories...");
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
        INSERT INTO t3turbo_product_category (slug, title, sort)
        VALUES (${cat.slug}, ${cat.title}, ${cat.sort})
      `);
    }
    console.log("Inserted 8 categories");
  }

  if (existingProducts.length === 0) {
    console.log("Inserting sample products...");
    
    const products = [
      {
        name: "EPE珍珠棉卷",
        slug: "epe-pearl-cotton-roll",
        title: "EPE珍珠棉卷",
        subTitle: "环保缓冲包装材料，防震抗摔",
        price: 25.00,
        image: "https://picsum.photos/seed/product1/480/480",
        categoryId: "accessories",
        isOnSale: 1,
        sort: 1,
        unit: "卷",
      },
      {
        name: "标准邮政纸箱",
        slug: "standard-postal-carton",
        title: "标准邮政纸箱",
        subTitle: "多种规格可选，优质瓦楞纸",
        price: 3.50,
        image: "https://picsum.photos/seed/product2/480/480",
        categoryId: "carton",
        isOnSale: 1,
        sort: 2,
        unit: "个",
      },
      {
        name: "高档折叠彩盒",
        slug: "premium-folding-color-box",
        title: "高档折叠彩盒",
        subTitle: "支持定制印刷，精美包装",
        price: 5.80,
        image: "https://picsum.photos/seed/product3/480/480",
        categoryId: "folding-carton",
        isOnSale: 1,
        sort: 3,
        unit: "个",
      },
      {
        name: "加强瓦楞纸箱",
        slug: "reinforced-corrugated-box",
        title: "加强瓦楞纸箱",
        subTitle: "抗压耐摔，物流首选",
        price: 8.50,
        image: "https://picsum.photos/seed/product4/480/480",
        categoryId: "corrugatedbox",
        isOnSale: 1,
        sort: 4,
        unit: "个",
      },
      {
        name: "高档牛皮纸手提袋",
        slug: "premium-kraft-paper-bag",
        title: "高档牛皮纸手提袋",
        subTitle: "环保可降解，支持定制",
        price: 2.20,
        image: "https://picsum.photos/seed/product5/480/480",
        categoryId: "bags",
        isOnSale: 1,
        sort: 5,
        unit: "个",
      },
      {
        name: "精美礼品盒",
        slug: "exquisite-gift-box",
        title: "精美礼品盒",
        subTitle: "高端定制，节日首选",
        price: 15.00,
        image: "https://picsum.photos/seed/product6/480/480",
        categoryId: "standard",
        isOnSale: 1,
        sort: 6,
        unit: "个",
      },
      {
        name: "PVC吸塑卡",
        slug: "pvc-blister-card",
        title: "PVC吸塑卡",
        subTitle: "透明展示，保护产品",
        price: 1.50,
        image: "https://picsum.photos/seed/product7/480/480",
        categoryId: "blister-cards",
        isOnSale: 1,
        sort: 7,
        unit: "张",
      },
      {
        name: "彩色印刷纸盒",
        slug: "color-printing-box",
        title: "彩色印刷纸盒",
        subTitle: "专业设计，高端印刷",
        price: 6.80,
        image: "https://picsum.photos/seed/product8/480/480",
        categoryId: "folding-carton",
        isOnSale: 1,
        sort: 8,
        unit: "个",
      },
      {
        name: "环保快递袋",
        slug: "eco-courier-bag",
        title: "环保快递袋",
        subTitle: "加厚防水，可降解材质",
        price: 0.85,
        image: "https://picsum.photos/seed/product9/480/480",
        categoryId: "bags",
        isOnSale: 1,
        sort: 9,
        unit: "个",
      },
      {
        name: "精品礼盒套装",
        slug: "luxury-gift-box-set",
        title: "精品礼盒套装",
        subTitle: "高端商务礼品首选",
        price: 38.00,
        image: "https://picsum.photos/seed/product10/480/480",
        categoryId: "standard",
        isOnSale: 1,
        sort: 10,
        unit: "套",
      },
      {
        name: "食品级白卡纸盒",
        slug: "food-grade-white-cardboard-box",
        title: "食品级白卡纸盒",
        subTitle: "安全卫生，食品包装专用",
        price: 4.20,
        image: "https://picsum.photos/seed/product11/480/480",
        categoryId: "folding-carton",
        isOnSale: 1,
        sort: 11,
        unit: "个",
      },
      {
        name: "气泡膜缓冲垫",
        slug: "bubble-wrap-cushion",
        title: "气泡膜缓冲垫",
        subTitle: "防震缓冲，保护产品",
        price: 12.50,
        image: "https://picsum.photos/seed/product12/480/480",
        categoryId: "accessories",
        isOnSale: 1,
        sort: 12,
        unit: "卷",
      },
    ];

    for (const product of products) {
      await db.run(sql`
        INSERT INTO t3turbo_product (name, slug, title, sub_title, price, image, category_id, is_on_sale, sort, unit)
        VALUES (${product.name}, ${product.slug}, ${product.title}, ${product.subTitle}, ${product.price}, ${product.image}, ${product.categoryId}, ${product.isOnSale}, ${product.sort}, ${product.unit})
      `);
    }
    console.log("Inserted 12 sample products");
  }

  const allProducts = await db.all(sql`SELECT id, name, slug, title, price, image FROM t3turbo_product ORDER BY sort`);
  console.log("\nAll products in database:");
  console.log("========================================");
  for (const p of allProducts) {
    console.log(`[${p.id}] ${p.name} - ¥${p.price}`);
    console.log(`    Slug: ${p.slug}`);
    console.log(`    Image: ${p.image}`);
    console.log();
  }

  console.log(`\nTotal: ${allProducts.length} products`);
}

addTestData()
  .then(() => {
    client.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    client.close();
    process.exit(1);
  });
