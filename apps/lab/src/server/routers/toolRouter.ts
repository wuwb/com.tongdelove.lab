import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'
import { z } from 'zod'
import { env } from '@/env/server'

export const toolRouter = router({
  getGoogleFonts: publicProcedure.query(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${env.GOOGLE_FONT_API_KEY}`
      )
      const data = res.json() as unknown as {
        items: {
          family: string
        }[]
      }
      const families = data.items.map((item) => item.family) ?? []
      return families
    } catch (err) {
      console.error('Error fetching font list:', err)
      return 'Get google fonts failed.'
    }
  }),
})
