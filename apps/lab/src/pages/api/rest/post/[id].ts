import type { NextApiRequest, NextApiResponse } from 'next'
import { PostRepositorySsr } from '@/server/backend/api/rest/post-repository.ssr'
import { prisma } from '@/server/db/prisma'

export default async function handleGetPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query
    const postRepo = new PostRepositorySsr(prisma)
    const post = await postRepo.getPost(id)
    res.json(post)
  } catch (e) {
    const { statusCode, message } = e instanceof Error ? e : { statusCode: 500, message: 'Unknown error' }
    res.status(statusCode).json(new Error(message))
  }
}
