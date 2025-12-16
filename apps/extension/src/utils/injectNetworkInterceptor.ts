import { handleResponseData } from './responseHandlers'
import { requestModifiers } from './requestHandlers'

export function injectNetworkInterceptor() {
  console.log('injectNetworkInterceptor')

  // /bg/quick/api/merchant/msgBox/unreadMsgDetail
  // /bg/detroit/api/infoTicket/searchTicket  信息票数量接口

  // /visage-agent-seller/product/origin/todo/pageQuery
  // /visage-agent-seller/product/notAllEu/pageQuery
  // /visage-agent-seller/product/skc/countStatus
  // /visage-agent-seller/product/statisticsData
  // /visage-agent-seller/product/prop/adjust/task/count
  // /visage-agent-seller/product/prop/adjust/task/pageQuery
  // /visage-agent-seller/product/skc/pageQuery ok

  // /lich-mms/product/sku/accessories/toFill/stat
  // /lich-mms/product/sku/packing/quality/opt/task/pageQuery
  // /lich-mms/product/sku/packingOptTask/pageQuery
  // /lich-mms/audit/edit/task/product/pageQuery
  // /lich-mms/product/sku/accessories/pg/toFill/stat
  // /lich-mms/product/guideFile/todoTotal
  // /lich-mms/product/sku/classification/adjust/stat

  // /api/kiana/mms/gmp/bg/magneto/api/privilege/query-privilege-count
  // /api/kiana/gamblers/marketing/coupon/queryInvitationGoodsCouponCount
  // /api/seller/auth/userInfo ok
  // /api/seller/full/flow/analysis/mall/summary // 商品流量 -> 店铺数据汇总
  // /api/seller/full/flow/analysis/goods/list // 商品流量 -> 商品明细
  // /api/seller/full/flow/analysis/mall/list // 店铺流量

  // /agora/conv/needReplyCount
  // /bg-luna-mms/goods/quality/optimize/order/wait/optimize/count

  // function handleTemuResponse(data: any) {
  //   const url = data.url
  //   const body = data.responseBody
  //   const success= body.success
  //   const result = body.result

  //   if (!success) {
  //     return
  //   }

  //   if (url.includes("/api/seller/auth/userInfo")) {
  //     try {
  //       const userInfo = result;

  //       console.log('userInfo: ', userInfo)

  //       sessionStorage.setItem('bx-temu-user-info', JSON.stringify(userInfo));
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   if (url.includes('/visage-agent-seller/product/skc/pageQuery')) {
  //     try {
  //       const pageItems = result.pageItems
  //       const total = result.total
  //       console.log('data: ', data)
  //       console.log('pageItems: ', pageItems)
  //       console.log('total: ', total)

  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }

  function processRequestBody(url: string, body: any) {
    const modifier = requestModifiers.find((m) => m.match(url))
    if (!modifier || !body) return body

    try {
      let data
      let isString = false
      if (typeof body === 'string') {
        try {
          data = JSON.parse(body)
          isString = true
        } catch {
          return body
        }
      } else {
        data = body
      }

      const modifiedData = modifier.action(data)
      return isString ? JSON.stringify(modifiedData) : modifiedData
    } catch (error) {
      console.error('Process request body error', error)
      return body
    }
  }

  function setRequestProxy() {
    console.log('setRequestProxy')

    const win = window as any

    // 避免重复注入
    if (win.__WEFLY_NETWORK_INTERCEPTOR_INJECTED__) {
      return
    }
    win.__WEFLY_NETWORK_INTERCEPTOR_INJECTED__ = true

    // 保存原始的fetch和XMLHttpRequest
    const originalFetch = window.fetch
    const originalXMLHttpRequest = window.XMLHttpRequest

    /**
     * 重写fetch API
     */
    win.fetch = async function (...args: any) {
      try {
        let urlToCheck = ''
        if (typeof args[0] === 'string') {
          urlToCheck = args[0]
        } else if (args[0] && typeof args[0] === 'object' && 'url' in args[0]) {
          urlToCheck = args[0].url
        }

        if (urlToCheck && requestModifiers.some((m) => m.match(urlToCheck))) {
          if (typeof args[0] === 'string') {
            // usage: fetch(url, config)
            if (args[1] && args[1].body) {
              args[1].body = processRequestBody(urlToCheck, args[1].body)
            }
          } else if (args[0] && typeof args[0].clone === 'function') {
            // usage: fetch(Request)
            // Need to clone to read body, but modifying Request body is complex as it is immutable.
            // We construct a new Request.
            try {
              const clone = args[0].clone()
              const text = await clone.text()
              const newBody = processRequestBody(urlToCheck, text)
              args[0] = new Request(args[0], { body: newBody })
            } catch (e) {
              console.error('rewrite request body fail', e)
            }
          }
        }
      } catch (e) {
        console.error('interceptor pre-check fail', e)
      }

      const [resource, config] = args
      const originalRequest = typeof resource === 'string' ? new Request(resource, config) : resource
      const url = originalRequest.url
      const method = originalRequest.method

      let requestCloneForLogging = null
      let requestBody = null

      // 只对可读的 body 类型进行捕获（并且只在有 body 的时候）
      if (['PATCH', 'POST', 'PUT'].includes(method.toUpperCase()) && originalRequest.headers.get('Content-Type')) {
        try {
          // 👉 克隆 request，用于提取 body
          requestCloneForLogging = originalRequest.clone()

          const contentType = requestCloneForLogging.headers.get('content-type') || ''
          const bodyText = await requestCloneForLogging.text() // 消耗克隆流

          if (contentType.includes('application/json')) {
            requestBody = JSON.parse(bodyText)
          } else if (contentType.includes('x-www-form-urlencoded')) {
            requestBody = '[URLEncoded]'
            // 可选：解析为对象 new URLSearchParams(bodyText)
          } else if (contentType.includes('multipart/form-data')) {
            requestBody = '[FormData]'
            // 注意：FormData 无法直接展开，除非你知道字段名
          } else if (contentType.includes('text/')) {
            requestBody = bodyText
          } else {
            requestBody = '[Binary Data]'
          }
        } catch (err: any) {
          requestBody = `[Read Body Failed: ${err?.message}]`
        }
      } else {
        requestBody = null // GET/HEAD 等无 body
      }

      let response

      try {
        // 调用原始fetch
        response = await originalFetch.apply(win, args)
        // 克隆响应以便读取响应体
        const responseClone = response.clone()

        // 尝试获取响应体
        let responseBody = null
        try {
          const contentType = response.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            responseBody = await responseClone.json()
          } else if (contentType.includes('text/')) {
            responseBody = await responseClone.text()
          } else {
            responseBody = '[Binary Data]'
          }
        } catch (error) {
          console.error(error)
          responseBody = '[Parse Response Body Fail]'
        }

        handleResponseData({
          method,
          requestBody,
          requestHeaders: Object.fromEntries(originalRequest.headers.entries()),
          responseBody,
          responseStatus: response.status,
          responseStatusText: response.statusText,
          timestamp: Date.now(),
          type: 'fetch',
          url,
        })

        return response
      } catch (error) {
        if (url.includes('chrome-extension://') || url.includes('127.0.0.1')) {
          // 忽略扩展和本地资源的报错
          return
        }
        console.error('❌ [fetch拦截] 请求失败:', url, error)
        throw error // ❗必须 re-throw，保持原始行为
      }
    }

    /**
     * 重写XMLHttpRequest
     */
    win.XMLHttpRequest = function () {
      const xhr: any = new originalXMLHttpRequest()
      const originalOpen = xhr.open
      const originalSend = xhr.send
      const originalSetRequestHeader = xhr.setRequestHeader

      const requestData: any = {
        body: null,
        headers: {},
        method: '',
        url: '',
      }

      // 重写open方法
      xhr.open = function (method: any, url: any, async: any, user: any, password: any) {
        requestData.method = method
        requestData.url = url
        return originalOpen.call(this, method, url, async, user, password)
      }

      // 重写setRequestHeader方法
      xhr.setRequestHeader = function (header: any, value: any) {
        requestData.headers[header] = value
        return originalSetRequestHeader.call(this, header, value)
      }

      // 重写send方法
      xhr.send = function (body: any) {
        if (requestData.url && requestModifiers.some((m) => m.match(requestData.url))) {
          body = processRequestBody(requestData.url, body)
        }
        requestData.body = body

        // 监听响应
        const originalOnReadyStateChange = xhr.onreadystatechange
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // 请求完成
            handleResponseData({
              method: requestData.method,
              requestBody: requestData.body,
              requestHeaders: requestData.headers,
              responseBody: xhr.responseText,
              responseStatus: xhr.status,
              responseStatusText: xhr.statusText,
              timestamp: Date.now(),
              type: 'xhr',
              url: requestData.url,
            })
          }

          // 调用原始的onreadystatechange
          if (originalOnReadyStateChange) {
            originalOnReadyStateChange.call(this)
          }
        }

        return originalSend.call(this, body)
      }

      return xhr
    }

    // 复制原始XMLHttpRequest的静态属性
    Object.setPrototypeOf(win.XMLHttpRequest, originalXMLHttpRequest)
    Object.setPrototypeOf(win.XMLHttpRequest.prototype, originalXMLHttpRequest.prototype)
  }

  setRequestProxy()
}
