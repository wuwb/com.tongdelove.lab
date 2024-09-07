import * as z from "zod"

export const FaviconGenModelSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  text: z.string(),
  size: z.number().int(),
  radius: z.number().int(),
  backgroundColor: z.string(),
  fontFamily: z.string(),
  fontWeight: z.number().int(),
  fontSize: z.number().int(),
  fontRotate: z.number().int(),
  textColor: z.string(),
  fineTuneVerticalPosition: z.number().int(),
  fineTuneHorizontalPosition: z.number().int(),
  deviceId: z.string().nullish(),
  userId: z.string().nullish(),
  createdAt: z.date(),
  live: z.boolean(),
})
