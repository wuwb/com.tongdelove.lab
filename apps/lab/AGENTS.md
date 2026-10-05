# AGENTS.md - Lab Application

> **Last Updated**: 2026-09-30
> **Framework**: Next.js 16 (App Router 3+)
> **Features**: Multi-module app (resume, holiday avatar, study materials)
> **Node**: >=20.x
> **架构**: 前后端分离，lab 不直连数据库（详见下方「前后端分离」）

---

## 🏗️ Architecture Overview

The lab app is a **Next.js 16** application using the latest App Router with multiple features.

```
apps/lab/
├── src/
│   ├── app/                     # App Router (Next.js 16)
│   │   ├── (public)/            # Public routes
│   │   ├── (dashboard)/         # Dashboard routes
│   │   └── resume/              # Resume feature
│   ├── components/              # Components
│   ├── lib/                     # Utilities
│   ├── hooks/                   # Custom hooks
│   └── styles/                  # Global styles
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🎯 Features

### Resume Generator

- Route: `/resume`
- Templates, customization

### Holiday Avatar Creator

- Route: `/avatar`
- Canvas-based avatar creation
- Image processing

### Study Materials Printing

- Route: `/printing`
- Document formatting

---

## 🔌 前后端分离（重要）

lab 是**纯前端应用，不再持有任何数据库连接**。所有后端数据访问都通过
`services/server`（NestJS + Drizzle）以 HTTP 方式完成。

### 约束

- ❌ 禁止在 `apps/lab` 中引入 `@prisma/client`、`@tongdelove/prisma`、`@tongdelove/db`
- ❌ 禁止在 `apps/lab` 中读取 `DATABASE_URL` / `DIRECT_URL`
- ✅ 数据访问统一走 `src/server/backend/` 下的 API 客户端

### 结构

```
apps/lab/src/server/backend/
├── http-client.ts          # 统一 HTTP 客户端（解包 server 响应信封）
├── lab-poem.api.ts         # 诗词相关接口封装
├── lab-content.api.ts      # 贴纸 / favicon / 导航 / 用户 接口封装
├── lab-post.api.ts         # 文章接口封装
├── auth/lab-auth-adapter.ts # NextAuth 远程适配器（替代 PrismaAdapter）
└── enums/                  # 与服务端数据库一致的枚举与类型
```

### 对应的服务端模块

`apps/lab` 的后端实现在 `services/server/src/modules/lab/`，路由前缀 `/api/lab/*`：

| 模块 | 路由前缀 | 说明 |
| --- | --- | --- |
| `poem` | `/api/lab/poem` | 诗词、作者、标签、卡片 |
| `sticker` | `/api/lab/sticker` | 贴纸 |
| `favicon-gen` | `/api/lab/favicon-gen` | favicon 生成 |
| `apple-guide` | `/api/lab/apple-guide` | Apple 购买指南 |
| `link` | `/api/lab/link` | 导航链接 |
| `user` | `/api/lab/user` | 用户资料 / 订阅 / 权限 |
| `post` | `/api/lab/post` | 文章 |
| `auth` | `/api/lab/auth` | NextAuth 适配器（user/account/session） |

### 环境变量

```bash
LAB_API_SERVER_URL=http://localhost:8001   # services/server 地址
```

### 新增后端能力的流程

1. 在 `services/server/src/modules/lab/` 下新增 service + controller（使用 Drizzle）
2. 在 `apps/lab/src/server/backend/` 对应的 `*.api.ts` 中封装调用
3. 若被 tRPC router 使用，在 `apps/lab/src/server/routers/` 中改为调用该 API 客户端

> 注：诗词、作者、标签等管理类写操作沿用原有的 `TOKEN` 校验，
> 该环境变量需配置在 **services/server** 侧。

---

## 🔑 App Router Structure

### New App Router (Next.js 16)

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── layout.tsx
│   └── page.tsx
├── resume/
│   ├── page.tsx
│   └── edit/
├── avatar/
│   ├── page.tsx
│   └── create/
└── printing/
    └── page.tsx
```

---

## 🔧 Development

```bash
# Start dev server
pnpm dev

# Build
pnpm build

# Type check
pnpm typecheck
```

---

## 🤝 Contributing

Next.js 16 App Router:

- Server Components by default
- Client Components with `'use client'`
- Route Handlers in `route.ts`
- Parallel and intercepting routes

---

_For Next.js 16 patterns, see [Next.js Documentation](https://nextjs.org/docs/app)_
