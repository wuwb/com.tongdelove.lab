import NextAuth, { NextAuthConfig } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import { LabAuthAdapter } from '@/server/backend/auth/lab-auth-adapter'
// import Credentials from 'next-auth/providers/credentials'
// import { env } from '@/env/server'
// import { createHttpUnauthorized } from '@/lib/auth/error'
import { authConfig } from './auth.config'
// import Resend from 'next-auth/providers/resend'
// import type { Adapter } from 'next-auth/adapters'

const OneDayInSeconds = 86400
const JWT_EXPIRY = OneDayInSeconds * 7 // 7 days

const config: NextAuthConfig = {
  theme: {
    logo: 'https://authjs.dev/img/logo-sm.png',
    colorScheme: 'auto',
    buttonText: '登录',
    brandColor: '#333',
  },
  // https://github.com/nextauthjs/next-auth/issues/9493
  // 认证数据（user/account/session）由 services/server 持有，lab 通过远程适配器访问。
  adapter: LabAuthAdapter(),
  // secret: env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: JWT_EXPIRY,
    // updateAge: OneDayInSeconds,
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
  },

  ...authConfig,
  debug: false,
}

/**
 * 直接传入配置对象。
 *
 * 之前用 `NextAuth((req) => config)` 形式，该签名在 App Router 下
 * 收到的并非标准 Request，导致 auth() 内部 headers.get 抛错。
 */
export const { handlers, signIn, signOut, auth } = NextAuth(config)
