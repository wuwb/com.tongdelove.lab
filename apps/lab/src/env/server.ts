import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { vercel } from '@t3-oss/env-core/presets'

export const env = createEnv({
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  server: {
    // database
    LAB_TONGDELOVE_PRISMA_URL: z.string(),
    LAB_TONGDELOVE_URL_NON_POOLING: z.string(),

    // nextjs auth
    NEXTAUTH_URL: z
      .preprocess(
        // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string().min(1) : z.string().url()
      )
      .optional(),
    NEXTAUTH_SECRET: z.string().optional(),
    JWT_PRIVATE_KEY: z.string().optional(),
    EMAIL_SERVER: z.string().url(),
    EMAIL_FROM: z.string().min(1),
    AUTH_RESEND_KEY: z.string().optional(),

    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),


    TWITTER_CLIENT_ID: z.string().optional(),
    TWITTER_CLIENT_SECRET: z.string().optional(),
    LINKEDIN_CLIENT_ID: z.string().optional(),
    LINKEDIN_CLIENT_SECRET: z.string().optional(),

    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_SECRET_ACCESS_KEY: z.string().optional(),

    // dev
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    // S3_ACCESS_KEY_ID: z.string(),
    // S3_SECRET_ACCESS_KEY: z.string(),
    // CLICKHOUSE_URL: z.string().optional(),
    // CLICKHOUSE_PASSWORD: z.string().optional(),
    // CLICKHOUSE_DATABASE: z.string().optional(),
    // REDIS_CLOUD_URL: z.string(),
    // QDRANT_URL: z.string(),
    // QDRANT_KEY: z.string(),
    // OPENAI_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
  isServer: typeof window === 'undefined',
  // Extend the Vercel preset.
  extends: [vercel()],

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
