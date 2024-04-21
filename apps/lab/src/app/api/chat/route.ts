import { sleep } from '@/utils'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { messageText } = (await request.json()) as {
    messageText: string
  }
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < messageText.length; i++) {
        await sleep(100)
        const index: number = i
        controller.enqueue(encoder.encode(messageText[index]))
      }
      controller.close()
    },
  })
  return new Response(stream)
}
