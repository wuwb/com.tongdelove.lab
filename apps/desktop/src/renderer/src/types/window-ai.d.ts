declare global {
  interface Window {
    ai: {
      start: (req: import('../../../shared/ipc').ChatRequest & { provider?: 'mock' | 'openai' | 'ollama' }) => Promise<{ ok: boolean; sessionId: string }>
      cancel: (sessionId: string) => Promise<{ ok: boolean }>
      onChunk: (listener: (chunk: import('../../../shared/ipc').ChatChunk) => void) => () => void
    }
  }
}
export {}