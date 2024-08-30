import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/auth'

export const config = {
  runtime: 'nodejs',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res)

  if (session) {
    return res.json({ data: 'Protected data' })
  }

  return res.status(401).json({ message: 'Not authenticated' })
}
