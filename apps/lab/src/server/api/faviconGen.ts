import { prisma } from '@/server/db/prisma'

export async function createFavicon({
  text,
  size,
  radius = 0,
  backgroundColor,
  fontFamily,
  fontWeight = 400,
  fontSize,
  fontRotate = 0,
  textColor,
  textOpacity = 1,
  textStrokeColor,
  textStrokeOpacity = 1,
  textStrokeWidth = 0,
  fineTuneVerticalPosition = 0,
  fineTuneHorizontalPosition = 0,
  deviceId,
  userId,
  live = true,
  fork = true,
}: {
  text: string
  size: number
  radius: number
  backgroundColor: string
  fontFamily: string
  fontWeight: number
  fontSize: number
  fontRotate: number
  textColor: string
  textOpacity: number
  textStrokeColor: string
  textStrokeOpacity: number
  textStrokeWidth: number
  fineTuneVerticalPosition: number
  fineTuneHorizontalPosition: number
  deviceId?: string | null
  userId?: string
  live?: boolean
  fork?: boolean
}) {
  if (size < 16 || size > 2048) {
    throw new Error('size error.')
  }
  const result = await prisma.faviconGen.create({
    data: {
      text,
      size,
      radius,
      backgroundColor,
      fontFamily,
      fontWeight,
      fontSize,
      fontRotate,
      textColor,
      textOpacity,
      textStrokeColor,
      textStrokeWidth,
      textStrokeOpacity,
      fineTuneVerticalPosition,
      fineTuneHorizontalPosition,
      deviceId,
      userId,
      live,
      fork,
    },
  })
  return result
}
