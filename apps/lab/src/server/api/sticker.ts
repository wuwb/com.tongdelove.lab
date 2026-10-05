import { labStickerApi } from '@/server/backend/lab-content.api'

export async function createSticker(input: {
  object: string
  color: string
  accessory: string
  doing: string
  style: string
  url: string
  deviceId?: string
  userId?: string
}) {
  return labStickerApi.create(input)
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
  return labStickerApi.list({ userId, page, take, live })
}

export async function hideSticker({ id }: { id: string }) {
  return labStickerApi.hide({ id })
}

export async function getById({ id }: { id: string }) {
  return labStickerApi.getById(id)
}
