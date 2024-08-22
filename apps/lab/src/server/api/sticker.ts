import { prisma } from '@/server/db/prisma'

export async function createSticker() {
  const result = await prisma.sticker.create({
    data: {
      object: '',
      color: '',
      accessory: '',
      doing: '',
      style: '',
      url: '',
      userId: '',
    }
  })
  return result
}
