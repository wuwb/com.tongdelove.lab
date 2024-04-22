import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { vercel } from '@t3-oss/env-core/presets'

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1),

    // next auth path
    NEXTAUTH_URL: z
      .preprocess(
        // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        str => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string().min(1) : z.string().url()
      )
      .optional(),
    NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string().optional() : z.string().optional(),
    JWT_PRIVATE_KEY: z.string(),
    // next auth provider
    EMAIL_SERVER: z.string().url(),
    EMAIL_FROM: z.string().min(1),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    TWITTER_CLIENT_ID: z.string(),
    TWITTER_CLIENT_SECRET: z.string(),
    LINKEDIN_CLIENT_ID: z.string(),
    LINKEDIN_CLIENT_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  isServer: typeof window === 'undefined',
  // Extend the Vercel preset.
  extends: [
    // vercel
  ],
})
