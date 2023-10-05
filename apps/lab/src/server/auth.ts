// import { store } from '@/stores';
// import { setAccessToken, setUser } from '@/stores/authSlice';
// import axios from '@/utils/axios';
// import { AxiosResponse } from 'axios';
// import toast from 'react-hot-toast';

// important
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from 'next-auth/providers/email'
// import DiscordProvider from "next-auth/providers/discord";
// import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
// import LinkedinProvider from 'next-auth/providers/linkedin'
// import TwitterProvider from 'next-auth/providers/twitter'

// import { prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { env } from "@/configs/env.config";

const JWT_EXPIRY = 7 * 24 * 60 * 60 // 7 days
const oneDayInSeconds = 86400;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     GetServerSidePropsContext: DefaultSession["user"] & {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     };
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

console.log('auth prisma: ', prisma);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // async session2({ session, token }) {
    //   if (session.user && token.sub) {
    //     session.user.id = token.sub
    //     const jwtClaims = {
    //       id: session.user?.id?.toString(),
    //       email: session.user?.email,
    //       sub: session.user?.id,
    //       iat: Date.now() / 1000,
    //       exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
    //     }
    //     const encodedToken = jwt.sign(
    //       jwtClaims,
    //       process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    //       { algorithm: 'RS256' }
    //     )
    //     session.user.encodeToken = encodedToken
    //   }
    //   return Promise.resolve(session)
    // },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    /**
     * @see https://next-auth.js.org/providers/github
     */
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // 设置邮箱链接失效时间，默认24小时
    }),
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
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
  ],
  session: {
    strategy: 'jwt',
    maxAge: oneDayInSeconds * 30,
    updateAge: oneDayInSeconds, // 24 hours
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: oneDayInSeconds * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },

};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};



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
