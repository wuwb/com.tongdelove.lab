import { NextResponse } from 'next/server'
import { serialize } from 'superjson'
import { SearchPoemsQuery } from '@/server/backend/features/poem/SearchPoems/SearchPoemsQuery'

/**
 * 迁移自 src/pages/api/rest/poem/index.ts。
 */

export const runtime = 'nodejs'

const searchPoem = new SearchPoemsQuery()

export async function GET() {
  try {
    const { json: serializableData } = serialize(
      await searchPoem.execute({ limit: 100 })
    )
    return NextResponse.json(serializableData)
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}
