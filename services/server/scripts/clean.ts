/**
 * Clean all the tables and types created by Prisma in the database
 */

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

if (require.main === module) {
  clean().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

async function clean() {
  console.info('Dropping all tables in the database...')
  const connectionString =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USERNAME || 'postgres'}:${process.env.DATABASE_PASSWORD || 'postgres'}@${process.env.DATABASE_HOST || 'localhost'}:${Number(process.env.DATABASE_PORT) || 54321}/${process.env.DATABASE_DATABASE || 'postgres'}`
  const prisma = new PrismaClient({ adapter: new PrismaPg(connectionString) })
  const tables = await getTables(prisma)
  const types = await getTypes(prisma)
  await dropTables(prisma, tables)
  await dropTypes(prisma, types)
  console.info('Cleaned database successfully')
  await prisma.$disconnect()
}

// TemplateStringsArray | Sql

async function dropTables(
  prisma: PrismaClient,
  tables: string[]
): Promise<void> {
  for (const table of tables) {
    await prisma.$executeRaw(`DROP TABLE public."${table}" CASCADE;` as any)
  }
}

async function dropTypes(prisma: PrismaClient, types: string[]) {
  for (const type of types) {
    await prisma.$executeRaw(`DROP TYPE IF EXISTS "${type}" CASCADE;` as any)
  }
}

async function getTables(prisma: PrismaClient): Promise<string[]> {
  const results: Array<{
    tablename: string
  }> =
    await prisma.$queryRaw`SELECT tablename from pg_tables where schemaname = 'public';`
  return results.map((result) => result.tablename)
}

async function getTypes(prisma: PrismaClient): Promise<string[]> {
  const results: Array<{
    typname: string
  }> = await prisma.$queryRaw`
 SELECT t.typname
 FROM pg_type t
 JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
 WHERE n.nspname = 'public';
 `
  return results.map((result) => result.typname)
}
