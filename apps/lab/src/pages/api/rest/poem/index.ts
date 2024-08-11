import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'superjson'
import { SearchPoemsQuery } from '@/server/backend/features/poem/SearchPoems/SearchPoemsQuery'
import { prisma } from '@/server/db/prisma'

const searchPoem = new SearchPoemsQuery(prisma)

const handleListPoems = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { json: serializableData, meta } = serialize(
        await searchPoem.execute({
          limit: 100,
        })
      )
      return res.json(serializableData)
    } catch (e) {
      return res.status(500).json(new Error(e))
    }
  } else {
    return res
      .status(500)
      .json(
        new Error(
          `The HTTP ${req.method} method is not supported at this route.`
        )
      )
  }
}

export default handleListPoems
