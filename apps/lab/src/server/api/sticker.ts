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
  console.log({
    object,
    color,
    accessory,
    doing,
    style,
    url,
    userId,
  })
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
    }
  })
  return result
}
