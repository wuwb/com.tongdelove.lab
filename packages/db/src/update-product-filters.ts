import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sql } from "drizzle-orm";

const dbUrl = process.env.DATABASE_URL || "file:/Users/wuwenbin/Workspace/wu/com.tongdelove.lab/local.db";

console.log(`Using database: ${dbUrl}`);

const client = createClient({ url: dbUrl });
const db = drizzle(client);

interface ProductData {
  id: string;
  name: string;
  slug: string;
  material: string;
  sustainability: string;
  minimumOrderQuantity: number;
  categoryId: string;
}

async function updateDatabase() {
  console.log("Step 1: Checking and adding new columns...");
  
  try {
    await db.run(sql`ALTER TABLE t3turbo_product ADD COLUMN material TEXT DEFAULT ''`);
    console.log("  - Added 'material' column");
  } catch (e) {
    console.log("  - 'material' column already exists");
  }

  try {
    await db.run(sql`ALTER TABLE t3turbo_product ADD COLUMN sustainability TEXT DEFAULT ''`);
    console.log("  - Added 'sustainability' column");
  } catch (e) {
    console.log("  - 'sustainability' column already exists");
  }

  try {
    await db.run(sql`ALTER TABLE t3turbo_product ADD COLUMN minimum_order_quantity INTEGER DEFAULT 1`);
    console.log("  - Added 'minimum_order_quantity' column");
  } catch (e) {
    console.log("  - 'minimum_order_quantity' column already exists");
  }

  console.log("\nStep 2: Getting all products...");
  
  const products = await db.all(sql`
    SELECT id, name, slug, category_id FROM t3turbo_product
  `);
  
  console.log(`  - Found ${products.length} products`);

  console.log("\nStep 3: Updating product data with filter attributes...");

  const productUpdates: ProductData[] = [
    {
      id: "",
      name: "EPE珍珠棉卷",
      slug: "epe-pearl-cotton-roll",
      material: "corrugated-board,paperboard",
      sustainability: "recyclable,renewable-materials,plastic-free",
      minimumOrderQuantity: 100,
      categoryId: "accessories",
    },
    {
      id: "",
      name: "标准邮政纸箱",
      slug: "standard-postal-carton",
      material: "corrugated-board,natural-kraft-liner",
      sustainability: "recyclable,renewable-materials,curbside-recyclable",
      minimumOrderQuantity: 10,
      categoryId: "carton",
    },
    {
      id: "",
      name: "高档折叠彩盒",
      slug: "premium-folding-color-box",
      material: "paperboard,bleached-white-liner",
      sustainability: "recyclable,renewable-materials,sustainable-inks",
      minimumOrderQuantity: 500,
      categoryId: "folding-carton",
    },
    {
      id: "",
      name: "加强瓦楞纸箱",
      slug: "reinforced-corrugated-box",
      material: "corrugated-board,natural-kraft-liner,chipboard",
      sustainability: "recyclable,renewable-materials,curbside-recyclable",
      minimumOrderQuantity: 50,
      categoryId: "corrugatedbox",
    },
    {
      id: "",
      name: "高档牛皮纸手提袋",
      slug: "premium-kraft-paper-bag",
      material: "paperboard,natural-kraft-liner",
      sustainability: "recyclable,renewable-materials,biodegradable,plastic-free",
      minimumOrderQuantity: 100,
      categoryId: "bags",
    },
    {
      id: "",
      name: "精美礼品盒",
      slug: "exquisite-gift-box",
      material: "paperboard,bleached-white-liner",
      sustainability: "recyclable,renewable-materials,sustainable-inks",
      minimumOrderQuantity: 50,
      categoryId: "standard",
    },
    {
      id: "",
      name: "PVC吸塑卡",
      slug: "pvc-blister-card",
      material: "pvc-film,films,paperboard",
      sustainability: "drop-off-recyclable",
      minimumOrderQuantity: 1000,
      categoryId: "blister-cards",
    },
    {
      id: "",
      name: "彩色印刷纸盒",
      slug: "color-printing-box",
      material: "paperboard,bleached-white-liner,kemi-white-liner",
      sustainability: "recyclable,renewable-materials,sustainable-inks",
      minimumOrderQuantity: 500,
      categoryId: "folding-carton",
    },
    {
      id: "",
      name: "环保快递袋",
      slug: "eco-courier-bag",
      material: "paperboard,natural-kraft-liner",
      sustainability: "recyclable,renewable-materials,biodegradable,plastic-free",
      minimumOrderQuantity: 1000,
      categoryId: "bags",
    },
    {
      id: "",
      name: "精品礼盒套装",
      slug: "luxury-gift-box-set",
      material: "paperboard,bleached-white-liner,chipboard",
      sustainability: "recyclable,renewable-materials,sustainable-inks",
      minimumOrderQuantity: 100,
      categoryId: "standard",
    },
    {
      id: "",
      name: "食品级白卡纸盒",
      slug: "food-grade-white-cardboard-box",
      material: "paperboard,bleached-white-liner,solid-bleachied-sulphate",
      sustainability: "recyclable,renewable-materials,food-safe",
      minimumOrderQuantity: 1000,
      categoryId: "folding-carton",
    },
    {
      id: "",
      name: "气泡膜缓冲垫",
      slug: "bubble-wrap-cushion",
      material: "films,pe-film",
      sustainability: "reusable,drop-off-recyclable",
      minimumOrderQuantity: 50,
      categoryId: "accessories",
    },
    {
      id: "",
      name: "瓦楞纸展示盒",
      slug: "corrugated-display-box",
      material: "corrugated-board,paperboard",
      sustainability: "recyclable,renewable-materials,curbside-recyclable",
      minimumOrderQuantity: 100,
      categoryId: "corrugatedbox",
    },
    {
      id: "",
      name: "天地盖礼盒",
      slug: "top-bottom-gift-box",
      material: "paperboard,chipboard,bleached-white-liner",
      sustainability: "recyclable,renewable-materials,sustainable-inks",
      minimumOrderQuantity: 50,
      categoryId: "standard",
    },
    {
      id: "",
      name: "牛皮纸信封",
      slug: "kraft-paper-envelope",
      material: "paperboard,natural-kraft-liner",
      sustainability: "recyclable,renewable-materials,biodegradable",
      minimumOrderQuantity: 500,
      categoryId: "bags",
    },
  ];

  let updatedCount = 0;
  
  for (const productData of productUpdates) {
    const result = await db.run(sql`
      UPDATE t3turbo_product 
      SET 
        material = ${productData.material},
        sustainability = ${productData.sustainability},
        minimum_order_quantity = ${productData.minimumOrderQuantity},
        category_id = ${productData.categoryId}
      WHERE slug = ${productData.slug}
    `);
    
    if (result.rowsAffected > 0) {
      console.log(`  - Updated: ${productData.name}`);
      updatedCount++;
    }
  }

  console.log(`\nStep 4: Updating remaining products...`);
  
  const remainingProducts = await db.all(sql`
    SELECT id, name, slug FROM t3turbo_product 
    WHERE material IS NULL OR material = ''
  `);

  for (const product of remainingProducts as any) {
    const defaultMaterial = "paperboard,corrugated-board";
    const defaultSustainability = "recyclable,renewable-materials";
    const defaultMOQ = 100;
    
    await db.run(sql`
      UPDATE t3turbo_product 
      SET 
        material = ${defaultMaterial},
        sustainability = ${defaultSustainability},
        minimum_order_quantity = ${defaultMOQ}
      WHERE id = ${product.id}
    `);
    console.log(`  - Updated default: ${product.name}`);
    updatedCount++;
  }

  console.log(`\nStep 5: Verifying updates...`);
  
  const updatedProducts = await db.all(sql`
    SELECT 
      id, 
      name, 
      slug, 
      material, 
      sustainability, 
      minimum_order_quantity as minimumOrderQuantity,
      category_id as categoryId
    FROM t3turbo_product
    ORDER BY sort
  `);

  console.log("\n=== Product Filter Attributes ===");
  for (const p of updatedProducts as any) {
    console.log(`\n[${p.name}]`);
    console.log(`  Slug: ${p.slug}`);
    console.log(`  Category: ${p.categoryId}`);
    console.log(`  Material: ${p.material}`);
    console.log(`  Sustainability: ${p.sustainability}`);
    console.log(`  MOQ: ${p.minimumOrderQuantity}`);
  }

  console.log(`\nTotal updated: ${updatedCount} products`);
  console.log("Database update completed!");
}

updateDatabase()
  .then(() => {
    client.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    client.close();
    process.exit(1);
  });
