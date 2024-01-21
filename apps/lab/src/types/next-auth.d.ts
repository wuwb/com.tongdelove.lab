import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    refreshTokenExpires?: number
    accessTokenExpires?: string
    refreshToken?: string
    token?: string
    error?: string
    user?: User
  }

  interface User {
    firstName?: string
    lastName?: string
    email?: string | null
    id?: string
    contactAddress?: {
      id?: string
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number
    accessTokenExpires?: number
    refreshToken?: string
    token: string
    exp?: number
    iat?: number
    jti?: string
  }
}
