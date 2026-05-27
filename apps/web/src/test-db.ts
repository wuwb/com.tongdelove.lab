import { db, products, eq, desc } from '@tongdelove/db/sqlite'

async function testDbConnection() {
  console.log('Testing database connection...')

  try {
    const allProducts = await db
      .select()
      .from(products)
      .where(eq(products.isDeleted, false))
      .orderBy(desc(products.sort))
      .limit(10)

    console.log(`\nFound ${allProducts.length} products:`)
    for (const p of allProducts) {
      console.log(`  - ${p.name} (${p.slug}): ¥${p.price}`)
    }

    console.log('\nDatabase connection working correctly!')
    process.exit(0)
  } catch (error) {
    console.error('Database error:', error)
    process.exit(1)
  }
}

testDbConnection()
