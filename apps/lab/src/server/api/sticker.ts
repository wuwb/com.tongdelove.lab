import { prisma } from '@/server/db/prisma'

export async function createSticker({
  object,
  color,
  accessory,
  doing,
  style,
  url,
  deviceId,
  userId,
}: {
  object: string
  color: string
  accessory: string
  doing: string
  style: string
  url: string
  deviceId?: string
  userId?: string
}) {
  const result = await prisma.sticker.create({
    data: {
      object,
      color,
      accessory,
      doing,
      style,
      url,
      deviceId,
      userId,
    },
  })
  return result
}

export async function listStickers({
  page,
  take = 10,
}: {
  page: number
  take: number
}) {
  const result = await prisma.sticker.findMany({
    skip: (page - 1) * take,
    take: take,
    where: {
      live: true,
    },
    select: {
      id: true,
      url: true,
      createdAt: true,
      object: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })

  return result
}
