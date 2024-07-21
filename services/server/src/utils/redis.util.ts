import { RedisKeys } from '@/common/constants/redis.constant'

type Prefix = 'mx' | 'mx-demo'
const prefix = 'mx'

export const getRedisKey = <T extends string = RedisKeys | '*'>(
  key: T,
  ...concatKeys: string[]
): `${Prefix}:${T}${string | ''}` => {
  return `${prefix}:${key}${concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''}`
}
