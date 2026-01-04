/**
 * @name 检查URL是否有效
 * @param {string} url 页面URL
 * @returns {boolean} 是否为有效URL
 */
export function isJSInjectionValidUrl(url: string) {
  const allowedDomains = ['baidu.com', 'juejin.cn', 'temu.com']

  const invalidProtocols = ['chrome://', 'chrome-extension://', 'moz-extension://', 'about:', 'data:', 'file:']

  // 检查是否为无效协议
  if (invalidProtocols.some((protocol) => url.startsWith(protocol))) {
    return false
  }

  // 检查是否为允许的域名
  if (allowedDomains.some((domain) => url.includes(domain))) {
    return true
  }

  return false
}

export interface ResponseData {
  method: string
  url: string
  host: string // 新增：域名，方便按域名分发
  path: string // 新增：路径，方便按路径分发
  searchParams: Record<string, string> // 新增：Query 参数
  requestBody: any
  requestHeaders: Record<string, string>
  responseBody: any
  responseStatus: number
  responseStatusText: string
  timestamp: number
  type: 'fetch' | 'xhr'
  originArgs: any[] // 新增：原始调用的参数，万一需要处理特殊配置
}

// 辅助函数：解析 URL 详情
function getUrlContext(urlStr: string) {
  try {
    const url = new URL(urlStr, window.location.origin)
    return {
      host: url.hostname,
      path: url.pathname,
      searchParams: Object.fromEntries(url.searchParams.entries())
    }
  } catch (e) {
    return { host: '', path: urlStr, searchParams: {} }
  }
}

/**
 * 核心：封装统一的拦截数据对象
 */
export function buildInterceptData(data: Partial<ResponseData>): ResponseData {
  const urlContext = getUrlContext(data.url || '')
  return {
    method: data.method || 'GET',
    url: data.url || '',
    host: urlContext.host,
    path: urlContext.path,
    searchParams: urlContext.searchParams,
    requestBody: data.requestBody,
    requestHeaders: data.requestHeaders || {},
    responseBody: data.responseBody,
    responseStatus: data.responseStatus || 0,
    responseStatusText: data.responseStatusText || '',
    timestamp: Date.now(),
    type: data.type as any,
    originArgs: data.originArgs || [],
  }
}
