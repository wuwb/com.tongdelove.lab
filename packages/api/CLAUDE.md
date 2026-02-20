# API客户端包 - packages/api

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **api**

## 概述

**API客户端包** - 基于tRPC和Zod的端到端类型安全的API客户端

## 技术栈

- **框架**: tRPC 11.0.0-rc.334
- **序列化**: SuperJSON 2.2.1
- **验证**: Zod 3.23.8
- **集成**: @tongdelove/auth, @tongdelove/db, @tongdelove/validators
- **类型**: TypeScript 5.4.5

## 目录结构

```
packages/api/
├── src/
│   ├── client/                  # 客户端配置
│   │   ├── browser.ts           # 浏览器客户端
│   │   └── server.ts            # 服务器客户端
│   ├── routers/                 # tRPC路由
│   │   ├── auth.ts              # 认证路由
│   │   ├── user.ts              # 用户路由
│   │   ├── post.ts              # 文章路由
│   │   └── index.ts             # 路由聚合
│   ├── procedures/              # 公共过程
│   ├── types/                   # 类型定义
│   ├── context.ts               # 上下文配置
│   ├── index.ts                 # 主入口
│   └── utils/                   # 工具函数
│       ├── getBaseUrl.ts        # 获取基础URL
│       └── createCaller.ts      # 创建调用者
├── package.json
└── tsconfig.json
```

## tRPC配置

### 服务器端配置 (src/context.ts)
```typescript
import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@tongdelove/auth'

export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = await getServerSession(req, res, authOptions)

  return {
    session,
    req,
    res,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
```

### 路由聚合 (src/routers/index.ts)
```typescript
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { Context } from '../context'
import { authRouter } from './auth'
import { userRouter } from './user'
import { postRouter } from './post'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && 'zodError' in error.cause
            ? error.cause.zodError
            : null,
      },
    }
  },
})

// 基础中间件
export const middleware = t.middleware

// 认证中间件
export const isAuthenticated = middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user,
    },
  })
})

// 角色检查中间件
export const requireRole = (role: string) =>
  middleware(({ ctx, next }) => {
    if (ctx.session?.user?.role !== role) {
      throw new TRPCError({ code: 'FORBIDDEN' })
    }
    return next()
  })

// 创建路由器
export const createTRPCRouter = t.router

// 公共路由
export const publicProcedure = t.procedure

// 私有路由
export const protectedProcedure = t.procedure.use(isAuthenticated)
```

## 路由定义

### 用户路由 (src/routers/user.ts)
```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from './index'
import { TRPCError } from '@trpc/server'

export const userRouter = createTRPCRouter({
  // 获取所有用户
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor, search } = input
      const items = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
              ],
            }
          : undefined,
        orderBy: { createdAt: 'desc' },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: items.slice(0, limit),
        nextCursor,
      }
    }),

  // 获取单个用户
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: {
          posts: true,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      return user
    }),

  // 创建用户 (仅管理员)
  create: protectedProcedure
    .use(requireRole('admin'))
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        role: z.enum(['admin', 'user', 'moderator']).default('user'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: input,
      })

      return user
    }),

  // 更新用户
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        avatar: z.string().url().optional(),
        bio: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input

      // 检查权限：用户只能修改自己的信息，管理员可以修改所有
      if (ctx.session.user.id !== id && ctx.session.user.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own profile',
        })
      }

      const user = await ctx.prisma.user.update({
        where: { id },
        data,
      })

      return user
    }),

  // 删除用户
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // 检查权限
      if (ctx.session.user.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Only admin can delete users',
        })
      }

      const user = await ctx.prisma.user.delete({
        where: { id: input.id },
      })

      return user
    }),

  // 获取当前用户
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    return user
  }),
})
```

### 文章路由 (src/routers/post.ts)
```typescript
import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from './index'
import { TRPCError } from '@trpc/server'

export const postRouter = createTRPCRouter({
  // 获取所有文章
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
        status: z.enum(['draft', 'published', 'archived']).optional(),
        authorId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor, status, authorId } = input
      const items = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...(status ? { status } : {}),
          ...(authorId ? { authorId } : {}),
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: items.slice(0, limit),
        nextCursor,
      }
    }),

  // 获取单个文章
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }

      return post
    }),

  // 创建文章
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        excerpt: z.string().max(500).optional(),
        coverImage: z.string().url().optional(),
        status: z.enum(['draft', 'published']).default('draft'),
        tags: z.array(z.string()).default([]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      return post
    }),

  // 更新文章
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
        excerpt: z.string().max(500).optional(),
        coverImage: z.string().url().optional(),
        status: z.enum(['draft', 'published', 'archived']).optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input

      // 检查权限：作者或管理员可以修改
      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: { authorId: true },
      })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }

      if (
        post.authorId !== ctx.session.user.id &&
        ctx.session.user.role !== 'admin'
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own posts',
        })
      }

      const updatedPost = await ctx.prisma.post.update({
        where: { id },
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      return updatedPost
    }),

  // 删除文章
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // 检查权限
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        select: { authorId: true },
      })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        })
      }

      if (
        post.authorId !== ctx.session.user.id &&
        ctx.session.user.role !== 'admin'
      ) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own posts',
        })
      }

      const deletedPost = await ctx.prisma.post.delete({
        where: { id: input.id },
      })

      return deletedPost
    }),
})
```

