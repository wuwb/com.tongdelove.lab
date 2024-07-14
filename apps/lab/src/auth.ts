import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import LinkedinProvider from 'next-auth/providers/linkedin'
import TwitterProvider from 'next-auth/providers/twitter'
import { prisma } from '@/server/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { env } from '@/env/server'
import { createHttpUnauthorized } from '@/lib/auth/error'
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { customSendVerificationRequest } from '@/pages/api/auth/signinemail'

const OneDayInSeconds = 86400
const JWT_EXPIRY = OneDayInSeconds * 7 // 7 days

const providers = [
  /**
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
  // CredentialsProvider({
  //   name: 'credentials',
  //   credentials: {
  //     email: {
  //       label: 'Email',
  //       type: 'email',
  //       placeholder: 'xxx@xxx.com',
  //     },
  //     password: {
  //       label: 'Password',
  //       type: 'password',
  //       placeholder: '请输入密码',
  //     },
  //   },
  //   authorize: async (credentials, request) => {
  //     console.log(credentials, request)
  //     // TODO
  //     // const maybeUser = await prisma.user.findFirst({
  //     //     where: {
  //     //         email: credentials.email,
  //     //     }
  //     // })
  //     if (!credentials) {
  //       throw createHttpUnauthorized('Credentials not provided')
  //     }

  //     const parsedCredentials = z
  //       .object({
  //         email: z.string().email(),
  //         password: z.string().min(6),
  //       })
  //       .safeParse(credentials)

  //     if (!parsedCredentials.success) {
  //       return null
  //       // throw createHttpUnauthorized('ParsedCredentials failed.')
  //     }

  //     const { email, password } = parsedCredentials.data

  //     console.log('===================================')
  //     console.log('email, password: ', email, password)
  //     console.log('===================================')

  //     const user = await prisma.user.findFirst({
  //       where: {
  //         email,
  //       },
  //     })

  //     console.log('===================================')
  //     console.log('find user: ', user)
  //     console.log('===================================')

  //     if (!user) {
  //       // 如果返回 null，则会显示一个错误，建议用户检查其详细信息。
  //       console.log('===================================')
  //       console.log('create user')
  //       console.log('===================================')
  //       const user = await prisma.user.create({
  //         where: {
  //           email,
  //         },
  //       })

  //       console.log('user: ', user)

  //       return null
  //       // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
  //       // throw new Error("用户名或密码错误")
  //     }

  //     const isValidPassword = true // await verify(user.password, creds.password)
  //     // const passwordsMatch = await bcrypt.compare(password, user.password)

  //     if (!isValidPassword) {
  //       return null
  //       // throw createHttpUnauthorized('Invalid credentials')
  //     }

  //     // 返回的对象将保存在 JWT 的用户属性中
  //     console.log('===================================')
  //     console.log('return user: ', user)
  //     console.log('===================================')
  //     return user
  //   },
  // }),
  {
    id: "http-email",
    name: "Email",
    type: "email",
    server: env.EMAIL_SERVER,
    from: env.EMAIL_FROM,
    maxAge: OneDayInSeconds, // Email link will expire in 24 hours
    sendVerificationRequest: customSendVerificationRequest,
  },
  // @see https://github.com/settings/applications/2443205
  // @see https://next-auth.js.org/providers/github
  GithubProvider({
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  }),
  DiscordProvider({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
  }),
  TwitterProvider({
    clientId: env.TWITTER_CLIENT_ID,
    clientSecret: env.TWITTER_CLIENT_SECRET,
  }),
  GoogleProvider({
    clientId: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
  }),
  LinkedinProvider({
    clientId: env.LINKEDIN_CLIENT_ID,
    clientSecret: env.LINKEDIN_CLIENT_SECRET,
  }),
]

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: JWT_EXPIRY,
    updateAge: OneDayInSeconds, // 24 hours
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    // adapter 适配后，返回 user 数据，直接赋值给 session
    session: async ({ session, token, user, newSession, trigger }) => {
      // add user info to session
      if (session?.user && token.sub) {
        session.user.id = token.sub

        // session.user.name = token.name
        // session.user.email = token.email
        // session.user.picture = token.picture

        // session.error = token.error // 用于处理 token 失效

        const jwtClaims = {
          id: session.user?.id?.toString(),
          email: session.user?.email,
          sub: session.user?.id,
          iat: Date.now() / 1000,
          exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
        }

        const encodedToken = jwt.sign(jwtClaims, env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'), { algorithm: 'RS256' })

        session.user.encodeToken = encodedToken
        // session.user.accessToken = token.accessToken
        // session.user.refreshToken = token.refreshToken
      }

      return session
    },
    // jwt: async ({ token, user, account, profile, trigger, isNewUser, session }) => {
    //   console.log('token: ', token)
    //   console.log('user: ', user)
    //   console.log('account: ', account)
    //   console.log('profile: ', profile)
    //   console.log('isNewUser: ', isNewUser)
    //   console.log('trigger: ', trigger)
    //   console.log('session: ', session)

    //   // query user
    //   if (trigger === 'signUp') {
    //     // See examples: https://github.com/nextauthjs/next-auth/issues/7658#issuecomment-1565248630
    //   }
    //   if (user) {
    //     token.id = user.id
    //     // token.role = user.role
    //   }
    //   return Promise.resolve({
    //     ...token,
    //     ...user,
    //   })
    // },

    /*
    async signIn({ user, account, profile, email, credentials }) {
        return true;
    },
    */
    redirect: async ({ url, baseUrl }) => {
      return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl)
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: OneDayInSeconds * 30,
    // You can define your own encode/decode functions for signing and encryption
    async encode({ secret, token }) {
      return jwt.sign(token, secret)
    },
    async decode({ secret, token }) {
      return jwt.verify(token, secret)
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
})
