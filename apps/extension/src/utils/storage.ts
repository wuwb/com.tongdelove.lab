import { storage } from '#imports'

export const sessionStartTime
  = storage.defineItem<number>('session:start-time')
