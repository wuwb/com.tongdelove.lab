# Auth共享包 - packages/auth

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **auth**

## 概述

**认证授权模块** - 基于NextAuth.js和Drizzle的多平台认证解决方案

## 技术栈

- **框架**: NextAuth.js 4.24.7, Next.js 14.2.3
- **数据库**: @tongdelove/db (Drizzle ORM)
- **适配器**: @auth/drizzle-adapter 1.0.1
- **环境变量**: @t3-oss/env-nextjs 0.10.0
- **验证**: Zod 3.23.8
- **类型**: TypeScript 5.4.5

## 目录结构

```
packages/auth/
├── src/
│   ├── index.ts                # 主入口
│   ├── index.rsc.ts            # React Server Components入口
│   ├── auth.config.ts          # NextAuth配置
│   ├── providers/              # 认证提供商
│   │   ├── github.ts           # GitHub OAuth
│   │   ├── google.ts           # Google OAuth
│   │   ├── credentials.ts      # 凭据认证
│   │   └── wechat.ts           # 微信登录
│   ├── middleware.ts           # 认证中间件
│   ├── session/                # 会话管理
│   │   ├── callbacks.ts        # 回调函数
│   │   └── session.ts          # 会话策略
│   ├── utils/                  # 工具函数
│   │   ├── get-server-auth-session.ts
│   │   └── auth.ts
│   └── types/                  # 类型定义
│       └── next-auth.d.ts
├── env.ts                      # 环境变量验证
├── package.json
└── tsconfig.json
```

## 认证配置

### auth.config.ts
```typescript
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { type DefaultSession } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import { db } from '@tongdelove/db'
import { users, accounts, sessions, verificationTokens } from '@tongdelove/db/schema'

// 扩展默认会话类型
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}

export default {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    // 凭据认证（用户名密码）
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // 验证用户凭据
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        // 验证密码（需要实现密码哈希验证）
        const isValid = await verifyPassword(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
}
```

### 环境变量验证 (env.ts)
```typescript
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      z.string().url()
    ),

    // GitHub OAuth
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),

    // Google OAuth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    // 客户端可访问的环境变量
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
```

## 认证提供商

### GitHub OAuth
```typescript
// src/providers/github.ts
import GitHubProvider from 'next-auth/providers/github'

export const githubProvider = GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
    }
  },
})
```

### 微信登录
```typescript
// src/providers/wechat.ts
import type { OAuthConfig, User } from 'next-auth/providers'

export default function WeChatProvider<P extends Record<string, any>>(
  options: OAuthConfig<P>
): OAuthConfig<P> {
  return {
    id: 'wechat',
    name: 'WeChat',
    type: 'oauth',
    authorization: {
      url: 'https://open.weixin.qq.com/connect/qrconnect',
      params: {
        scope: 'snsapi_login',
        response_type: 'code',
      },
    },
    token: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    userinfo: 'https://api.weixin.qq.com/sns/userinfo',
    clientId: process.env.WECHAT_CLIENT_ID!,
    clientSecret: process.env.WECHAT_CLIENT_SECRET!,
    profile(profile) {
      return {
        id: profile.openid,
        name: profile.nickname,
        email: profile.unionid,
        image: profile.headimgurl,
      }
    },
  }
}
```

## 认证Hook

### 在React中使用
```typescript
// src/hooks/use-auth.ts
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (provider: string, options?: any) => {
    await signIn(provider, {
      redirect: false,
      callbackUrl: '/dashboard',
      ...options,
    })
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const requireAuth = () => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return false
    }
    return true
  }

  return {
    session,
    status,
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
    requireAuth,
  }
}
```

### Server Components中使用
```typescript
// src/utils/get-server-auth-session.ts
import { getServerSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { authOptions } from '@/auth/auth.config'

export const getServerAuthSession = (req: any, res: any) => {
  return getServerSession(req, res, authOptions)
}
```

## 数据库集成

### Drizzle Schema
```typescript
// @tongdelove/db/schema/auth.ts
import { pgTable, text, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// 用户表
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: varchar('image', { length: 255 }),
  role: varchar('role', { length: 50 }).default('user').notNull(),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// 账户表
export const accounts = pgTable('accounts', {
  userId: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull(),
  type: varchar('type', { length: 255 }).$type<'oauth' | 'oidc' | 'email' | 'webauthn'>().notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 255 }),
})

// 会话表
export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// 验证令牌表
export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})
```

## 认证中间件

