import type { Config } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL || "file:local.db";

export default {
  schema: "./src/schema/sqlite-products.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: dbUrl,
  },
} satisfies Config;
