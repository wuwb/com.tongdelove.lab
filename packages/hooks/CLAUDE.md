# React Hooks库 - packages/hooks

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **hooks**

## 概述

**自定义React Hooks库** - 提供项目中通用的React Hooks函数

## 技术栈

- **框架**: React 18.3.1
- **工具**: @tongdelove/utils
- **构建**: TypeScript 5.4.5
- **类型**: TypeScript

## 目录结构

```
packages/hooks/
├── src/
│   ├── useDebounce/            # 防抖Hook
│   │   ├── index.ts
│   │   └── useDebounce.ts
│   ├── useLocalStorage/        # 本地存储Hook
│   │   ├── index.ts
│   │   └── useLocalStorage.ts
│   ├── useSessionStorage/      # 会话存储Hook
│   ├── useAsync/               # 异步Hook
│   ├── useToggle/              # 切换Hook
│   ├── useClickOutside/        # 点击外部Hook
│   ├── useMediaQuery/          # 媒体查询Hook
│   ├── useScroll/              # 滚动Hook
│   ├── useIntersection/        # 交叉观察Hook
│   ├── useClipboard/           # 剪贴板Hook
│   ├── useCounter/             # 计数器Hook
│   ├── useEventListener/       # 事件监听Hook
│   ├── useDarkMode/            # 暗黑模式Hook
│   ├── useIsClient/            # 客户端检测Hook
│   └── index.ts                # 主入口
├── package.json
└── tsconfig.json
```

## 核心Hooks

### 1. useDebounce - 防抖Hook

```typescript
// src/useDebounce/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// 使用示例
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      performSearch(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

### 2. useLocalStorage - 本地存储Hook

```typescript
// src/useLocalStorage/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 获取存储的值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 设置值的函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// 使用示例
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  )
}
```

### 3. useAsync - 异步Hook

```typescript
// src/useAsync/useAsync.ts
import { useState, useEffect, useRef, useCallback } from 'react'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export function useAsync<T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isSuccess: false,
    isError: false,
  })

  const mountedRef = useRef(true)
  const asyncFunctionRef = useRef(asyncFunction)

  useEffect(() => {
    asyncFunctionRef.current = asyncFunction
  }, [asyncFunction])

  const execute = useCallback(async () => {
    setState({
      data: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    })

    try {
      const data = await asyncFunctionRef.current()
      if (mountedRef.current) {
        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        })
      }
      return data
    } catch (error) {
      if (mountedRef.current) {
        setState({
          data: null,
          error: error as E,
          isLoading: false,
          isSuccess: false,
          isError: true,
        })
      }
      throw error
    }
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
    return () => {
      mountedRef.current = false
    }
  }, [execute, immediate])

  return {
    ...state,
    execute,
  }
}

// 使用示例
function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, isLoading, execute } = useAsync(
    () => fetchUser(userId)
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={execute}>Refresh</button>
    </div>
  )
}
```

### 4. useToggle - 切换Hook

```typescript
// src/useToggle/useToggle.ts
import { useState } from 'react'

export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue((prevValue) => !prevValue)
  }

  return [value, toggle]
}

// 使用示例
function DropdownMenu() {
  const [isOpen, toggle] = useToggle()

  return (
    <div>
      <button onClick={toggle}>Toggle Menu</button>
      {isOpen && (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      )}
    </div>
  )
}
```

### 5. useClickOutside - 点击外部Hook

```typescript
// src/useClickOutside/useClickOutside.ts
import { useEffect, useRef } from 'react'

export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  return ref
}

// 使用示例
function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useClickOutside(onClose)

  if (!isOpen) return null

  return (
    <div className="modal">
      <div ref={modalRef} className="modal-content">
        <h2>Modal Content</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
```

### 6. useMediaQuery - 媒体查询Hook

```typescript
// src/useMediaQuery/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

// 使用示例
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  return (
    <div>
      {isMobile && <p>Mobile Layout</p>}
      {isTablet && !isMobile && <p>Tablet Layout</p>}
      {!isMobile && !isTablet && <p>Desktop Layout</p>}
    </div>
  )
}
```

### 7. useScroll - 滚动Hook

```typescript
// src/useScroll/useScroll.ts
import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    window.addEventListener('scroll', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition)
    }
  }, [])

  return scrollPosition
}

// 使用示例
function ScrollToTop() {
  const scrollY = useScroll()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        opacity: scrollY > 300 ? 1 : 0,
      }}
    >
      ↑ Top
    </button>
  )
}
```

### 8. useIntersection - 交叉观察Hook

```typescript
// src/useIntersection/useIntersection.ts
import { useState, useEffect, useRef } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersection(
  options: UseIntersectionOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsIntersecting(isIntersecting)

        if (isIntersecting && triggerOnce) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return [elementRef, isIntersecting]
}

// 使用示例
function LazyLoadImage({ src, alt }: { src: string; alt: string }) {
  const [imageRef, isVisible] = useIntersection({ triggerOnce: true })

  return (
    <div ref={imageRef}>
      {isVisible && <img src={src} alt={alt} />}
    </div>
  )
}
```

### 9. useClipboard - 剪贴板Hook

```typescript
// src/useClipboard/useClipboard.ts
import { useState, useCallback } from 'react'

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }, [])

  return { isCopied, copyToClipboard }
}

// 使用示例
function CopyButton({ text }: { text: string }) {
  const { isCopied, copyToClipboard } = useClipboard()

  return (
    <button onClick={() => copyToClipboard(text)}>
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  )
}
```

### 10. useCounter - 计数器Hook

```typescript
// src/useCounter/useCounter.ts
import { useState, useCallback } from 'react'

