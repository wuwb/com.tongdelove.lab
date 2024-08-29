import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res)
  // const session = await getSession(req, res)
  const url = `${req.headers['x-forwarded-proto']}://${req.headers.host}/api/auth/session`

  console.log('protected url: ', url)
  console.log('protected session: ', session)

  if (session) {
    return res.json({ data: 'Protected data' })
  }

  return res.status(401).json({ message: 'Not authenticated' })
}
