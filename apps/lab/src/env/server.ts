import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { vercel } from '@t3-oss/env-core/presets'

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
  isServer: typeof window === 'undefined',
  // Extend the Vercel preset.
  extends: [
    // vercel
  ],
})
