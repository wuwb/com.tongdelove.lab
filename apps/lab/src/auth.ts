import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
// import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/server/db/prisma'
// import Credentials from 'next-auth/providers/credentials'
// import { env } from '@/env/server'
// import { createHttpUnauthorized } from '@/lib/auth/error'
import { authConfig } from './auth.config'
// import { customSendVerificationRequest } from '@/pages/api/auth/signinemail'
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
  adapter: PrismaAdapter(prisma),
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

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  if (req) {
    console.log(req)
  }

  return config
})
