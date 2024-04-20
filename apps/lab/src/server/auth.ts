import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type DefaultSession, type NextAuthOptions, User, Session } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from '@/server/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { env } from '@/env'
import { createHttpUnauthorized } from '@/lib/auth/error'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { customSendVerificationRequest } from '@/pages/api/auth/signinemail'
import { JWT } from 'next-auth/jwt'

const JWT_EXPIRY = 7 * 24 * 60 * 60 // 7 days
const oneDayInSeconds = 86400

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      // ...other properties
      // role: UserRole;
    }
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'xxx@xxx.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      authorize: async (credentials, request) => {
        console.log(credentials, request)
        // TODO
        // const maybeUser = await prisma.user.findFirst({
        //     where: {
        //         email: credentials.email,
        //     }
        // })
        if (!credentials) {
          throw createHttpUnauthorized('Credentials not provided')
        }

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
          // throw createHttpUnauthorized('ParsedCredentials failed.')
        }

        const { email, password } = parsedCredentials.data

        console.log('===================================')
        console.log('email, password: ', email, password)
        console.log('===================================')

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        })

        console.log('===================================')
        console.log('find user: ', user)
        console.log('===================================')

        if (!user) {
          // 如果返回 null，则会显示一个错误，建议用户检查其详细信息。
          console.log('===================================')
          console.log('create user')
          console.log('===================================')
          const user = await prisma.user.create({
            where: {
              email,
            },
          })

          console.log('user: ', user)

          return null
          // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
          // throw new Error("用户名或密码错误")
        }

        const isValidPassword = true // await verify(user.password, creds.password)
        // const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          return null
          // throw createHttpUnauthorized('Invalid credentials')
        }

        // 返回的对象将保存在 JWT 的用户属性中
        console.log('===================================')
        console.log('return user: ', user)
        console.log('===================================')
        return user
      },
    }),
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      sendVerificationRequest: customSendVerificationRequest,
      maxAge: 24 * 60 * 60, // 设置邮箱链接失效时间，默认24小时
    }),
    // @see https://github.com/settings/applications/2443205
    // @see https://next-auth.js.org/providers/github
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 50000,
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: env.TWITTER_CLIENT_ID,
    //   clientSecret: env.TWITTER_CLIENT_SECRET,
    //   version: '2.0',
    // }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID!,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET!
    // }),
    // LinkedinProvider({
    //   clientId: env.LINKEDIN_CLIENT_ID,
    //   clientSecret: env.LINKEDIN_CLIENT_SECRET,
    // }),
    /**
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: 'jwt',
    maxAge: oneDayInSeconds * 30,
    updateAge: oneDayInSeconds, // 24 hours
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    secret: 'test',
    maxAge: oneDayInSeconds * 30,
    // You can define your own encode/decode functions for signing and encryption
    async encode({ secret, token }) {
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      return jwt.verify(token, secret)
    },
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser, trigger }) => {
      console.log('jwt ======================================')
      console.log('token: ', token)
      console.log('user: ', user)
      console.log('account: ', account)
      console.log('profile: ', profile)
      console.log('isNewUser: ', isNewUser)
      console.log('trigger: ', trigger)
      console.log('jwt ======================================')
      if (trigger === 'signUp') {
        // See examples: https://github.com/nextauthjs/next-auth/issues/7658#issuecomment-1565248630
      }
      if (user) {
        token.id = user.id
        // token.role = user.role
      }
      return Promise.resolve({
        ...token,
        ...user,
      })
    },
    // adapter 适配后，返回 user 数据，直接赋值给 session
    session: async ({ session, token, user }) => {
      console.log('session ======================================')
      console.log('session: ', session)
      console.log('token: ', token)
      console.log('user: ', user)
      console.log('session ======================================')
      if (session?.user && token) {
        session.user.id = token.id as string
        // session.user.id = token.sub
        // session.user.accessToken = token.accessToken;
        // session.user.refreshToken = token.refreshToken;
        // session.error = token.error; // 用于处理token 失效
        // const jwtClaims = {
        //     id: session.user?.id?.toString(),
        //     email: session.user?.email,
        //     sub: session.user?.id,
        //     iat: Date.now() / 1000,
        //     exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
        // }
        // const encodedToken = jwt.sign(
        //     jwtClaims,
        //     env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        //     { algorithm: 'RS256' }
        // )
        // session.user.encodeToken = encodedToken
      }
      return session
      // return Promise.resolve({
      //     ...session,
      //     user: {
      //         ...session.user,
      //         id: user.id,
      //     },
      // })
    },

    /*
    async signIn({ user, account, profile, email, credentials }) {
        return true;
    },
    */
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl)
    },
  },
  pages: {
    // signIn: '/user/login',
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request',  // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === 'development',
}

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: { req: GetServerSidePropsContext['req']; res: GetServerSidePropsContext['res'] }) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}

// others

// export type AuthDTO = {
//   user: User;
//   accessToken: string;
// };

// // login
// export type LoginParams = {
//   identifier: string;
//   password: string;
// };
// export async function login(loginParams: LoginParams) {
//   const { data } = await axios.post<AuthDTO, AxiosResponse, any>('/auth/login', {
//     username: loginParams.identifier,
//     ...loginParams,
//   });
//   const { user, token } = data.data;
//   store.dispatch(setUser(user));
//   store.dispatch(setAccessToken(token));
// }

// // register
// export type RegisterParams = {
//   username: string;
//   email: string;
//   password: string;
// };

// export async function register(registerParams: RegisterParams) {
//   const { data } = await axios.post<AuthDTO, AxiosResponse, RegisterParams>('/auth/register', registerParams);
//   const { user, token } = data.data;
//   store.dispatch(setUser(user));
//   store.dispatch(setAccessToken(token));
// }

// // forgot password
// export type ForgotPasswordParams = {
//   email: string;
// };
// export const forgotPassword = async (forgotPasswordParams: ForgotPasswordParams) => {
//   console.log('----1');
//   await axios.post<void, AxiosResponse<void>, ForgotPasswordParams>('/auth/forgot-password', forgotPasswordParams);
//   console.log('----2');
//   toast.success('Please check your email for the password reset link.');
// };

// // reset password
// export type ResetPasswordParams = {
//   resetToken: string;
//   password: string;
// };
// export async function resetPassword(resetPasswordParams: ResetPasswordParams) {
//   await axios.post<void, AxiosResponse<void>, ResetPasswordParams>('/auth/reset-password', resetPasswordParams);

//   toast.success('Your password has been changed successfully, please login again.');
// }
