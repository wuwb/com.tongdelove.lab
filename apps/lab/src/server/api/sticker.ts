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
  userId,
  page,
  take = 10,
  live,
}: {
  userId?: string
  page: number
  take: number
  live?: boolean
}) {
  const where: any = {}
  if (userId) {
    where.userId = userId
  }
  if (live) {
    where.live = live
  }
  const result = await prisma.sticker.findMany({
    skip: (page - 1) * take,
    take: take,
    where: where,
    select: {
      id: true,
      url: true,
      createdAt: true,
      object: true,
      live: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })

  return result
}

export async function hideSticker({ id }: { id: string }) {
  const result = await prisma.sticker.update({
    where: {
      id,
    },
    select: {
      id: true,
    },
    data: {
      live: false,
    },
  })
  return result
}

export async function getById({
  id
}: {
  id: string
}) {
  const result = await prisma.sticker.findUnique({
    where: {
      id,
      live: true,
    },
  })
  return result
}
