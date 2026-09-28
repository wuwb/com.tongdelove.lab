import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

// 本地 docker Postgres（直连，不走 Supabase pgbouncer 事务池）。
// 默认指向 localhost:5432；如需覆盖可设置 DATABASE_URL。
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/core/database/drizzle/schema.ts',
  out: './src/core/database/drizzle',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/postgres',
  },
  casing: 'snake_case',
  verbose: true,
  strict: true,
})
