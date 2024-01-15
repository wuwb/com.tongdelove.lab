import { getContext } from '@/middlewares/context'

export async function timedPromise<T>(promise: Promise<T>, promiseName: string): Promise<T> {
  const { logger } = getContext()
  const startTime = Date.now()
  return await promise.then((result: any) => {
    const endTime = Date.now()
    logger.debug(`${promiseName} took ${endTime - startTime}ms to resolve.`)
    return result
  })
}
