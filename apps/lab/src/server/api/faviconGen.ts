import { labFaviconGenApi } from '@/server/backend/lab-content.api'

export async function createFavicon(params: {
  text: string
  size: number
  radius?: number
  backgroundColor: string
  fontFamily: string
  fontWeight?: number
  fontSize: number
  fontRotate?: number
  textColor: string
  textOpacity?: number
  textStrokeColor: string
  textStrokeOpacity?: number
  textStrokeWidth?: number
  fineTuneVerticalPosition: number
  fineTuneHorizontalPosition: number
  deviceId?: string | null
  userId?: string
  live?: boolean
  fork?: boolean
}) {
  return labFaviconGenApi.create(params)
}

export async function listFavicons({
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
  return labFaviconGenApi.list({ userId, page, take, live })
}
