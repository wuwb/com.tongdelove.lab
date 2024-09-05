import { PrismaClient } from '@prisma/client'

export async function customSeed() {
  const client = new PrismaClient()

  // use client to update database

  client.$disconnect()
}
