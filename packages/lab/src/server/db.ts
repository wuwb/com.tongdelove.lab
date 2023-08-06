import { env } from "@/env.mjs";
import { PrismaClient } from '@prisma/client';
// import { Redis } from '@upstash/redis';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
    // eslint-disable-next-line no-var
    var redisClient: Redis | undefined
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// export const redisClient =
//   global.redisClient ||
//   new Redis({
//     url: env.UPSTASH_REDIS_REST_URL,
//     token: env.UPSTASH_REDIS_REST_TOKEN,
//   })

//   if (env.NODE_ENV !== 'production') {
//     globalForPrisma.prisma = prisma;
//     global.prisma = prisma
//     global.redisClient = redisClient
//   }
