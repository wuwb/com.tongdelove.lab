import { createTRPCRouter, publicProcedure } from '@/server/trpc/trpc'
import { labAppleGuideApi } from '@/server/backend/lab-content.api'

export const appleGuideRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return labAppleGuideApi.getAll()
  }),
})
