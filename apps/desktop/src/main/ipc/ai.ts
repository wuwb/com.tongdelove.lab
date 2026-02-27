import { ipcMain, type WebContents } from 'electron'
import { IPC, type ChatChunk } from '../../shared/ipc'
import { createChatStream, type ChatStreamRequest, type ProviderName } from '../services/ai'

const activeControllers = new Map<string, AbortController>()

export function registerAiIpc(target: WebContents) {
  ipcMain.handle(IPC.AI.START, async (_e, req: ChatStreamRequest & { provider?: ProviderName }) => {
    const controller = new AbortController()
    activeControllers.set(req.conversationId, controller)
    ;(async () => {
      try {
        const stream = createChatStream(req.provider ?? 'mock', req)
        for await (const chunk of stream) {
          if (controller.signal.aborted) break
          target.send(IPC.AI.CHUNK, chunk as ChatChunk)
        }
      } catch (err: any) {
        target.send(IPC.AI.CHUNK, {
          conversationId: req.conversationId,
          delta: '',
          error: String(err),
          done: true
        })
      } finally {
        target.send(IPC.AI.CHUNK, { conversationId: req.conversationId, delta: '', done: true })
        activeControllers.delete(req.conversationId)
      }
    })()

    return { ok: true, conversationId: req.conversationId }
  })

  ipcMain.handle(IPC.AI.CANCEL, async (_e, conversationId: string) => {
    activeControllers.get(conversationId)?.abort()
    activeControllers.delete(conversationId)
    return { ok: true }
  })
}