### middleware.ts
```typescript
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
})

export const config = {
  matcher: [
    /*
     * 匹配所有请求路径除了以下开头的：
     * - _next/static (静态文件)
     * - _next/image (图像优化)
     * - favicon.ico (favicon文件)
     * - public 文件夹中的文件
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth).*)',
  ],
}
```

## 认证页面

### 登录页
```typescript
// pages/auth/signin.tsx
import { signIn, getSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1>Sign In</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Sign In</button>

        <div className="flex gap-2">
          <button type="button" onClick={() => signIn('github')}>
            Sign in with GitHub
          </button>
          <button type="button" onClick={() => signIn('google')}>
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  )
}
```

## 依赖详情

### 核心依赖
```json
{
  "@auth/drizzle-adapter": "^1.0.1",         // Drizzle适配器
  "@tongdelove/db": "workspace:*",            // 数据库包
  "next-auth": "^4.24.7",                    // NextAuth.js
  "@t3-oss/env-nextjs": "^0.10.0",          // 环境变量验证
  "zod": "^3.23.8"                           // Zod验证
}
```

### Peer Dependencies
```json
{
  "react": "^18.3.1",                        // React
  "react-dom": "^18.3.1",
  "next": "^14.2.3",                        // Next.js
  "typescript": "^5.4.5"                     // TypeScript
}
```

## 环境变量

### 必需变量
```bash
# NextAuth配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 微信OAuth
```bash
WECHAT_CLIENT_ID=your-wechat-client-id
WECHAT_CLIENT_SECRET=your-wechat-client-secret
```

## 开发命令

```bash
# 代码质量
pnpm lint                                 # ESLint检查
pnpm lint . --fix                        # 自动修复
pnpm format                               # Prettier格式化
pnpm typecheck                            # TypeScript检查

# 清理
pnpm clean                                # 清理缓存
```

## 使用示例

### 在API路由中使用
```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import { authOptions } from '@/auth/auth.config'

export default NextAuth(authOptions)
```

### 在Server Component中使用
```typescript
// app/dashboard/page.tsx
import { getServerAuthSession } from '@/auth/utils/get-server-auth-session'

export default async function Dashboard() {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  )
}
```

### 在Client Component中使用
```typescript
// components/Profile.tsx
'use client'

import { useAuth } from '@/auth/hooks/use-auth'

export function Profile() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div>
      <img src={user.image || ''} alt={user.name || ''} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## 最佳实践

### 1. 安全
- 总是使用 `NEXTAUTH_SECRET` 环境变量
- 在生产环境使用 HTTPS
- 验证所有用户输入
- 实施适当的权限检查

### 2. 性能
- 使用 `getServerSession` 而不是 `getSession` 在服务器端
- 合理设置会话过期时间
- 使用 JWT 策略减少数据库查询

### 3. 用户体验
- 提供多种登录方式
- 清晰的错误消息
- 重定向到正确的页面
- 记住用户选择

### 4. 数据库
- 为用户表添加适当的索引
- 定期清理过期会话
- 监控认证失败尝试

## 常见问题

### Q: 如何添加自定义认证提供商？
A:
```typescript
import type { OAuthConfig } from 'next-auth/providers'

export default function CustomProvider(options: OAuthConfig<any>) {
  return {
    id: 'custom',
    name: 'Custom Provider',
    type: 'oauth',
    authorization: 'https://custom-provider.com/auth',
    token: 'https://custom-provider.com/token',
    userinfo: 'https://custom-provider.com/user',
    clientId: process.env.CUSTOM_CLIENT_ID!,
    clientSecret: process.env.CUSTOM_CLIENT_SECRET!,
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    },
  }
}
```

### Q: 如何实现角色权限控制？
A:
```typescript
// utils/permissions.ts
export const roles = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
} as const

export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    [roles.ADMIN]: 3,
    [roles.MODERATOR]: 2,
    [roles.USER]: 1,
  }

  return roleHierarchy[userRole as keyof typeof roleHierarchy] >=
         roleHierarchy[requiredRole as keyof typeof roleHierarchy]
}

// 使用
if (!hasRole(session.user.role, roles.ADMIN)) {
  throw new Error('Unauthorized')
}
```

### Q: 如何处理OAuth回调错误？
A:
```typescript
// 在 callbacks 中处理
callbacks: {
  async signIn({ user, account, profile }) {
    if (account?.provider === 'github') {
      // 验证GitHub邮箱
      if (!user.email) {
        return false
      }
    }
    return true
  },
}
```

## 相关资源

- [NextAuth.js文档](https://next-auth.js.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [OAuth 2.0](https://oauth.net/2/)

---

*最后更新: 2025-11-02*
