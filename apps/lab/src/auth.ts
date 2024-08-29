import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import LinkedinProvider from 'next-auth/providers/linkedin'
import TwitterProvider from 'next-auth/providers/twitter'
import { prisma } from '@/server/db/prisma'
import Credentials from 'next-auth/providers/credentials'
import { env } from '@/env/server'
import { createHttpUnauthorized } from '@/lib/auth/error'
import DiscordProvider from 'next-auth/providers/discord'
import Github from 'next-auth/providers/github'
import { ZodError, z } from 'zod'
import jwt from 'jsonwebtoken'
import { customSendVerificationRequest } from '@/pages/api/auth/signinemail'
import Resend from 'next-auth/providers/resend'
import type { Adapter } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt'

const OneDayInSeconds = 86400
const JWT_EXPIRY = OneDayInSeconds * 7 // 7 days

const providers = [
  // Credentials({
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
  //     try {
  // // TODO
  // // const maybeUser = await prisma.user.findFirst({
  // //     where: {
  // //         email: credentials.email,
  // //     }
  //       // })
  //       if (!credentials) {
  //         throw createHttpUnauthorized('Credentials not provided')
  //       }

  //       const { email, password } = await z
  //         .object({
  //           email: z.string().email(),
  //           password: z.string().min(6),
  //         })
  //         .parseAsync(credentials)

  //       console.log('===================================')
  //       console.log('email, password: ', email, password)
  //       console.log('===================================')

  //       const user = await prisma.user.findFirst({
  //         where: {
  //           email,
  //         },
  //       })

  //       console.log('===================================')
  //       console.log('find user: ', user)
  //       console.log('===================================')

  //       if (!user) {
  //         // 如果返回 null，则会显示一个错误，建议用户检查其详细信息。
  //         console.log('===================================')
  //         console.log('create user')
  //         console.log('===================================')
  //         const user = await prisma.user.create({
  //           data: {
  //             email,
  //           },
  //         })

  //         if (!user) {
  //           throw new Error("用户名或密码错误")
  //         }

  //         console.log('user: ', user)

  //         return user
  //         // 跳转到错误页面，并且携带错误信息 http://localhost:3000/api/auth/error?error=用户名或密码错误
  //         // throw new Error("用户名或密码错误")
  //       }

  //       const isValidPassword = true // await verify(user.password, creds.password)
  //       // const passwordsMatch = await bcrypt.compare(password, user.password)

  //       if (!isValidPassword) {
  //         throw new Error('Invalid credentials')
  //         // throw createHttpUnauthorized('Invalid credentials')
  //       }

  //       // 返回的对象将保存在 JWT 的用户属性中
  //       console.log('===================================')
  //       console.log('return user: ', user)
  //       console.log('===================================')
  //       return user
  //     } catch (error) {
  //       if (error instanceof ZodError) {
  //         // Return `null` to indicate that the credentials are invalid
  //         return null
  //       }
  //     }
  //   },
  // }),
  // {
  //   id: 'http-email',
  //   name: 'Email',
  //   type: 'email',
  //   server: env.EMAIL_SERVER,
  //   from: env.EMAIL_FROM,
  //   maxAge: OneDayInSeconds, // Email link will expire in 24 hours
  //   sendVerificationRequest: customSendVerificationRequest,
  // },
  // Resend({
  //   apiKey: env.AUTH_RESEND_KEY,
  //   from: "no-reply@lab.printlake.com"
  // }),
  // @see https://github.com/settings/applications/2443205
  // @see https://next-auth.js.org/providers/github
  Github,
  // GoogleProvider({
  //   clientId: env.AUTH_GOOGLE_ID,
  //   clientSecret: env.AUTH_GOOGLE_SECRET,
  //   authorization: {
  //     params: {
  //       access_type: "offline",
  //       prompt: "consent"
  //     }
  //   },
  // }),
]

