import { handleTemuResponse } from './temuHandler'
import { ResponseData } from '../url'
import { sendResponseDataToServer } from '@/lib/api'

type HandlerFunc = (data: ResponseData) => void | Promise<void>

const INTERCEPT_CONFIG: Record<string, { [path: string]: HandlerFunc }> = {
  'seller.kuajingmaihuo.com': {
    '/lollipop/gray/batchMatchBySupplierIdsWithMulGray': (data) => {
      handleTemuResponse(data)
    },
    default: (data) => {
      handleTemuResponse(data)
    },
  },
  'agentseller.temu.com': {
    '/lollipop/gray/batchMatchBySupplierIdsWithMulGray': (data) => {
      handleTemuResponse(data)
    },
    default: async (data) => {
      if (data.method === 'GET' && data.responseStatus === 200 && data.responseBody !== '') {
        // 发送到服务器
        await sendResponseDataToServer(data)
      }

      handleTemuResponse(data)
    },
  },
}

export async function handleResponseData(data: ResponseData) {
  const { url, path, host } = data
  if (/\.(js|css|png|jpg|gif|woff)$/i.test(url)) {
    console.debug('fetch拦截] 忽略资源文件')
    return
  }

  try {
    console.debug('debug data: ', data)
    console.log('handleResponseData: url, path, host ', url, path, host)
    const domainConfig = INTERCEPT_CONFIG[host]
    if (!domainConfig) {
      return
    }

    console.info(`✅ [拦截器] 识别到目标域名: ${host}`)

    const handler = domainConfig[path] || domainConfig['default']
    await handler?.(data)
  } catch (error) {
    console.error('拦截处理发生错误:', error)
  }
}
