# Core-Lib共享包 - packages/core-lib

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **core-lib**

## 概述

**核心业务库** - 包含项目中通用的业务逻辑、工具和配置的共享核心包

## 技术栈

- **构建**: tsup 7.2.0, Vite 4.4.10, TypeScript 5.4.5
- **测试**: Vitest 1, Testing Library
- **工具**: @httpx/exception 2.1.1, dequal 2.0.3
- **类型**: TypeScript
- **质量**: ESLint, Prettier

## 目录结构

```
packages/core-lib/
├── src/
│   ├── config/                 # 配置文件
│   │   ├── app.config.ts       # 应用配置
│   │   ├── database.config.ts  # 数据库配置
│   │   └── env.config.ts       # 环境变量配置
│   ├── utils/                  # 工具函数
│   │   ├── array.utils.ts      # 数组工具
│   │   ├── object.utils.ts     # 对象工具
│   │   ├── date.utils.ts       # 日期工具
│   │   └── string.utils.ts     # 字符串工具
│   ├── constants/              # 常量定义
│   │   ├── app.constants.ts    # 应用常量
│   │   ├── api.constants.ts    # API常量
│   │   └── validation.constants.ts # 验证常量
│   ├── types/                  # 类型定义
│   │   ├── app.types.ts        # 应用类型
│   │   ├── api.types.ts        # API类型
│   │   └── common.types.ts     # 通用类型
│   ├── services/               # 核心服务
│   │   ├── storage.service.ts  # 存储服务
│   │   ├── logger.service.ts   # 日志服务
│   │   └── cache.service.ts    # 缓存服务
│   ├── guards/                 # 业务守卫
│   │   ├── auth.guard.ts       # 认证守卫
│   │   └── permission.guard.ts # 权限守卫
│   ├── interceptors/           # 拦截器
│   │   ├── logging.interceptor.ts # 日志拦截器
│   │   └── cache.interceptor.ts   # 缓存拦截器
│   ├── decorators/             # 装饰器
│   │   ├── public.decorator.ts # 公共路由装饰器
│   │   └── roles.decorator.ts  # 角色装饰器
│   ├── middlewares/            # 中间件
│   │   ├── auth.middleware.ts  # 认证中间件
│   │   └── cors.middleware.ts  # CORS中间件
│   └── index.ts                # 主入口
├── config/                     # 构建配置
├── tests/                      # 测试文件
├── vitest.config.ts            # Vitest配置
├── tsup.config.ts              # tsup配置
├── package.json
└── tsconfig.json
```

## 核心配置

### 应用配置 (src/config/app.config.ts)
```typescript
import { z } from 'zod'

export const appConfigSchema = z.object({
  appName: z.string(),
  appVersion: z.string(),
  appPort: z.number().int().positive(),
  appEnv: z.enum(['development', 'production', 'test']),
  appUrl: z.string().url(),
  apiUrl: z.string().url(),
  uploadPath: z.string(),
  maxFileSize: z.number().int().positive(),
  timezone: z.string(),
  locale: z.string(),
  debug: z.boolean(),
})

export type AppConfig = z.infer<typeof appConfigSchema>

export const appConfig: AppConfig = {
  appName: process.env.APP_NAME || 'Tongdelove',
  appVersion: process.env.APP_VERSION || '1.0.0',
  appPort: parseInt(process.env.APP_PORT || '3000', 10),
  appEnv: (process.env.NODE_ENV as any) || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  timezone: process.env.TZ || 'Asia/Shanghai',
  locale: process.env.LOCALE || 'zh-CN',
  debug: process.env.DEBUG === 'true',
}
```

### 数据库配置 (src/config/database.config.ts)
```typescript
export const databaseConfig = {
  // PostgreSQL配置
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || 'tongdelove',
  },

  // MySQL配置
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'tongdelove',
  },

  // MongoDB配置
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tongdelove',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Redis配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
}
```

### 环境变量配置 (src/config/env.config.ts)
```typescript
import { z } from 'zod'
import { appConfigSchema } from './app.config'

export const envConfigSchema = appConfigSchema.extend({
  // 数据库配置
  DATABASE_URL: z.string().url(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),

  // Redis配置
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string().optional(),

  // JWT配置
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRES_IN: z.string(),

  // OAuth配置
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // 微信配置
  WECHAT_APP_ID: z.string(),
  WECHAT_APP_SECRET: z.string(),
  WECHAT_TOKEN: z.string(),
  WECHAT_ENCODING_AES_KEY: z.string(),

  // 第三方服务
  SENDGRID_API_KEY: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_S3_BUCKET: z.string(),
})

export type EnvConfig = z.infer<typeof envConfigSchema>
```

