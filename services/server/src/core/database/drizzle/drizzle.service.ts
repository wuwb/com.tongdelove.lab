import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common'
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

/**
 * 规范化连接串：
 * - 去掉首尾空白
 * - 去掉 .env 里常见的包裹引号（如 DATABASE_URL="postgres://..." 只写了一边引号的情况），
 *   否则 postgres-js 的 new URL() 会抛出 ERR_INVALID_URL。
 */
function normalizeConnectionString(raw: string): string {
  return raw.trim().replace(/^["']+|["']+$/g, '')
}

function resolveConnectionString(): string {
  if (process.env.DATABASE_URL) {
    return normalizeConnectionString(process.env.DATABASE_URL)
  }
  const host = process.env.DATABASE_HOST || 'localhost'
  const port = Number(process.env.DATABASE_PORT) || 5432
  const username = process.env.DATABASE_USERNAME || 'postgres'
  const password = process.env.DATABASE_PASSWORD || 'postgres'
  const database = process.env.DATABASE_DATABASE || 'postgres'
  return `postgresql://${username}:${password}@${host}:${port}/${database}`
}

/**
 * drizzle-orm 数据库连接（替代原先的 Prisma + @prisma/adapter-pg）。
 *
 * 关键变化：直连本地 docker Postgres（默认 localhost:5432），
 * 不再经过 Supabase pgbouncer 事务连接池，从根本上避免
 * "Connection terminated unexpectedly" 的空闲连接被服务端掐断问题。
 */
@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DrizzleService.name)
  private client!: ReturnType<typeof postgres>
  db!: PostgresJsDatabase<typeof schema>

  onModuleInit() {
    const url = resolveConnectionString()
    // postgres-js 直连：max 控制连接数，idle_timeout 让空闲连接按时回收。
    this.client = postgres(url, {
      max: Number(process.env.DATABASE_POOL_MAX) || 10,
      idle_timeout: 30,
      connect_timeout: 10,
    })
    this.db = drizzle(this.client, { schema })
    this.logger.log(
      `Drizzle client initialized, target: ${url.replace(/\/\/[^@]*@/, '//***@')}`,
    )
  }

  async onModuleDestroy() {
    await this.client?.end().catch(() => undefined)
  }
}
