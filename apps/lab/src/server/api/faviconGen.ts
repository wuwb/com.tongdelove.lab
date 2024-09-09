import { prisma } from '@/server/db/prisma'

export async function createFavicon({
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
  textStrokeOpacity,
  textStrokeWidth,
  fineTuneVerticalPosition,
  fineTuneHorizontalPosition,
  deviceId,
  userId,
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
    },
  })
  return result
}
