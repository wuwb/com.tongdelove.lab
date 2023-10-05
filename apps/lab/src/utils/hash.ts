import crypto from 'crypto'
import SparkMD5 from 'spark-md5'

export async function sha256(message: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return hash
}

export function hashMessage(msg: string): string {
  const spark = new SparkMD5()
  spark.append(msg)
  return spark.end() // hex hash
  // const hashBuffer = await sha256(msg)
  // const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  // const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  // return hashHex
}
