import { env } from '@/env/index.js'
import { Redis } from '@upstash/redis'

declare global {
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined
}

export const redisClient =
  global.redisClient ||
  new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  })

if (env.NODE_ENV !== 'production') {
  global.redisClient = redisClient
}
