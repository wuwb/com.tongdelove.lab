/**
 * API 客户端封装
 * 用于与服务端进行交互，支持统一的错误处理和配置管理
 */

import type { ResponseData } from '../utils/url'

// API 配置接口
interface ApiConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

// API 响应接口
interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 默认配置
const DEFAULT_CONFIG: Required<ApiConfig> = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 全局配置
let globalConfig: ApiConfig = { ...DEFAULT_CONFIG }

/**
 * 设置 API 全局配置
 */
export function setApiConfig(config: Partial<ApiConfig>): void {
  globalConfig = { ...globalConfig, ...config }
}

/**
 * 获取 API 全局配置
 */
export function getApiConfig(): ApiConfig {
  return { ...globalConfig }
}

/**
 * 构建完整的请求 URL
 */
function buildUrl(endpoint: string): string {
  const baseURL = globalConfig.baseURL || DEFAULT_CONFIG.baseURL
  const cleanBaseURL = baseURL.replace(/\/$/, '')
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${cleanBaseURL}${cleanEndpoint}`
}

/**
 * 构建请求选项
 */
function buildRequestOptions(method: string, data?: any, customHeaders?: Record<string, string>): RequestInit {
  const headers = {
    ...DEFAULT_CONFIG.headers,
    ...globalConfig.headers,
    ...customHeaders,
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    options.body = JSON.stringify(data)
  }

  return options
}

/**
 * 处理响应
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type') || ''

  let data: any
  if (contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    return {
      success: false,
      error: data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`,
      data,
    }
  }

  return {
    success: true,
    data,
  }
}

/**
 * 发送 HTTP 请求（通用方法）
 */
async function request<T = any>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  const url = buildUrl(endpoint)
  const options = buildRequestOptions(method, data, customHeaders)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), globalConfig.timeout || DEFAULT_CONFIG.timeout)

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return await handleResponse<T>(response)
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: '请求超时',
      }
    }

    return {
      success: false,
      error: error?.message || '网络请求失败',
    }
  }
}

/**
 * GET 请求
 */
export async function apiGet<T = any>(
  endpoint: string,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, 'GET', undefined, customHeaders)
}

/**
 * POST 请求
 */
export async function apiPost<T = any>(
  endpoint: string,
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, 'POST', data, customHeaders)
}

/**
 * PUT 请求
 */
export async function apiPut<T = any>(
  endpoint: string,
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, 'PUT', data, customHeaders)
}

/**
 * PATCH 请求
 */
export async function apiPatch<T = any>(
  endpoint: string,
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, 'PATCH', data, customHeaders)
}

/**
 * DELETE 请求
 */
export async function apiDelete<T = any>(
  endpoint: string,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, 'DELETE', undefined, customHeaders)
}

/**
 * 发送响应数据到服务端存储
 * 用于分析目的
 */
export async function sendResponseDataToServer(data: ResponseData): Promise<void> {
  try {
    const response = await apiPost('/response-data', data)

    if (!response.success) {
      console.error('[API] 发送响应数据失败:', response.error)
      return
    }

    console.debug('[API] 响应数据已成功发送到服务端')
  } catch (error) {
    // 静默失败，不阻塞主流程
    console.error('[API] 发送响应数据异常:', error)
  }
}

/**
 * 批量发送响应数据到服务端
 */
export async function sendBatchResponseDataToServer(dataList: ResponseData[]): Promise<void> {
  if (!dataList || dataList.length === 0) {
    return
  }

  try {
    const response = await apiPost('/response-data/batch', { data: dataList })

    if (!response.success) {
      console.error('[API] 批量发送响应数据失败:', response.error)
      return
    }

    console.debug(`[API] 已成功批量发送 ${dataList.length} 条响应数据到服务端`)
  } catch (error) {
    console.error('[API] 批量发送响应数据异常:', error)
  }
}
