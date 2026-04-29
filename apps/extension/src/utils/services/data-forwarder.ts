interface ForwardConfig {
  apiEndpoint: string
  apiKey: string
  batchSize: number
  flushInterval: number
  maxRetries: number
  retryDelay: number
}

interface NetworkRequest {
  url: string
  method: string
  requestId?: string
  requestHeaders?: Record<string, any>
  requestBody?: any
  responseStatus: number
  responseText?: string
  responseHeaders?: Record<string, any>
  responseBody?: any
  capturedAt: Date
  requestType: 'fetch' | 'xhr'
  userAgent?: string
}

class DataForwarder {
  private config: ForwardConfig
  private queue: NetworkRequest[] = []
  private flushTimer: number | null = null
  private offlineQueue: NetworkRequest[] = []
  private isOnline: boolean = true

  constructor(config: ForwardConfig) {
    this.config = config
    this.initOnlineListener()
  }

  async send(data: NetworkRequest): Promise<void> {
    this.queue.push(data)

    if (this.queue.length >= this.config.batchSize) {
      await this.flush()
    }
  }

  async flush(): Promise<void> {
    if (this.queue.length === 0) return

    const batch = [...this.queue]
    this.queue = []

    if (this.flushTimer) {
      clearTimeout(this.flushTimer)
      this.flushTimer = null
    }

    try {
      await this.sendBatch(batch)
    } catch (error) {
      this.queue.unshift(...batch)
      this.saveToOfflineQueue(batch)
      throw error
    }
  }

  private async sendBatch(batch: NetworkRequest[], retryCount = 0): Promise<void> {
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
        },
        body: JSON.stringify({
          requests: batch.map(this.normalizeRequest),
          userId: await this.getUserId(),
          deviceId: await this.getDeviceId(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ 数据发送成功:', result)
    } catch (error) {
      console.error('❌ 数据发送失败:', error)

      if (retryCount < this.config.maxRetries) {
        await this.delay(this.config.retryDelay * (retryCount + 1))
        return this.sendBatch(batch, retryCount + 1)
      }

      throw error
    }
  }

  private normalizeRequest = (req: NetworkRequest): any => {
    return {
      url: req.url,
      method: req.method,
      requestId: req.requestId || this.generateRequestId(req),
      requestHeaders: this.sanitizeHeaders(req.requestHeaders),
      requestBody: this.sanitizeBody(req.requestBody),
      responseStatus: req.responseStatus,
      responseText: req.responseText,
      responseHeaders: this.sanitizeHeaders(req.responseHeaders),
      responseBody: this.sanitizeBody(req.responseBody),
      capturedAt: req.capturedAt.toISOString(),
      requestType: req.requestType,
      userAgent: req.userAgent || navigator.userAgent,
    }
  }

  private generateRequestId(req: NetworkRequest): string {
    return `${req.method}:${req.url}:${req.capturedAt.getTime()}`
  }

  private sanitizeHeaders(headers?: Record<string, any>): Record<string, any> | undefined {
    if (!headers) return undefined

    const sensitiveKeys = ['cookie', 'authorization', 'set-cookie']
    const sanitized = { ...headers }

    for (const key of Object.keys(sanitized)) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        delete sanitized[key]
      }
    }

    return sanitized
  }

  private sanitizeBody(body: any): any {
    if (!body) return undefined

    if (typeof body === 'string') {
      if (body.length > 10000) {
        return body.substring(0, 10000) + '...[TRUNCATED]'
      }
      return body
    }

    if (typeof body === 'object') {
      const str = JSON.stringify(body)
      if (str.length > 10000) {
        return '[Large Body Omitted]'
      }
      return body
    }

    return body
  }

  private async saveToOfflineQueue(batch: NetworkRequest[]): Promise<void> {
    this.offlineQueue.push(...batch)
    await this.persistOfflineQueue()
  }

  private async persistOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return

    await chrome.storage.local.set({
      offlineQueue: this.offlineQueue.slice(0, 1000),
    })
  }

  private async loadOfflineQueue(): Promise<void> {
    const result = await chrome.storage.local.get('offlineQueue')
    const queue = result.offlineQueue as NetworkRequest[] || []

    this.offlineQueue = queue

    if (queue.length > 0 && this.isOnline) {
      console.log(`🔄 恢复离线队列 (${queue.length} 条)`)
      await this.retryOfflineQueue()
    }
  }

  private async retryOfflineQueue(): Promise<void> {
    while (this.offlineQueue.length > 0 && this.isOnline) {
      const batch = this.offlineQueue.splice(0, this.config.batchSize)
      try {
        await this.sendBatch(batch)
        await this.persistOfflineQueue()
      } catch (error) {
        this.offlineQueue.unshift(...batch)
        console.error('离线队列重试失败，等待下次重试')
        break
      }
    }
  }

  private initOnlineListener(): void {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.retryOfflineQueue()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  private async getUserId(): Promise<string | undefined> {
    const result = await chrome.storage.local.get('userId')
    return result.userId as string | undefined
  }

  private async getDeviceId(): Promise<string | undefined> {
    const result = await chrome.storage.local.get('deviceId')
    if (!result.deviceId) {
      const deviceId = `dev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      await chrome.storage.local.set({ deviceId })
      return deviceId
    }
    return result.deviceId as string | undefined
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  startAutoFlush(): void {
    this.flushTimer = window.setInterval(() => {
      this.flush().catch((err) => {
        console.error('自动刷新失败:', err)
      })
    }, this.config.flushInterval)
  }

  stopAutoFlush(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
  }
}

export const dataForwarder = new DataForwarder({
  apiEndpoint: 'http://localhost:3001/api/temu-requests',
  apiKey: 'your-api-key',
  batchSize: 50,
  flushInterval: 5000,
  maxRetries: 3,
  retryDelay: 1000,
})
