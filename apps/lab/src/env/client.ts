import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  // clientPrefix: "NEXT_PUBLIC_",
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
    // PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY: z.string().optional(),

    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().optional(),
    NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT: z.string().optional(),
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string().optional(),

    NEXT_PUBLIC_WORDPRESS_API_URL: z.string().optional(),

    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_MC_ID: z.string().optional(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY:
      process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT:
      process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_API_ENDPOINT,
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_WORDPRESS_API_URL:
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    NEXT_PUBLIC_GA_ID:
      process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_MC_ID:
      process.env.NEXT_PUBLIC_MC_ID,
  },
  emptyStringAsUndefined: true,
})
