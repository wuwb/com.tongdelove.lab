/**
 * lab 访问 services/server 的统一 HTTP 客户端。
 *
 * lab 不再直连数据库，所有后端数据访问都经由此客户端转发到 services/server，
 * 从而实现前后端分离。
 */

/** server 基地址：默认本地开发端口 3000（与 services/server 的 configuration.ts 一致） */
const getBaseUrl = () =>
  process.env.LAB_API_SERVER_URL ??
  process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL ??
  'http://localhost:8001'

export class LabApiError extends Error {
  constructor(
    readonly url: string,
    readonly status: number,
    readonly payload?: unknown,
  ) {
    super(`'${url}' returned ${status}`)
    this.name = 'LabApiError'
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  /** 透传给后端的额外 header，例如登录态 token */
  headers?: Record<string, string>
  signal?: AbortSignal
}

const buildQuery = (params?: Record<string, unknown>) => {
  if (!params) return ''

  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    if (Array.isArray(value)) {
      // 与原 tRPC 入参语义保持一致：数组以逗号分隔
      search.append(key, value.join(','))
    } else {
      search.append(key, String(value))
    }
  }

  const query = search.toString()
  return query ? `?${query}` : ''
}

/**
 * services/server 的全局 TransformInterceptor 会把响应统一包成
 * `{ code, data, message, success }`，这里还原出原始数据。
 *
 * 注意：部分路由（如 POST）在拦截器之外还会再包一层，
 * 因此这里按层递归解包，直到不再命中信封结构。
 */
const unwrapServerEnvelope = <T>(payload: unknown): T => {
  let current = payload

  while (
    current &&
    typeof current === 'object' &&
    !Array.isArray(current) &&
    'code' in current &&
    'data' in current &&
    'success' in current
  ) {
    current = (current as { data: unknown }).data
  }

  return current as T
}

async function request<T>(
  path: string,
  { method = 'GET', body, headers, signal }: RequestOptions = {},
): Promise<T> {
  const url = `${getBaseUrl()}${path}${method === 'GET' ? buildQuery(body as Record<string, unknown>) : ''}`

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method === 'GET' ? undefined : JSON.stringify(body ?? {}),
    signal,
  })

  if (!response.ok) {
    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      payload = await response.text().catch(() => undefined)
    }
    throw new LabApiError(url, response.status, payload)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return unwrapServerEnvelope<T>(await response.json())
}

/** lab -> services/server 的 API 调用集合 */
export const labApi = {
  get: <T>(
    path: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) => request<T>(path, { method: 'GET', body: params, headers }),

  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'POST', body, headers }),

  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: 'PUT', body, headers }),

  del: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
}

export const labApiBaseUrl = getBaseUrl