## 客户端配置

### 浏览器客户端 (src/client/browser.ts)
```typescript
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '../routers'
import { getBaseUrl } from '../utils/getBaseUrl'

export const trpc = createTRPCReact<AppRouter>()

export function getTRPCClient() {
  return trpc.createClient({
    transformer: superjson,
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        headers() {
          return {
            'x-trpc-source': 'react',
          }
        },
      }),
    ],
  })
}
```

### 服务器端客户端 (src/client/server.ts)
```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import type { AppRouter } from '../routers'
import { getBaseUrl } from '../utils/getBaseUrl'

export function getTRPCServerClient(headers?: Headers) {
  return createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        headers() {
          return {
            ...Object.fromEntries(headers?.entries() || []),
            'x-trpc-source': 'server',
          }
        },
      }),
    ],
  })
}
```

## 工具函数

### 获取基础URL (src/utils/getBaseUrl.ts)
```typescript
export function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
```

### 创建调用者 (src/utils/createCaller.ts)
```typescript
import { createContext } from '../context'
import { appRouter } from '../routers'

export async function createCaller(opts: { headers?: Headers }) {
  const ctx = await createContext({
    req: new Request('http://localhost'),
    res: {} as any,
  })

  return appRouter.createCaller(ctx)
}
```

## React Query集成

### tRPC Provider (src/providers/trpc-provider.tsx)
```typescript
'use client'

import { trpc } from '@/api/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import superjson from 'superjson'
import { getBaseUrl } from '@/api/utils/getBaseUrl'

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
```

### 使用示例 (在组件中)
```typescript
'use client'

import { trpc } from '@/api/client'

export function UserList() {
  const { data, isLoading, error } = trpc.user.getAll.useQuery({
    limit: 10,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.items.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}
```

## 依赖详情

### 核心依赖
```json
{
  "@trpc/server": "11.0.0-rc.334",           // tRPC服务器
  "superjson": "^2.2.1",                     // 序列化
  "zod": "^3.23.8"                            // 验证
}
```

### 集成依赖
```json
{
  "@tongdelove/auth": "workspace:*",          // 认证模块
  "@tongdelove/db": "workspace:*",            // 数据库
  "@tongdelove/validators": "workspace:*"     // 验证器
}
```

### 开发依赖
```json
{
  "@tongdelove/eslint-config": "workspace:*", // ESLint配置
  "@tongdelove/prettier-config": "workspace:*", // Prettier配置
  "@tongdelove/typescript-config": "workspace:^", // TypeScript配置
  "typescript": "^5.4.5"                      // TypeScript
}
```

## 开发命令

```bash
# 构建
pnpm build                                   # TypeScript编译
pnpm dev                                     # 监听模式编译

# 代码质量
pnpm lint                                    # ESLint检查
pnpm format                                  # Prettier格式化
pnpm typecheck                               # TypeScript检查

# 清理
pnpm clean                                   # 清理缓存
```

## API路由配置

### Next.js API路由 (pages/api/trpc/[trpc].ts)
```typescript
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '@/api/routers'
import { createContext } from '@/api/context'

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          )
        }
      : undefined,
})
```

## 最佳实践

### 1. 路由设计
- 保持路由的单一职责
- 使用有意义的路由名称
- 合理分组相关路由

### 2. 输入验证
- 使用Zod进行严格的类型检查
- 提供清晰的错误消息
- 处理边界情况

### 3. 错误处理
- 使用适当的TRPCError代码
- 提供有意义的错误信息
- 避免泄露敏感信息

### 4. 类型安全
- 利用TypeScript的类型推断
- 避免使用any类型
- 保持类型定义的一致性

## 常见问题

### Q: 如何添加新的路由？
A:
```typescript
// 1. 在 src/routers/ 下创建新路由
// 2. 在 index.ts 中导入和注册
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  // 新路由
  comment: commentRouter,
})
```

### Q: 如何处理复杂查询？
A: 使用Zod验证复杂输入
```typescript
.post.getAll
  .input(z.object({
    filters: z.object({
      status: z.enum(['draft', 'published']).optional(),
      createdAfter: z.date().optional(),
      createdBefore: z.date().optional(),
    }).optional(),
    sort: z.enum(['createdAt', 'title', 'author']).default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  }))
```

### Q: 如何实现批量操作？
A: 使用数组输入
```typescript
.deleteMany
  .input(z.object({
    ids: z.array(z.string()).min(1),
  }))
  .mutation(async ({ input, ctx }) => {
    const results = await ctx.prisma.post.deleteMany({
      where: {
        id: { in: input.ids },
      },
    })
    return results
  })
```

## 相关资源

- [tRPC文档](https://trpc.io/)
- [SuperJSON文档](https://github.com/blitz-js/superjson)
- [Zod文档](https://zod.dev/)
- [React Query文档](https://tanstack.com/query)

---

*最后更新: 2025-11-02*
