import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '@/shared/ipc'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface OllamaModel {
  name: string
  modified_at: string
  size: number
  digest: string
  details?: {
    format: string
    families?: string[]
    parameter_size: string
    quantization_level: string
  }
}

export async function executeOllamaLs(): Promise<OllamaModel[] | null> {
  try {
    // 先尝试使用 --json 格式（如果支持）
    let stdout: string
    try {
      const result = await execAsync('ollama ls --json', {
        timeout: 10000
      })
      stdout = result.stdout
      const models = JSON.parse(stdout) as OllamaModel[]
      return models
    } catch (jsonErr) {
      // JSON 格式不支持，使用纯文本格式解析
      console.log('⚠️ ollama ls --json not supported, using text format')
      const result = await execAsync('ollama ls', {
        timeout: 10000
      })
      stdout = result.stdout

      // 解析文本格式
      const lines = stdout.trim().split('\n')
      const models: OllamaModel[] = []

      // 跳过标题行（包含 "NAME" 的行）
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        // 跳过空行、标题行和表头
        if (!line) continue
        if (
          line.startsWith('NAME') ||
          line.startsWith('ID') ||
          line.startsWith('SIZE') ||
          line.startsWith('MODIFIED')
        ) {
          continue
        }

        // 简单提取第一个非空白部分作为模型名称
        const parts = line.split(/\s+/)
        if (parts.length > 0 && parts[0]) {
          const modelName = parts[0]

          // 尝试解析其他字段（可选）
          const id = parts.length > 1 ? parts[1] : 'unknown'
          const sizeStr = parts.length > 2 ? parts[2] : '-'
          const dateStr = parts.slice(3).join(' ') || 'unknown'

          models.push({
            name: modelName,
            modified_at: dateStr,
            size: parseSize(sizeStr),
            digest: id
          })
        }
      }

      console.log(`📋 Parsed ${models.length} models from text format`)
      return models
    }
  } catch (error) {
    console.error('Failed to execute ollama ls:', error)
    return null
  }
}

// 解析大小字符串（如 "4.9 GB", "274 MB"）为字节数
function parseSize(sizeStr: string): number {
  if (sizeStr === '-' || !sizeStr.trim()) {
    return 0
  }

  const match = sizeStr.trim().match(/^(\d+(?:\.\d+)?)\s*([KMGT]?B)?$/i)
  if (!match) {
    return 0
  }

  const value = parseFloat(match[1])
  const unit = match[2]?.toUpperCase()

  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4
  }

  return value * (multipliers[unit] || 1)
}

export function registerOllamaIpc() {
  console.log('📝 Registering Ollama IPC handlers...')
  console.log('📝 Channel:', IPC_CHANNELS.OLLAMA_LIST_MODELS)

  ipcMain.handle(IPC_CHANNELS.OLLAMA_LIST_MODELS, async () => {
    console.log('🔍 Ollama LIST_MODELS called')
    const models = await executeOllamaLs()
    return models
  })

  console.log('✅ Ollama IPC handlers registered')
}