const config = {
  theme: {
    logo: 'https://authjs.dev/img/logo-sm.png',
    colorScheme: 'auto',
  },
  adapter: PrismaAdapter(prisma),
  providers,
  // secret: env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  //   maxAge: JWT_EXPIRY,
  //   updateAge: OneDayInSeconds,
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   // Seconds - Throttle how frequently to write to database to extend a session.
  //   // Use it to limit write operations. Set to 0 to always update the database.
  //   // Note: This option is ignored if using JSON Web Tokens
  // },
  // jwt: {
  //   // The maximum age of the NextAuth.js issued JWT in seconds.
  //   // Defaults to `session.maxAge`.
  //   maxAge: OneDayInSeconds * 30,
  //   // You can define your own encode/decode functions for signing and encryption
  //   // async encode({ secret, token }) {
  //   //   return jwt.sign(token, secret)
  //   // },
  //   // async decode({ secret, token }) {
  //   //   return jwt.verify(token, secret)
  //   // },
  // },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === '/middleware-example') {
        return !!auth
      }
      return true
    },
    // If you want to pass data such as an Access Token or User ID to the browser when using JSON Web Tokens, you can persist the data in the token when the jwt callback is called，
    async jwt(data) {
      // console.log('================================================')
      const { token, user, account, profile, trigger, isNewUser } = data
      // console.log('jwt data 1: ', token, user, account, profile, trigger, isNewUser)
      // console.log('--------------------------------')
      const { session } = data
      // console.log('jwt data 2: ', token, session)
      // console.log('--------------------------------')
      const mockData = {
        token: {
          name: 'Wu Wenbin',
          email: '541330190@qq.com',
          picture: 'https://avatars.githubusercontent.com/u/510080?v=4',
          sub: 'clzvgrma20001m0d62jctdynr',
        },
        user: {
          id: 'clzvgrma20001m0d62jctdynr',
          name: 'Wu Wenbin',
          email: '541330190@qq.com',
          emailVerified: null,
          about: '',
          interests: '',
          isPublic: true,
          tagline: '',
          location: '',
          subscription: 'free',
          credit: 0,
          subscriptionStart: null,
          stripeCustomerId: '',
          subscriptionId: '',
          language: null,
          image: 'https://avatars.githubusercontent.com/u/510080?v=4',
          username: null,
          gender: 0,
          birthday: null,
          last_login_time: null,
          last_login_ip: '',
          level: 0,
          login: null,
          pass: null,
          password: null,
          nicename: '',
          url: '',
          activationKey: null,
          status: 0,
          displayName: '',
          resetKey: null,
          phone: '',
          spam: 0,
          firstName: '',
          lastName: '',
          age: null,
          platform: 0,
          isSuper: 0,
          avatar: null,
          createdAt: '2024-08-15T15:57:21.674Z',
          updatedAt: '2024-08-15T15:57:21.674Z',
          deletedAt: null,
          role: 'USER',
          deptId: null,
          weixin_openid: '',
          session_key: '',
        },
        account: {
          access_token: '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',
          token_type: 'bearer',
          scope: 'read:user,user:email',
          provider: 'github',
          type: 'oauth',
          providerAccountId: '510080',
        },
        profile: {
          login: 'wuwb',
          id: 510080,
          node_id: 'MDQ6VXNlcjUxMDA4MA==',
          avatar_url: 'https://avatars.githubusercontent.com/u/510080?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/wuwb',
          html_url: 'https://github.com/wuwb',
          followers_url: 'https://api.github.com/users/wuwb/followers',
          following_url:
            'https://api.github.com/users/wuwb/following{/other_user}',
          gists_url: 'https://api.github.com/users/wuwb/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/wuwb/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/wuwb/subscriptions',
          organizations_url: 'https://api.github.com/users/wuwb/orgs',
          repos_url: 'https://api.github.com/users/wuwb/repos',
          events_url: 'https://api.github.com/users/wuwb/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/wuwb/received_events',
          type: 'User',
          site_admin: false,
          name: 'Wu Wenbin',
          company: null,
          blog: '',
          location: 'Hangzhou, China',
          email: '541330190@qq.com',
          hireable: true,
          bio:
            '\r\n' +
            '    Web PC & Mobile | Hybrid | Cloud Native | Full Stack Developer | JS/TS\r\n',
          twitter_username: 'wuwb_',
          notification_email: '541330190@qq.com',
          public_repos: 19,
          public_gists: 7,
          followers: 84,
          following: 267,
          created_at: '2010-12-05T09:44:15Z',
          updated_at: '2024-07-17T11:18:36Z',
          private_gists: 42,
          total_private_repos: 32,
          owned_private_repos: 32,
          disk_usage: 1349467,
          collaborators: 1,
          two_factor_authentication: true,
          plan: {
            name: 'free',
            space: 976562499,
            collaborators: 0,
            private_repos: 10000,
          },
        },
        isNewUser: false,
        trigger: 'signIn',
      }
      const mockData2 = {
        token: {
          name: 'Wu Wenbin',
          email: '541330190@qq.com',
          picture: 'https://avatars.githubusercontent.com/u/510080?v=4',
          sub: 'clzvgrma20001m0d62jctdynr',
          id: 'clzvgrma20001m0d62jctdynr',
          emailVerified: null,
          about: '',
          interests: '',
          isPublic: true,
          tagline: '',
          location: '',
          subscription: 'free',
          credit: 0,
          subscriptionStart: null,
          stripeCustomerId: '',
          subscriptionId: '',
          language: null,
          image: 'https://avatars.githubusercontent.com/u/510080?v=4',
          username: null,
          gender: 0,
          birthday: null,
          last_login_time: null,
          last_login_ip: '',
          level: 0,
          login: null,
          pass: null,
          password: null,
          nicename: '',
          url: '',
          activationKey: null,
          status: 0,
          displayName: '',
          resetKey: null,
          phone: '',
          spam: 0,
          firstName: '',
          lastName: '',
          age: null,
          platform: 0,
          isSuper: 0,
          avatar: null,
          createdAt: '2024-08-15T15:57:21.674Z',
          updatedAt: '2024-08-15T15:57:21.674Z',
          deletedAt: null,
          role: 'USER',
          deptId: null,
          weixin_openid: '',
          session_key: '',
          iat: 1723774358,
        },
        session: undefined,
      }
      // query user
      //   if (trigger === 'signUp') {
      //     // See examples: https://github.com/nextauthjs/next-auth/issues/7658#issuecomment-1565248630
      //   }
      //   if (user) {
      //     token.id = user.id
      //     // token.role = user.role
      //   }

      if (trigger === 'update') {
        token.name = session.user.name
      }

      return {
        ...token,
        access_token: account?.access_token,
      }

      // if (account) {
      //   //   token.id = profile?.id
      //   return {
      //     ...token,
      //     access_token: account.access_token,
      //   }
      // } else if (Date.now() < token.expires_at * 1000) {
      //   // Subsequent logins, but the `access_token` is still valid
      //   return token
      // }
      // else {
      //   if (!token.refresh_token) {
      //     throw new TypeError("Missing refresh_token")
      //   }
      //   try {
      //     const response = await fetch("https://oauth2.googleapis.com/token", {
      //       method: "POST",
      //       body: new URLSearchParams({
      //         client_id: env.AUTH_GOOGLE_ID!,
      //         client_secret: env.AUTH_GOOGLE_SECRET!,
      //         grant_type: "refresh_token",
      //         refresh_token: token.refresh_token!,
      //       }),
      //     })

      //     const tokensOrError = await response.json()

      //     if (!response.ok) throw tokensOrError

      //     const newTokens = tokensOrError as {
      //       access_token: string
      //       expires_in: number
      //       refresh_token?: string
      //     }

      //     token.access_token = newTokens.access_token
      //     token.expires_at = Math.floor(
      //       Date.now() / 1000 + newTokens.expires_in
      //     )
      //     // Some providers only issue refresh tokens once, so preserve if we did not get a new one
      //     if (newTokens.refresh_token)
      //       token.refresh_token = newTokens.refresh_token
      //     return token

      //   } catch (error) {
      //     console.error("Error refreshing access_token", error)
      //     // If we fail to refresh the token, return an error so we can handle it on the page
      //     token.error = "RefreshTokenError"
      //     return token
      //   }
      // }
    },

    // adapter 适配后，返回 user 数据，直接赋值给 session
    // pass the data through to the browser in the session callback.
    async session(data) {
      // console.log('================================================')
      // console.log('session data: ', data)
      const { session, token } = data
      const { user, newSession, trigger } = data
      const mockData = {
        session: {
          user: {
            name: 'Wu Wenbin',
            email: '541330190@qq.com',
            image: 'https://avatars.githubusercontent.com/u/510080?v=4',
          },
          expires: '2024-08-22T16:04:41.648Z',
        },
        token: {
          name: 'Wu Wenbin',
          email: '541330190@qq.com',
          picture: 'https://avatars.githubusercontent.com/u/510080?v=4',
          sub: 'clzvgrma20001m0d62jctdynr',
          iat: 1723737880,
        },
      }

      if (token?.access_token) {
        session.access_token = token.access_token
      }

      if (session?.user) {
        session.user.id = token?.sub

        // session.user.name = token.name
        // session.user.email = token.email
        // session.user.picture = token.picture
        // session.error = token.error // 用于处理 token 失效
        // session.user.accessToken = token.accessToken
        // session.user.refreshToken = token.refreshToken

        //   const jwtClaims = {
        //     id: session.user?.id?.toString(),
        //     email: session.user?.email,
        //     sub: session.user?.id,
        //     iat: Date.now() / 1000,
        //     exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
        //   }
        //   const encodedToken = jwt.sign(
        //     jwtClaims,
        //     env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
        //     { algorithm: 'RS256' }
        //   )
        // session.user.encodeToken = encodedToken
      }

      return session
    },

    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },

    /*
    async signIn({ user, account, profile, email, credentials }) {
        return true;
    },
    */
    // async redirect({ url, baseUrl }) {
    // // return baseUrl
    //   return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl)
    // },
  },

  pages: {
    // signIn: '/auth/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request',  // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    // experimental: {
    //   enableWebAuthn: true,
  },
  debug: false,
}

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  if (req) {
    console.log(req)
  }

  return config
})
