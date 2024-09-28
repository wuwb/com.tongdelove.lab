export async function collectAndParseJsonFromStream(stream: any) {
  const reader = stream.getReader()
  let binaryData = new Uint8Array()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        console.log('done break')
        break
      }
      binaryData = concatUint8Arrays(binaryData, value as Uint8Array)
    }
  } finally {
    reader.releaseLock()
  }

  const decoder = new TextDecoder('utf-8')
  const text = decoder.decode(binaryData)

  const json = JSON.parse(text)
  return json
}

export function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
  const c = new Uint8Array(a.length + b.length)
  c.set(a, 0)
  c.set(b, a.length)
  return c
}
