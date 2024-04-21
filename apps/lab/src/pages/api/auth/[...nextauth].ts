import NextAuth from 'next-auth'
import { authOptions } from '@/server/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`

  // if (req.query.nextauth.includes("callback") && req.method === "POST") {
  //     console.log(
  //         "Handling callback request from my Identity Provider",
  //         req.body
  //     )
  // }

  // Get a custom cookie value from the request
  const someCookie = req.cookies['some-custom-cookie']

  return await NextAuth(req, res, authOptions)
}