## 核心工具函数

### 数组工具 (src/utils/array.utils.ts)
```typescript
export class ArrayUtils {
  /**
   * 数组分块
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  /**
   * 数组去重
   */
  static unique<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
      return [...new Set(array)]
    }
    const seen = new Set()
    return array.filter((item) => {
      const value = item[key]
      if (seen.has(value)) {
        return false
      }
      seen.add(value)
      return true
    })
  }

  /**
   * 数组扁平化
   */
  static flatten<T>(array: (T | T[])[]): T[] {
    return array.reduce<T[]>((acc, curr) => {
      if (Array.isArray(curr)) {
        acc.push(...curr)
      } else {
        acc.push(curr)
      }
      return acc
    }, [])
  }

  /**
   * 数组分组
   */
  static groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key])
      groups[groupKey] = groups[groupKey] || []
      groups[groupKey].push(item)
      return groups
    }, {} as Record<string, T[]>)
  }

  /**
   * 数组交集
   */
  static intersection<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2)
    return array1.filter((item) => set2.has(item))
  }

  /**
   * 数组差集
   */
  static difference<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2)
    return array1.filter((item) => !set2.has(item))
  }
}
```

### 对象工具 (src/utils/object.utils.ts)
```typescript
export class ObjectUtils {
  /**
   * 深度克隆
   */
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T
    }

    if (obj instanceof Array) {
      return obj.map((item) => this.deepClone(item)) as unknown as T
    }

    if (typeof obj === 'object') {
      const clonedObj = {} as { [key: string]: any }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key])
        }
      }
      return clonedObj as T
    }

    return obj
  }

  /**
   * 选择对象属性
   */
  static pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> {
    const result = {} as Pick<T, K>
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    return result
  }

  /**
   * 排除对象属性
   */
  static omit<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> {
    const result = { ...obj }
    keys.forEach((key) => {
      delete result[key]
    })
    return result
  }

  /**
   * 判断对象是否为空
   */
  static isEmpty(obj: unknown): boolean {
    if (obj == null) return true
    if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
    if (typeof obj === 'object') return Object.keys(obj).length === 0
    return false
  }

  /**
   * 合并对象
   */
  static merge(target: any, ...sources: any[]): any {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          this.merge(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }

    return this.merge(target, ...sources)
  }

  /**
   * 检查是否为对象
   */
  private static isObject(item: any): boolean {
    return item && typeof item === 'object' && !Array.isArray(item)
  }
}
```

### 日期工具 (src/utils/date.utils.ts)
```typescript
export class DateUtils {
  /**
   * 格式化日期
   */
  static format(
    date: Date | string | number,
    format: string = 'YYYY-MM-DD HH:mm:ss'
  ): string {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  }

  /**
   * 计算日期差
   */
  static diff(
    date1: Date | string | number,
    date2: Date | string | number,
    unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'milliseconds'
  ): number {
    const d1 = new Date(date1).getTime()
    const d2 = new Date(date2).getTime()
    const diff = d1 - d2

    const conversions = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
    }

    return Math.floor(diff / conversions[unit])
  }

  /**
   * 添加时间
   */
  static add(
    date: Date | string | number,
    amount: number,
    unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'milliseconds'
  ): Date {
    const d = new Date(date)
    const conversions = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
    }
    d.setTime(d.getTime() + amount * conversions[unit])
    return d
  }

  /**
   * 检查是否为今天
   */
  static isToday(date: Date | string | number): boolean {
    const today = new Date()
    const checkDate = new Date(date)
    return (
      today.getFullYear() === checkDate.getFullYear() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getDate() === checkDate.getDate()
    )
  }

  /**
   * 获取相对时间字符串
   */
  static relativeTime(date: Date | string | number): string {
    const now = new Date()
    const target = new Date(date)
    const diff = now.getTime() - target.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days}天前`
    } else if (hours > 0) {
      return `${hours}小时前`
    } else if (minutes > 0) {
      return `${minutes}分钟前`
    } else {
      return '刚刚'
    }
  }
}
```

### 字符串工具 (src/utils/string.utils.ts)
```typescript
export class StringUtils {
  /**
   * 生成随机字符串
   */
  static random(length: number = 8, charset: string = 'alphanumeric'): string {
    let chars = ''
    switch (charset) {
      case 'numeric':
        chars = '0123456789'
        break
      case 'alphabetic':
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        break
      case 'alphanumeric':
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        break
      default:
        chars = charset
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * 驼峰命名转换
   */
  static camelCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
  }

  /**
   * 短横线命名转换
   */
  static kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  /**
   * 下划线命名转换
   */
  static snakeCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase()
  }

