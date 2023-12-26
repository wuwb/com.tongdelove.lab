// @ts-check
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_SECRET:
        process.env.NODE_ENV === 'production'
            ? z.string().min(1)
            : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
        // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
        // Since NextAuth.js automatically uses the VERCEL_URL if present.
        (str) => process.env.VERCEL_URL ?? str,
        // VERCEL_URL doesn't include `https` so it cant be validated as a URL
        process.env.VERCEL ? z.string() : z.string().url()
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    TWITTER_CLIENT_ID: z.string(),
    TWITTER_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    LINKEDIN_CLIENT_ID: z.string(),
    LINKEDIN_CLIENT_SECRET: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    EC2_SERVER_URL: z.string(),
    JWT_PRIVATE_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),
    EMAIL_SERVER: z.string(),
    EMAIL_FROM: z.string(),
    CLICKHOUSE_URL: z.string().optional(),
    CLICKHOUSE_PASSWORD: z.string().optional(),
    CLICKHOUSE_DATABASE: z.string().optional(),
    REDIS_CLOUD_URL: z.string(),
    RS_FILTER_REDIS_CLOUD_URL: z.string(),
    RS_CANDIDATES_POOL_REDIS_CLOUD_URL: z.string(),
    AXIOM_TOKEN: z.string(),
    VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
    OPENAI_API_KEY: z.string(),
    QDRANT_URL: z.string(),
    QDRANT_KEY: z.string(),
})
