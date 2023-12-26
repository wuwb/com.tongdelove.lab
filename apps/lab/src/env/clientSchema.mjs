// @ts-check
import { z } from 'zod'

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),
    NEXT_PUBLIC_MIXPANEL_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID: z.string(),
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string(),
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
    NEXT_PUBLIC_EXPRESS_SERVER_URL: z.string(),
    NEXT_PUBLIC_USERBACK_TOKEN: z.string(),
    NEXT_PUBLIC_EC2_BACKEND_URL: z.string(),
    NEXT_PUBLIC_FEATURE_AGENT: z.string().optional(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
    NEXT_PUBLIC_MIXPANEL_PROJECT_ID: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_ID,
    NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID:
        process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID:
        process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_EXPRESS_SERVER_URL: process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL,
    NEXT_PUBLIC_USERBACK_TOKEN: process.env.NEXT_PUBLIC_USERBACK_TOKEN,
    NEXT_PUBLIC_EC2_BACKEND_URL: process.env.NEXT_PUBLIC_EC2_BACKEND_URL,
    NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY:
        process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    NEXT_PUBLIC_FEATURE_AGENT: process.env.NEXT_PUBLIC_FEATURE_AGENT,
}
