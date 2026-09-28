import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

export async function customSeed() {
  const connectionString =
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DATABASE_USERNAME || 'postgres'}:${process.env.DATABASE_PASSWORD || 'postgres'}@${process.env.DATABASE_HOST || 'localhost'}:${Number(process.env.DATABASE_PORT) || 54321}/${process.env.DATABASE_DATABASE || 'postgres'}`
  const client = new PrismaClient({ adapter: new PrismaPg(connectionString) })

  // use client to update database

  client.$disconnect()
}
