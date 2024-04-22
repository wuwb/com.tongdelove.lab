import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // S3_ACCESS_KEY_ID: z.string(),
    // S3_SECRET_ACCESS_KEY: z.string(),
    // EC2_SERVER_URL: z.string(),
    // JWT_PRIVATE_KEY: z.string(),
    // JWT_PUBLIC_KEY: z.string(),
    // CLICKHOUSE_URL: z.string().optional(),
    // CLICKHOUSE_PASSWORD: z.string().optional(),
    // CLICKHOUSE_DATABASE: z.string().optional(),
    // REDIS_CLOUD_URL: z.string(),
    // RS_FILTER_REDIS_CLOUD_URL: z.string(),
    // RS_CANDIDATES_POOL_REDIS_CLOUD_URL: z.string(),
    // AXIOM_TOKEN: z.string(),
    // VERCEL: z.string().optional(),
    VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    // OPENAI_API_KEY: z.string(),
    // QDRANT_URL: z.string(),
    // QDRANT_KEY: z.string(),

    //
    DATABASE_URL: z
      .string()
      .url()
      .refine(str => !str.includes('YOUR_MYSQL_URL_HERE'), 'You forgot to change the default URL')
      .optional(),
    LAB_TONGDELOVE_URL: z.string(),
    LAB_TONGDELOVE_PRISMA_URL: z.string(),
    LAB_TONGDELOVE_URL_NON_POOLING: z.string(),
    LAB_TONGDELOVE_USER: z.string(),
    LAB_TONGDELOVE_HOST: z.string(),
    LAB_TONGDELOVE_PASSWORD: z.string(),
    LAB_TONGDELOVE_DATABASE: z.string(),

    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
    // NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),
    // NEXT_PUBLIC_MIXPANEL_PROJECT_ID: z.string(),
    // NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID: z.string(),
    // NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string(),
    // NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
    // NEXT_PUBLIC_EXPRESS_SERVER_URL: z.string(),
    // NEXT_PUBLIC_USERBACK_TOKEN: z.string(),
    // NEXT_PUBLIC_EC2_BACKEND_URL: z.string(),
    // NEXT_PUBLIC_FEATURE_AGENT: z.string().optional(),
    // NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // database
    DATABASE_URL: process.env.DATABASE_URL,
    LAB_TONGDELOVE_URL: process.env.LAB_TONGDELOVE_URL,
    LAB_TONGDELOVE_PRISMA_URL: process.env.LAB_TONGDELOVE_PRISMA_URL,
    LAB_TONGDELOVE_URL_NON_POOLING: process.env.LAB_TONGDELOVE_URL_NON_POOLING,
    LAB_TONGDELOVE_USER: process.env.LAB_TONGDELOVE_USER,
    LAB_TONGDELOVE_HOST: process.env.LAB_TONGDELOVE_HOST,
    LAB_TONGDELOVE_PASSWORD: process.env.LAB_TONGDELOVE_PASSWORD,
    LAB_TONGDELOVE_DATABASE: process.env.LAB_TONGDELOVE_DATABASE,

    // app
    NODE_ENV: process.env.NODE_ENV,

    //
    // S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    // S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    // EC2_SERVER_URL: process.env.EC2_SERVER_URL,
    // JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    // JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    // CLICKHOUSE_URL: process.env.CLICKHOUSE_URL,
    // CLICKHOUSE_PASSWORD: process.env.CLICKHOUSE_PASSWORD,
    // CLICKHOUSE_DATABASE: process.env.CLICKHOUSE_DATABASE,
    // REDIS_CLOUD_URL: process.env.REDIS_CLOUD_URL,
    // RS_FILTER_REDIS_CLOUD_URL: process.env.RS_FILTER_REDIS_CLOUD_URL,
    // RS_CANDIDATES_POOL_REDIS_CLOUD_URL: process.env.RS_CANDIDATES_POOL_REDIS_CLOUD_URL,
    // AXIOM_TOKEN: process.env.AXIOM_TOKEN,
    // VERCEL_ENV: process.env.VERCEL_ENV,
    // LOG_LEVEL: process.env.LOG_LEVEL,
    // OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    // QDRANT_URL: process.env.QDRANT_URL,
    // QDRANT_KEY: process.env.QDRANT_KEY,
    // NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    // NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    // NEXT_PUBLIC_MIXPANEL_PROJECT_ID: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_ID,
    // NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID: process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID,
    // NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    // NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    // NEXT_PUBLIC_EXPRESS_SERVER_URL: process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL,
    // NEXT_PUBLIC_USERBACK_TOKEN: process.env.NEXT_PUBLIC_USERBACK_TOKEN,
    // NEXT_PUBLIC_EC2_BACKEND_URL: process.env.NEXT_PUBLIC_EC2_BACKEND_URL,
    // NEXT_PUBLIC_FEATURE_AGENT: process.env.NEXT_PUBLIC_FEATURE_AGENT,

    // CI
    CI: process.env.CI,
  },
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
