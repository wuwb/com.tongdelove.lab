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
    user: {
      id: string
      encodeToken: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
    token: JWT
    GetServerSidePropsContext: DefaultSession['user'] & {
      id: string
      // ...other properties
      // role: UserRole;
    }
  }
}
