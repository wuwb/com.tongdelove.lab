# 浏览器扩展模块 - apps/extension

## 导航

> 根目录 / [应用层](../CLAUDE.md#应用模块详解) / **extension**

## 概述

**浏览器插件** - 基于WXT框架的现代WebExtensions，支持Chrome、Firefox、Safari等多浏览器

## 技术栈

- **框架**: WXT 0.20.11 (WebExtensions工具链)
- **前端**: React 19.2.0, TypeScript 5.8.2
- **构建**: Vite, PostCSS, TailwindCSS
- **状态管理**: React Hooks, @tongdelove/hooks
- **UI**: @tongdelove/ui, Lucide Icons
- **数据**: @vlcn.io/crsqlite-wasm (SQLite WASM)
- **网络**: Axios

## 目录结构

```
apps/extension/
├── entrypoints/                 # 入口点
│   ├── background/              # 后台脚本
│   │   ├── index.ts             # 后台入口
│   │   └── service-worker.ts    # Service Worker
│   ├── content/                 # 内容脚本
│   │   ├── index.ts             # 内容脚本入口
│   │   └── injected.ts          # 注入脚本
│   ├── popup/                   # 弹窗页面
│   │   ├── App.tsx              # 弹窗应用
│   │   ├── main.tsx             # 弹窗入口
│   │   └── usePopup.ts          # 弹窗Hook
│   ├── options/                 # 选项页
│   ├── devtools/                # 开发者工具
│   └── get-started/             # 引导页
├── src/
│   ├── components/              # React组件
│   ├── hooks/                   # 自定义Hooks
│   ├── utils/                   # 工具函数
│   │   ├── storage.ts           # 存储工具
│   │   ├── url.ts               # URL工具
│   │   ├── utils.ts             # 通用工具
│   │   ├── injectNetworkInterceptor.ts # 网络拦截
│   │   └── responseHandlers/    # 响应处理器
│   │       ├── index.ts
│   │       └── temuHandler.ts   # Temu平台处理器
│   ├── pages/                   # 页面组件
│   └── types/                   # TypeScript类型
├── public/                      # 静态资源
├── wxt.config.ts                # WXT配置
├── package.json
└── tsconfig.json
```

## 功能特性

### 支持的电商平台
- **1688**: 阿里巴巴批发网商品助手
- **Temu**: 拼多多国际版购物助手
- **Github**: GitHub平台增强

### 核心功能
1. **商品信息提取**
   - 自动识别商品标题、价格、规格
   - 批量数据采集
   - 价格对比

2. **网络请求拦截**
   - 拦截API请求
   - 响应数据处理
   - 实时数据同步

3. **本地数据存储**
   - SQLite (WASM) 数据库
   - 本地缓存
   - 离线支持

## WXT配置

### wxt.config.ts
```typescript
import { defineConfig } from 'wxt'

export default defineConfig({
  // 构建配置
  build: {
    // 排除的依赖
    exclude: ['@types/chrome'],
  },

  // 开发配置
  dev: {
    // 浏览器启动配置
    browser: 'chrome',
    // 开启调试
    debug: true,
  },

  // 清单文件配置
  manifest: {
    description: '支持1688、Temu等平台的浏览器助手',
    host_permissions: [
      'https://*.1688.com/*',
      'https://*.temu.com/*',
      'https://github.com/*',
    ],
    name: '电商助手',
    version: '0.0.0',
  },

  modules: ['@wxt-dev/module-react'],

  // 输出配置
  output: {
    // 目录
    dir: 'dist',
    // 打包格式
    format: 'zip',
  },

  // 权限配置
  permissions: [
    'storage',
    'activeTab',
    'scripting',
    'declarativeNetRequest',
    'notifications',
  ],
})
```

## 入口点详解

### 1. 弹窗入口 (popup)

#### App.tsx
```typescript
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function App() {
  const [isActive, setIsActive] = useState(false)
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null)

  useEffect(() => {
    // 获取当前标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentTab(tabs[0])
      // 检查是否在支持的平台
      const url = tabs[0].url || ''
      setIsActive(isSupportedPlatform(url))
    })
  }, [])

  const handleExtract = () => {
    // 向内容脚本发送消息
    chrome.tabs.sendMessage(currentTab!.id!, { action: 'extractProduct' })
  }

  return (
    <div className="w-80 p-4">
      <Card>
        <CardHeader>
          <CardTitle>电商助手</CardTitle>
        </CardHeader>
        <CardContent>
          {isActive ? (
            <Button onClick={handleExtract}>提取商品信息</Button>
          ) : (
            <p>当前页面不支持</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function isSupportedPlatform(url: string): boolean {
  return (
    url.includes('1688.com') ||
    url.includes('temu.com') ||
    url.includes('github.com')
  )
}
```

#### usePopup.ts
```typescript
import { useEffect, useState } from 'react'

export function usePopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  // 向内容脚本发送消息
  const sendMessage = (tabId: number, message: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        }
        else {
          resolve(response)
        }
      })
    })
  }

  // 获取当前标签页
  const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
    return new Promise((resolve) => {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        tabs => resolve(tabs[0])
      )
    })
  }

  return {
    error,
    getCurrentTab,
    isLoading,
    sendMessage,
    setError,
    setIsLoading,
  }
}
```

### 2. 内容脚本 (content)

#### index.ts
```typescript
import { injectNetworkInterceptor } from '@/utils/injectNetworkInterceptor'
import { handleTemuResponse } from '@/utils/responseHandlers/temuHandler'

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'enableInterceptor':
      injectNetworkInterceptor()
      sendResponse({ success: true })
      break

    case 'extractProduct':
      extractProductInfo()
      sendResponse({ success: true })
      break
  }
  return true
})

// 提取商品信息
function extractProductInfo() {
  const productInfo = {
    images: [] as string[],
    price: '',
    specs: {} as Record<string, string>,
    title: '',
  }

  // 根据不同平台提取信息
  if (window.location.hostname.includes('1688.com')) {
    // 1688平台提取逻辑
    const titleEl = document.querySelector('.product-title')
    if (titleEl) {
      productInfo.title = titleEl.textContent?.trim() || ''
    }
  }
  else if (window.location.hostname.includes('temu.com')) {
    // Temu平台提取逻辑
    handleTemuResponse(document)
  }

  // 保存到本地存储
  chrome.storage.local.set({ lastExtractedProduct: productInfo })
}

// 页面加载完成后注入拦截器
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectNetworkInterceptor()
  })
}
else {
  injectNetworkInterceptor()
}
```

#### injectNetworkInterceptor.ts
```typescript
// 网络请求拦截器
export function injectNetworkInterceptor() {
  // 拦截 fetch
  const originalFetch = window.fetch
  window.fetch = async (...args) => {
    const response = await originalFetch(...args)

    // 处理响应
    processResponse(response)

    return response
  }

  // 拦截 XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url) {
    this.addEventListener('load', () => {
      processResponse(this.responseText)
    })
    originalXHROpen.apply(this, arguments)
  }
}

async function processResponse(response: Response | string) {
  try {
    // 解析JSON响应
    const data = typeof response === 'string'
      ? JSON.parse(response)
      : await response.clone().json()

    // 根据URL判断平台并处理
    const url = typeof response === 'string'
      ? ''
      : response.url

    if (url.includes('temu.com')) {
      handleTemuData(data)
    }
    else if (url.includes('1688.com')) {
      handle1688Data(data)
    }
  }
  catch (error) {
    console.error('Failed to process response:', error)
  }
}
```

### 3. 后台脚本 (background)

#### index.ts
```typescript
import { defineBackgroundScript } from 'wxt/background'

export default defineBackgroundScript(() => {
  // 监听扩展安装
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      // 打开引导页
      chrome.tabs.create({
        url: chrome.runtime.getURL('get-started/index.html')
      })
    }
  })

  // 监听标签页更新
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // 检查是否在支持的平台
      if (isSupportedPlatform(tab.url || '')) {
        // 可以在这里更新扩展图标或状态
        chrome.action.setBadgeText({
          tabId,
          text: 'ON'
        })
      }
    }
  })
})

function isSupportedPlatform(url: string): boolean {
  return (
    url.includes('1688.com')
    || url.includes('temu.com')
    || url.includes('github.com')
  )
}
```

## 依赖详情

### 核心依赖
```json
{
  "wxt": "^0.20.11", // WebExtensions框架
  "@wxt-dev/module-react": "^1.1.5", // React集成
  "@types/chrome": "^0.1.24" // Chrome API类型
}
```

### 前端依赖
```json
{
  "react": "^19.2.0", // React 19
  "react-dom": "^19.2.0",
  "@emotion/react": "^11.14.0", // CSS-in-JS
  "lucide-react": "^0.439.0", // 图标库
  "react-icons": "^5.5.0" // 更多图标
}
```

### 数据处理
```json
{
  "@vlcn.io/crsqlite-wasm": "^0.16.0", // SQLite WASM
  "axios": "^1.12.2", // HTTP客户端
  "class-variance-authority": "^0.7.0", // 样式变体
  "clsx": "^2.1.1" // 类名工具
}
```

### 自有包
```json
{
  "@tongdelove/hooks": "workspace:*", // 自定义Hooks
  "@tongdelove/schema": "workspace:*", // 数据模型
  "@tongdelove/ui": "workspace:*", // UI组件
  "@tongdelove/utils": "workspace:*", // 工具函数
  "@tongdelove/typescript-config": ":*" // TS配置
}
```

### 构建工具
```json
{
  "typescript": "^5.8.2", // TypeScript
  "tailwindcss": "^3.4.4", // 样式框架
  "postcss": "^8.5.6", // CSS处理
  "autoprefixer": "^10.4.19", // 自动前缀
  "vite-plugin-remove-console": "^2.2.0" // 移除console
}
```

## 开发命令

```bash
# 开发模式
pnpm dev                               # 启动开发服务器

# 构建
pnpm build:dev                         # 开发构建
pnpm build                             # 生产构建
pnpm zip                               # 打包为ZIP

# 代码质量
pnpm compile                           # TypeScript编译检查
pnpm lint                              # ESLint检查
pnpm lint . --fix                      # 自动修复
```

## 平台适配

### 1688平台适配

#### 数据提取
```typescript
// 提取1688商品信息
export function extract1688Product(element: Document | Element) {
  return {
    images: extractImages(element),
    minOrder: extractMinOrder(element),
    platform: '1688',
    price: extractPrice(element),
    specifications: extractSpecifications(element),
    supplier: extractSupplierInfo(element),
    title: extractTitle(element),
  }
}

function extractPrice(element: Document | Element): string {
  const priceEl = element.querySelector('.price')
  return priceEl?.textContent?.trim() || ''
}

function extractTitle(element: Document | Element): string {
  return element.querySelector('.product-title')?.textContent?.trim() || ''
}
```

### Temu平台适配

#### 响应处理器
```typescript
export function extractTemuProduct(document: Document) {
  return {
    images: extractImages(document),
    platform: 'temu',
    price: document.querySelector('[data-testid="product-price"]')?.textContent?.trim(),
    rating: document.querySelector('[data-testid="product-rating"]')?.textContent?.trim(),
    title: document.querySelector('[data-testid="product-title"]')?.textContent?.trim(),
  }
}

// utils/responseHandlers/temuHandler.ts
export function handleTemuResponse(document: Document) {
  // 监听网络请求
  const observer = new MutationObserver(() => {
    const productData = extractTemuProduct(document)
    if (productData) {
      // 保存数据
      chrome.storage.local.set({ temuProduct: productData })
      // 发送通知
      chrome.notifications.create({
        iconUrl: 'icon.png',
        message: `已提取 ${productData.title} 的信息`,
        title: '商品信息已提取',
        type: 'basic',
      })
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  return observer
}
```

## 本地存储

### 存储管理
```typescript
export interface ExtensionSettings {
  autoExtract: boolean
  dataRetention: number // 天数
  notifications: boolean
}

export interface ProductInfo {
  extractedAt: number
  id: string
  images: string[]
  platform: '1688' | 'github' | 'temu'
  price?: string
  title: string
  url: string
}

// utils/storage.ts
export interface StorageData {
  extractedProducts: ProductInfo[]
  lastSyncTime?: number
  settings: ExtensionSettings
}

class StorageManager {
  // 清除过期数据
  async cleanExpiredData(): Promise<void> {
    const data = await this.getStorage()
    const now = Date.now()
    const retentionDays = data.settings.dataRetention
    const maxAge = retentionDays * 24 * 60 * 60 * 1000

    data.extractedProducts = data.extractedProducts.filter(
      product => now - product.extractedAt < maxAge
    )

    await chrome.storage.local.set({ extractedProducts: data.extractedProducts })
  }

  // 获取所有商品
  async getProducts(): Promise<ProductInfo[]> {
    const data = await this.getStorage()
    return data.extractedProducts
  }

  // 保存商品信息
  async saveProduct(product: ProductInfo): Promise<void> {
    const data = await this.getStorage()
    data.extractedProducts.push(product)
    await chrome.storage.local.set({ extractedProducts: data.extractedProducts })
  }

  private async getStorage(): Promise<StorageData> {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, (items) => {
        resolve({
          extractedProducts: items.extractedProducts || [],
          settings: items.settings || {
            autoExtract: true,
            dataRetention: 30,
            notifications: true,
          },
        })
      })
    })
  }
}

export const storageManager = new StorageManager()
```

## 部署流程

### 1. 开发调试
```bash
# 启动开发模式
pnpm dev

# 在Chrome中加载
# 1. 打开 chrome://extensions/
# 2. 开启"开发者模式"
# 3. 点击"加载已解压的扩展程序"
# 4. 选择 dist/chrome-mv3-dev 目录
```

### 2. 构建生产版本
```bash
# 构建
pnpm build

# 打包
pnpm zip
```

### 3. 发布到Chrome Web Store
1. 压缩 `dist/chrome-mv3-prod` 目录为ZIP
2. 登录Chrome Web Store开发者控制台
3. 上传ZIP文件并填写信息
4. 提交审核

### 4. 发布到Firefox Add-ons
```bash
# Firefox构建
npx wxt build --browser firefox

# 上传到 https://addons.mozilla.org/
```

## 最佳实践

### 1. 性能优化
- 避免在内容脚本中执行耗时操作
- 使用 `debounce` 减少DOM查询频率
- 及时清理事件监听器和观察器

### 2. 安全考虑
- 验证所有外部数据
- 避免XSS攻击
- 最小权限原则

### 3. 用户体验
- 提供清晰的状态反馈
- 优雅处理错误情况
- 遵循浏览器原生UI规范

### 4. 测试策略
- 在多个浏览器中测试
- 测试不同页面结构
- 模拟网络异常情况

## 常见问题

### Q: 如何调试内容脚本？
A:
```typescript
// 在内容脚本中
console.log('Content script loaded')
// 在后台脚本中
chrome.scripting.executeScript({
  func: () => console.log('Injected script'),
  target: { tabId: tab.id }
})
```

### Q: 如何处理动态加载的内容？
A: 使用 `MutationObserver`
```typescript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 检查新添加的节点
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // 处理新元素
        handleNewElement(node as Element)
      }
    })
  })
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})
```

### Q: 如何与页面原生JavaScript交互？
A: 通过注入自定义脚本
```typescript
// 在内容脚本中注入
const script = document.createElement('script')
script.textContent = `
  window.getPageData = () => {
    return {
      title: document.title,
      url: window.location.href
    }
  }
`
document.documentElement.appendChild(script)

// 调用
const data = (window as any).getPageData()
```

---

*最后更新: 2025-11-02*
