import type { NextApiRequest, NextApiResponse } from 'next'
import { PostRepositorySsr } from '@/server/backend/api/rest/post-repository.ssr'
import { prisma } from '@/server/db/prisma'

export default async function handleListPosts(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const postRepo = new PostRepositorySsr(prisma)
    try {
      return res.json(
        await postRepo.getPosts({
          limit: 100,
        })
      )
    } catch (e) {
      return res.status(500).json(new Error(e))
    }
  } else {
    return res.status(500).json(new Error(`The HTTP ${req.method} method is not supported at this route.`))
  }
}
