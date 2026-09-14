type JsonpOptions = {
  /**
   * 约定的回调参数名
   * @default callback
   */
  jsonpCallback?: string
  /**
   * 超时时间，单位毫秒
   * @default 10000
   */
  timeout?: number
}

/**
 * 轻量 JSONP 实现。
 *
 * 天天基金网的基金搜索接口不支持 CORS，只能通过 JSONP 请求，
 * 原项目使用 fetch-jsonp，这里用等价的原生实现替代，避免为迁移一个页面引入新依赖。
 */
export function fetchJsonp<T = any>(
  url: string,
  options: JsonpOptions = {},
): Promise<T> {
  const { jsonpCallback = 'callback', timeout = 10000 } = options
  const callbackName = `jQuery_${Date.now()}`
  const globalScope = window as unknown as Record<string, unknown>

  return new Promise<T>((resolve, reject) => {
    const script = document.createElement('script')
    let timer: ReturnType<typeof setTimeout>

    const cleanUp = () => {
      clearTimeout(timer)
      delete globalScope[callbackName]
      script.parentNode?.removeChild(script)
    }

    timer = setTimeout(() => {
      cleanUp()
      reject(new Error(`[fetchJsonp] timeout: ${url}`))
    }, timeout)

    globalScope[callbackName] = (data: T) => {
      cleanUp()
      resolve(data)
    }

    script.onerror = () => {
      cleanUp()
      reject(new Error(`[fetchJsonp] network error: ${url}`))
    }

    script.src = `${url}${url.includes('?') ? '&' : '?'}${jsonpCallback}=${encodeURIComponent(callbackName)}`
    document.body.appendChild(script)
  })
}

export default fetchJsonp
