import { prisma } from '@/server/db/prisma'

export async function getLinks() {
  const result = await prisma.link.findMany({
    take: 10,
    skip: 0,
  })
  return result
}
