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
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
    token: JWT
    access_token?: string
  } 

  interface User {

  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {}

  /**
   * The OAuth profile returned from your provider
   */
  interface Profile {}

  /**
   * The shape of the user object returned by the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultSession {
    id?: string
    encodeToken?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string
    email: string
    picture: string
    sub: string,
    access_token?: string,
    iat: number
    exp: number
    jti: string
  }
}
