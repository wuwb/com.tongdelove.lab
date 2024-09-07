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
  fineTuneVerticalPosition: number
  fineTuneHorizontalPosition: number
  deviceId?: string
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
      fineTuneVerticalPosition,
      fineTuneHorizontalPosition,

      deviceId,
      userId,
    },
  })
  return result
}