  /**
   * 首字母大写
   */
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * 截断字符串
   */
  static truncate(str: string, length: number, suffix: string = '...'): string {
    if (str.length <= length) {
      return str
    }
    return str.slice(0, length) + suffix
  }

  /**
   * 去除空白字符
   */
  static trim(str: string, char: string = ' '): string {
    if (char === ' ') {
      return str.trim()
    }
    const regex = new RegExp(`^[${char}]+|[${char}]+$`, 'g')
    return str.replace(regex, '')
  }

  /**
   * 生成slug
   */
  static slug(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  /**
   * Base64编码
   */
  static base64Encode(str: string): string {
    return Buffer.from(str, 'utf8').toString('base64')
  }

  /**
   * Base64解码
   */
  static base64Decode(str: string): string {
    return Buffer.from(str, 'base64').toString('utf8')
  }

  /**
   * MD5哈希
   */
  static md5(str: string): string {
    const crypto = require('crypto')
    return crypto.createHash('md5').update(str).digest('hex')
  }

  /**
   * SHA256哈希
   */
  static sha256(str: string): string {
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(str).digest('hex')
  }
}
```

## 核心服务

### 存储服务 (src/services/storage.service.ts)
```typescript
export interface StorageService {
  get(key: string): Promise<any>
  set(key: string, value: any, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
  has(key: string): Promise<boolean>
}

export class LocalStorageService implements StorageService {
  private storage: Map<string, { value: any; expires?: number }> = new Map()

  async get(key: string): Promise<any> {
    const item = this.storage.get(key)
    if (!item) return null

    if (item.expires && Date.now() > item.expires) {
      this.storage.delete(key)
      return null
    }

    return item.value
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const expires = ttl ? Date.now() + ttl : undefined
    this.storage.set(key, { value, expires })
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key)
  }

  async clear(): Promise<void> {
    this.storage.clear()
  }

  async has(key: string): Promise<boolean> {
    const item = this.storage.get(key)
    if (!item) return false

    if (item.expires && Date.now() > item.expires) {
      this.storage.delete(key)
      return false
    }

    return true
  }
}

export class SessionStorageService implements StorageService {
  private storage: Map<string, { value: any; expires?: number }> = new Map()

  async get(key: string): Promise<any> {
    const item = this.storage.get(key)
    if (!item) return null

    if (item.expires && Date.now() > item.expires) {
      this.storage.delete(key)
      return null
    }

    return item.value
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const expires = ttl ? Date.now() + ttl : undefined
    this.storage.set(key, { value, expires })
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key)
  }

  async clear(): Promise<void> {
    this.storage.clear()
  }

  async has(key: string): Promise<boolean> {
    const item = this.storage.get(key)
    if (!item) return false

    if (item.expires && Date.now() > item.expires) {
      this.storage.delete(key)
      return false
    }

    return true
  }
}
```

### 日志服务 (src/services/logger.service.ts)
```typescript
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  metadata?: Record<string, any>
}

export class LoggerService {
  private logs: LogEntry[] = []
  private level: LogLevel = 'info'

  setLevel(level: LogLevel): void {
    this.level = level
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 }
    return levels[level] >= levels[this.level]
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      metadata,
    }

    this.logs.push(entry)

    // 控制台输出
    const output = `[${entry.timestamp.toISOString()}] ${level.toUpperCase()}: ${message}`
    if (metadata) {
      console[level](output, metadata)
    } else {
      console[level](output)
    }
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log('debug', message, metadata)
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log('warn', message, metadata)
  }

  error(message: string, error?: Error | Record<string, any>): void {
    if (error instanceof Error) {
      this.log('error', message, {
        error: error.message,
        stack: error.stack,
      })
    } else {
      this.log('error', message, error)
    }
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (!level) return this.logs
    return this.logs.filter((log) => log.level === level)
  }

  clear(): void {
    this.logs = []
  }
}
```

## 装饰器

### 公共路由装饰器 (src/decorators/public.decorator.ts)
```typescript
export function Public(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    Reflect.defineMetadata('isPublic', true, descriptor.value)
    return descriptor
  }
}

export function isPublic(target: any, propertyKey: string): boolean {
  return Reflect.getMetadata('isPublic', target[propertyKey])
}
```

### 角色装饰器 (src/decorators/roles.decorator.ts)
```typescript
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

