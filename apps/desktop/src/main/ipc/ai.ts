import { ipcMain, type WebContents } from 'electron'
import { IPC_CANNELS, type ChatChunk } from '@/shared/ipc'
import { createChatStream, type ChatStreamRequest, type ProviderName } from '../services/ai'

const activeControllers = new Map<string, AbortController>()

export function registerAiIpc(target: WebContents) {
  ipcMain.handle(IPC_CANNELS.AI_START, async (_e, req: ChatStreamRequest & { provider?: ProviderName }) => {
    const controller = new AbortController()
    activeControllers.set(req.conversationId, controller)
    ;(async () => {
      try {
        const stream = createChatStream(req.provider ?? 'mock', req)
        for await (const chunk of stream) {
          if (controller.signal.aborted) break
          target.send(IPC_CANNELS.AI_CHUNK, chunk as ChatChunk)
        }
      } catch (err: any) {
        target.send(IPC_CANNELS.AI_CHUNK, {
          conversationId: req.conversationId,
          delta: '',
          error: String(err),
          done: true
        })
      } finally {
        target.send(IPC_CANNELS.AI_CHUNK, { conversationId: req.conversationId, delta: '', done: true })
        activeControllers.delete(req.conversationId)
      }
    })()

    return { ok: true, conversationId: req.conversationId }
  })

  ipcMain.handle(IPC_CANNELS.AI_CANCEL, async (_e, conversationId: string) => {
    activeControllers.get(conversationId)?.abort()
    activeControllers.delete(conversationId)
    return { ok: true }
  })
}
