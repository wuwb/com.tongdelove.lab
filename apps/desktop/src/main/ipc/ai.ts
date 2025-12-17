import { ipcMain, type WebContents } from 'electron'
import { IPC, type ChatChunk, type ChatRequest } from '../../shared/ipc'
import { createChatStream } from '../services/ai'

const activeControllers = new Map<string, AbortController>()

export function registerAiIpc(target: WebContents) {
  ipcMain.handle(IPC.AI.START, async (_e, req: ChatRequest & { provider?: 'mock' | 'openai' | 'ollama' }) => {
    const controller = new AbortController()
    activeControllers.set(req.sessionId, controller)

    ;(async () => {
      try {
        const stream = createChatStream(req.provider ?? 'mock', req)
        for await (const chunk of stream) {
          if (controller.signal.aborted) break
          target.send(IPC.AI.CHUNK, chunk as ChatChunk)
        }
      } catch (err: any) {
        target.send(IPC.AI.CHUNK, { sessionId: req.sessionId, delta: '', error: String(err), done: true })
      } finally {
        target.send(IPC.AI.CHUNK, { sessionId: req.sessionId, delta: '', done: true })
        activeControllers.delete(req.sessionId)
      }
    })()

    return { ok: true, sessionId: req.sessionId }
  })

  ipcMain.handle(IPC.AI.CANCEL, async (_e, sessionId: string) => {
    activeControllers.get(sessionId)?.abort()
    activeControllers.delete(sessionId)
    return { ok: true }
  })
}