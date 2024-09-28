import { KlikitOrder } from '@/types/klikit/klikit'
import { createHmac } from './crypto'

export async function verifySignature(
  payload: KlikitOrder,
  signature: string | undefined,
  secretKey: string
): Promise<boolean> {
  if (!signature) {
    return false
  }

  const computedSignature = await createHmac(JSON.stringify(payload), secretKey)

  return computedSignature === signature
}