interface UseCounterOptions {
  min?: number
  max?: number
  step?: number
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): [number, () => void, () => void, (value: number) => void, () => void] {
  const { min = -Infinity, max = Infinity, step = 1 } = options
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount((prev) => Math.min(prev + step, max))
  }, [step, max])

  const decrement = useCallback(() => {
    setCount((prev) => Math.max(prev - step, min))
  }, [step, min])

  const set = useCallback((value: number) => {
    setCount(Math.max(min, Math.min(value, max)))
  }, [min, max])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  return [count, increment, decrement, set, reset]
}

// 使用示例
function Counter() {
  const [count, increment, decrement, set, reset] = useCounter(0, {
    min: 0,
    max: 10,
    step: 1,
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={() => set(5)}>Set to 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### 11. useEventListener - 事件监听Hook

```typescript
// src/useEventListener/useEventListener.ts
import { useEffect, useRef } from 'react'

type EventListenerOptions = {
  target?: EventTarget
  passive?: boolean
}

export function useEventListener<T extends Event>(
  type: string,
  handler: (event: T) => void,
  options: EventListenerOptions = {}
) {
  const savedHandler = useRef<(event: T) => void>()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = options.target || window
    const eventListener = (event: Event) => {
      savedHandler.current?.(event as T)
    }

    element.addEventListener(type, eventListener, {
      passive: options.passive,
    })

    return () => {
      element.removeEventListener(type, eventListener)
    }
  }, [type, options.target, options.passive])
}

// 使用示例
function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEventListener<FullscreenChangeEvent>('fullscreenchange', () => {
    setIsFullscreen(!!document.fullscreenElement)
  })

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <button onClick={toggleFullscreen}>
      {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </button>
  )
}
```

### 12. useDarkMode - 暗黑模式Hook

```typescript
// src/useDarkMode/useDarkMode.ts
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', JSON.stringify(true))
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', JSON.stringify(false))
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  return { isDarkMode, toggleDarkMode }
}

// 使用示例
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### 13. useIsClient - 客户端检测Hook

```typescript
// src/useIsClient/useIsClient.ts
import { useState, useEffect } from 'react'

export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

// 使用示例
function ClientOnly({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return <>{children}</>
}
```

## 主入口 (src/index.ts)

```typescript
export { useDebounce } from './useDebounce'
export { useLocalStorage } from './useLocalStorage'
export { useAsync, type AsyncState } from './useAsync'
export { useToggle } from './useToggle'
export { useClickOutside } from './useClickOutside'
export { useMediaQuery } from './useMediaQuery'
export { useScroll } from './useScroll'
export { useIntersection } from './useIntersection'
export { useClipboard } from './useClipboard'
export { useCounter } from './useCounter'
export { useEventListener } from './useEventListener'
export { useDarkMode } from './useDarkMode'
export { useIsClient } from './useIsClient'
```

## 依赖详情

### 核心依赖
```json
{
  "@tongdelove/utils": "workspace:^"               // 工具函数库
}
```

### 开发依赖
```json
{
  "@tongdelove/typescript-config": "workspace:^",  // TypeScript配置
  "@tongdelove/eslint-config": "workspace:^",      // ESLint配置
  "@types/react": "^18.3.3",                       // React类型
  "typescript": "^5.4.5"                           // TypeScript
}
```

### Peer依赖
```json
{
  "react": "^18.3.1"                               // React
}
```

## 开发命令

```bash
# 构建
pnpm build                              # 构建TypeScript
pnpm dev                                # 监听模式构建
pnpm prepare                            # 构建准备

# 代码质量
pnpm lint                               # ESLint检查
pnpm lint:eslint                        # ESLint检查
pnpm lint:prettier                      # Prettier检查
pnpm prettier                           # Prettier格式化

# 清理
pnpm clean                              # 清理dist目录
```

## 使用示例

### 在应用中使用
```typescript
// apps/web/src/hooks/useExample.ts
import { useDebounce, useLocalStorage } from '@tongdelove/hooks'

export function useExample() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [userPreferences, setUserPreferences] = useLocalStorage('preferences', {
    theme: 'light',
    language: 'en',
  })

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    userPreferences,
    setUserPreferences,
  }
}
```

### 自定义Hook
```typescript
// 创建自定义Hook
import { useState, useEffect } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}
```

## 最佳实践

### 1. 性能优化
- 使用 `useRef` 存储回调函数避免重复渲染
- 使用 `useCallback` 和 `useMemo` 优化计算
- 合理使用依赖数组

### 2. 错误处理
- 提供默认状态
- 优雅处理异常情况
- 提供清晰的错误信息

### 3. 类型安全
- 完整定义TypeScript类型
- 导出相关类型
- 支持泛型

### 4. 可复用性
- 保持Hook的单一职责
- 提供合理的默认值
- 支持配置选项

## 常见问题

### Q: 如何测试自定义Hook？
A:
```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from '@tongdelove/hooks'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current[1]() // increment
  })

  expect(result.current[0]).toBe(1)
})
```

### Q: 如何避免Hook的无限循环？
A: 确保依赖数组正确，避免在依赖数组中包含不稳定的值：
```typescript
// ❌ 错误
useEffect(() => {
  doSomething(value.someFunction())
}, [value.someFunction])

// ✅ 正确
const stableFunction = useCallback(() => {
  return value.someFunction()
}, [value])
useEffect(() => {
  doSomething(stableFunction())
}, [stableFunction])
```

## 相关资源

- [React Hooks文档](https://react.dev/reference/react)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

---

*最后更新: 2025-11-02*
