import { NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * 迁移自 src/pages/api/protected.tsx。
 *
 * App Router 的 route handler 使用 Web Request/Response，
 * auth() 不再需要 (req, res) 参数。
 */
export async function GET() {
  const session = await auth()

  if (session) {
    return NextResponse.json({ data: 'Protected data' })
  }

  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
}
