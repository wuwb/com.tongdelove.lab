export async function createHmac(data: string, secret: string) {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const secretBuffer = encoder.encode(secret)

  const key = await crypto.subtle.importKey(
    'raw',
    secretBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, dataBuffer)

  const hmacHex = new Uint8Array(signature).reduce(
    (acc, b) => acc + b.toString(16).padStart(2, '0'),
    ''
  )

  // const hmacHex2 = Array.from(new Uint8Array(signature))
  //   .map((byte) => ('00' + byte.toString(16)).slice(-2))
  //   .join('')

  return hmacHex
}
