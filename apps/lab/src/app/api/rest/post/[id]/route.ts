import { NextResponse } from 'next/server'
import { PostRepositorySsr } from '@/server/backend/api/rest/post-repository.ssr'

/**
 * 迁移自 src/pages/api/rest/post/[id].ts。
 */

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const postRepo = new PostRepositorySsr()
    const post = await postRepo.getPost(id)
    return NextResponse.json(post)
  } catch (e) {
    const { statusCode, message } =
      e instanceof Error
        ? { statusCode: 500, message: e.message }
        : { statusCode: 500, message: 'Unknown error' }
    return NextResponse.json({ message }, { status: statusCode })
  }
}
