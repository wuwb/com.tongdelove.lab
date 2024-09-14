import {
  BinaryToTextEncoding,
  createHash,
  createHmac,
  Encoding,
  pbkdf2Sync,
  randomBytes,
} from 'node:crypto'
import bcrypt from 'bcryptjs'

export const md5 = (
  data: string,
  inputEncoding: Encoding,
  encoding: BinaryToTextEncoding
) => {
  if (!data) {
    return ''
  }
  inputEncoding = inputEncoding || 'utf-8'
  encoding = encoding || 'hex'
  const hash = createHash('md5')
  return hash.update(data, inputEncoding).digest(encoding)
}

export const sha1 = (
  data: string,
  inputEncoding: Encoding,
  encoding: BinaryToTextEncoding
) => {
  if (!data) {
    return ''
  }
  inputEncoding = inputEncoding || 'utf-8'
  encoding = encoding || 'hex'
  const hash = createHash('sha1')
  return hash.update(data, inputEncoding).digest(encoding)
}

/**
 * Encrypt the password
 *
 * @param password password
 */
export async function encryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, bcrypt.genSaltSync())
}

/**
 * Check if the password is correct
 *
 * @param password password
 * @param passwordHash password of hash
 */
export async function checkPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}

/**
 * Make salt
 */
export function makeSalt(): string {
  return randomBytes(3).toString('base64')
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPasswordWithSalt(
  password: string,
  salt: string
): string {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, 'base64')
  return (
    // 10000 代表迭代次数 16代表长度
    pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}

export const hmacSHA1 = (key: string, data: string) => {
  // hmac.digest([encoding])
  // If encoding is provided a string is returned; otherwise a Buffer is returned;
  return createHmac('sha1', key).update(data).digest().toString('base64')
}

export const base64Encode = (str: string) => {
  const b = new Buffer(str)
  return b.toString('base64')
}

export const base64Decode = (str: string) => {
  const b = new Buffer(str, 'base64')
  return b.toString()
}