export function hasRole(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole)
}
```

## 常量定义

### 应用常量 (src/constants/app.constants.ts)
```typescript
export const APP_CONSTANTS = {
  // 应用信息
  APP_NAME: 'Tongdelove',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Tongdelove Lab Application',

  // 响应状态码
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },

  // 响应消息
  RESPONSE_MESSAGES: {
    SUCCESS: '操作成功',
    ERROR: '操作失败',
    NOT_FOUND: '资源不存在',
    UNAUTHORIZED: '未授权访问',
    FORBIDDEN: '禁止访问',
    VALIDATION_ERROR: '数据验证失败',
  },

  // 分页默认值
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },

  // 文件上传
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  },
} as const
```

### API常量 (src/constants/api.constants.ts)
```typescript
export const API_CONSTANTS = {
  // 端点路径
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    },
    USERS: '/users',
    POSTS: '/posts',
    PRODUCTS: '/products',
    ORDERS: '/orders',
  },

  // HTTP头
  HEADERS: {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    ACCEPT: 'Accept',
    X_REQUEST_ID: 'X-Request-ID',
  },

  // 内容类型
  CONTENT_TYPES: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
    URL_ENCODED: 'application/x-www-form-urlencoded',
  },
} as const
```

## 依赖详情

### 核心依赖
```json
{
  "@httpx/exception": "^2.1.1",             // HTTP异常处理
  "dequal": "^2.0.3"                         // 深度比较
}
```

### 开发依赖
```json
{
  "@testing-library/dom": "9.3.3",           // DOM测试
  "@testing-library/react": "^14.2.1",       // React测试
  "@testing-library/user-event": "14.5.1",   // 用户事件测试
  "@vitest/coverage-v8": "0.34.3",           // 测试覆盖率
  "@vitejs/plugin-react": "4.1.0",           // React插件
  "npm-run-all": "4.1.5",                    // 运行脚本
  "rimraf": "5.0.5",                         // 清理工具
  "tsup": "7.2.0",                           // 打包工具
  "typescript": "^5.4.5",                    // TypeScript
  "vite": "4.4.10",                          // Vite
  "vite-tsconfig-paths": "4.2.1",            // 路径映射
  "vitest": "^1"                             // 测试框架
}
```

### Peer依赖
```json
{
  "react": "^18.3.1",                        // React
  "react-dom": "^18.3.1"                     // React DOM
}
```

## 开发命令

```bash
# 构建
pnpm build                                   # TypeScript编译（不执行tsup）
pnpm build:force                             # 强制构建（执行tsup）
pnpm dev                                     # 监听模式构建

# 测试
pnpm test                                    # 运行测试
pnpm test-unit                               # 单元测试
pnpm test-unit-watch                         # 监听模式测试

# 代码质量
pnpm lint                                    # ESLint检查
pnpm fix-all-files                           # 自动修复
pnpm typecheck                               # TypeScript检查

# 清理
pnpm clean                                   # 清理dist、coverage、缓存
```

## 构建配置

### tsup.config.ts
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  shims: true,
  external: ['react', 'react-dom'],
})
```

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
      ],
    },
  },
})
```

## 最佳实践

### 1. 工具函数设计
- 保持函数的纯函数特性
- 提供类型安全的接口
- 避免副作用

### 2. 性能优化
- 使用memoization缓存计算结果
- 避免在热路径中创建新对象
- 合理使用迭代而非递归

### 3. 错误处理
- 提供清晰的错误消息
- 使用适当的异常类型
- 记录详细错误信息

### 4. 测试策略
- 为每个工具函数编写测试
- 测试边界情况
- 模拟复杂的依赖

## 使用示例

### 在服务中使用
```typescript
import { LoggerService, ObjectUtils } from '@tongdelove/core-lib'

export class UserService {
  private logger = new LoggerService()

  async createUser(userData: any) {
    try {
      // 使用工具函数
      const cleanData = ObjectUtils.omit(userData, ['password'])

      // 使用日志
      this.logger.info('Creating user', { email: userData.email })

      // 创建逻辑
      return { success: true, data: cleanData }
    } catch (error) {
      this.logger.error('Failed to create user', error)
      throw error
    }
  }
}
```

### 在组件中使用
```typescript
import { ArrayUtils, StringUtils } from '@tongdelove/core-lib'

export function UserList({ users }: { users: any[] }) {
  // 使用工具函数
  const uniqueRoles = ArrayUtils.unique(users.map(u => u.role))
  const slugifiedRoles = uniqueRoles.map(role => StringUtils.slug(role))

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name} - {user.role}
        </div>
      ))}
    </div>
  )
}
```

## 相关资源

- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vitest文档](https://vitest.dev/)
- [tsup文档](https://tsup.egoist.dev/)

---

*最后更新: 2025-11-02*
