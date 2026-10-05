import { NextResponse } from 'next/server'
import { PostRepositorySsr } from '@/server/backend/api/rest/post-repository.ssr'

/**
 * 迁移自 src/pages/api/rest/post/index.ts。
 */

export const runtime = 'nodejs'

export async function GET() {
  const postRepo = new PostRepositorySsr()
  try {
    return NextResponse.json(await postRepo.getPosts({ limit: 100 }))
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
