import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// 启用SQLite WAL模式
export async function initializeDatabase() {
  try {
    await db.$executeRaw`PRAGMA journal_mode = WAL`;
    await db.$executeRaw`PRAGMA synchronous = NORMAL`;
    await db.$executeRaw`PRAGMA foreign_keys = ON`;
    await db.$executeRaw`PRAGMA cache_size = 10000`;
    await db.$executeRaw`PRAGMA temp_store = memory`;
    await db.$executeRaw`PRAGMA mmap_size = 268435456`; // 256MB

    console.log('Database initialized with WAL mode enabled');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await db.$disconnect();
}