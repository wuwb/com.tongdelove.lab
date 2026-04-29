# Code Wiki - lab.printlake.com

## 1. 项目整体架构

`lab.printlake.com` (仓库名: `com.tongdelove.lab`) 是一个基于 `pnpm` workspace 和 `Turborepo` 管理的大型全栈 Monorepo 项目。涵盖了多个前端应用（Web端、桌面端、移动端、浏览器插件）、共享包以及后端微服务。

### 核心技术栈
- **包管理与构建**: pnpm, Turborepo
- **前端框架**: React, Next.js (App Router & Pages Router), Tailwind CSS, Chakra UI
- **桌面与移动端**: Electron (Vite), Expo (React Native)
- **后端框架**: NestJS, Express
- **数据库与ORM**: PostgreSQL, Prisma, Drizzle
- **第三方云服务**: Supabase (Auth, Database, Storage), Vercel (Hosting), Trigger.dev (Jobs), Resend (Email)

---

## 2. 主要模块职责

项目结构划分为 `apps` (具体应用), `services` (后端服务) 和 `packages` (共享包)。

### 🖥️ 应用程序 (`apps/`)

| 应用目录 | 描述 | 技术栈/架构特点 |
| --- | --- | --- |
| **`apps/admin`** | 管理后台，用于管理报价（专版、标准）、订单、用户等。 | 基于 antd-pro v5 的 React 应用 |
| **`apps/web`** | 包装品展示与售卖网站。提供商品目录、SEO优化、多语言。 | Next.js 14 (Pages Router), next-i18next |
| **`apps/lab`** | 实验室网站，包含：简单简历、小公举（节日头像制作）、学习资料打印等功能模块。 | Next.js 16 (App Router) |
| **`apps/design`** | 包装品在线设计应用平台。 | React, Next.js |
| **`apps/desktop`** | 桌面端应用，提供本地化AI对话功能（支持Ollama, OpenAI等）。 | Electron + React + Vite, 包含 Main, Preload, Renderer 三层架构 |
| **`apps/mobile`** | 移动端应用程序。 | Expo (React Native) |
| **`apps/extension`** | 浏览器插件，提供 1688 和 Temu 等电商平台的页面内容提取、比价等功能。 | WXT 框架, Chrome 支持 |

### ⚙️ 后端服务 (`services/`)

| 服务目录 | 描述 | 技术栈/架构特点 |
| --- | --- | --- |
| **`services/server`** | 核心后端 API 服务。负责用户系统、内容（文章、图书、评论）、商品、信用交易等核心业务逻辑。 | NestJS, Prisma, REST + GraphQL 双支持 |

### 📦 共享依赖包 (`packages/`)

| 包名 | 描述 |
| --- | --- |
| **`@tongdelove/ui`** | 共享的 UI 组件库 (50+ 组件)，基于 Chakra UI 和 Tailwind CSS。 |
| **`@tongdelove/schema`** | 共享数据库模型定义 (Prisma Schema)、自动生成的类型、以及基于 Zod 的数据验证模型。 |
| **`@tongdelove/auth`** | NextAuth 鉴权和会话管理逻辑。 |
| **`@tongdelove/utils`** | 通用工具函数库 (日期、数字、字符串格式化等)。 |
| **`@tongdelove/hooks`** | 自定义 React Hooks 集合 (`useLocalStorage`, `useDebounce` 等)。 |
| **`@tongdelove/db`** | 供后端使用的 Prisma Client 实例及数据库查询辅助方法。 |
| **`@tongdelove/api`** | tRPC API Client 路由及类型。 |
| **`@tongdelove/validators`** | 用于表单和 API 参数校验的 Zod 校验器。 |
| **`@tongdelove/i18n`** | 国际化 (i18n) 工具及共享翻译文件配置。 |

---

## 3. 关键类与函数说明

### NestJS 后端 (`services/server`)
- **`[Feature]Module` / `[Feature]Controller` / `[Feature]Service`**: 标准的 NestJS 模块化设计。控制器负责 REST 路由，服务层处理核心业务。
- **`[Feature]Resolver`**: GraphQL 的解析器，与 Controller 共享 Service 层的业务逻辑。
- **Guards (守卫)**: 
  - `AuthGuard`: 拦截非 GET 请求并校验 JWT Token。
  - `HumanizedJwtAuthGuard`: 智能鉴权，针对 GET 请求智能判定是否有权限访问高级数据。
- **Interceptors (拦截器)**:
  - `LoggingInterceptor`: 请求响应时间日志。
  - 数据流转换与异常拦截器：统一格式化成功响应的数据结构，捕获全局异常。

### 桌面端 Electron (`apps/desktop`)
- **IPC 注册模式 (`register[Module]Ipc`)**: 
  在主进程 (Main Process) 中按功能模块注册 IPC 事件 (如 `registerOllamaIpc`)，通过 `contextBridge` 安全暴露给渲染进程。
- **`createProvider(config: ModelConfig)`**: 
  AI 服务的工厂函数。根据配置动态实例化对应的 AI 提供商 (OpenAIProvider, OllamaProvider 等)，统一返回 `streamChat` 和 `cancel` 接口。

### 共享 Schema (`packages/schema`)
- **`ArticleModelSchema` / `UserModelSchema`**: 
  基于 Zod 构建的数据验证类，确保前后端以及 API 层的数据类型安全，通常配合生成的 Prisma 类型使用。

---

## 4. 依赖关系

- **内部依赖**: 
  通过 pnpm workspace 管理。前端应用（如 `apps/web`）通过 `"@tongdelove/ui": "workspace:*"` 引入 UI 库、工具库等。
- **数据流向**: 
  前端应用 -> `services/server` (REST/GraphQL) -> `packages/db` (Prisma) -> PostgreSQL 数据库。
- **第三方集成**:
  - `Supabase`: 负责基础 Auth、实时数据库、Storage。
  - `Trigger.dev`: 后台异步任务处理。
  - `Resend`: 邮件发送服务。
  - `Prisma`: 核心 ORM，统一在 `packages/schema` 及根目录 `prisma/` 文件夹下维护 `schema.prisma`。

---

## 5. 项目运行方式

项目环境要求：`Node.js >= 20.x`, `pnpm >= 10.x`。

### 安装依赖
```bash
pnpm install
```

### 数据库初始化
```bash
# 生成 Prisma Client 类型及 Zod Schema
pnpm db:generate

# 推送数据库表结构 (开发环境)
pnpm db:push
```

### 本地开发运行
```bash
# 并行启动所有应用的开发服务器 (Web, Lab, Admin, Server 等)
pnpm dev

# 或者使用 turbo 运行
pnpm dev2
```

### 独立运行某个子项目
```bash
# 启动后端服务
pnpm start:server

# 启动 Web 前端
pnpm start:web

# 启动设计端
pnpm dev:design
```

### 代码检查与格式化
```bash
# 代码格式化
pnpm format

# 语法和代码规范检查
pnpm lint
pnpm typecheck
```

### 构建与部署
```bash
# 全局构建所有模块
pnpm build

# 独立构建后端服务
pnpm build:server

# 独立构建 Web 端
pnpm build:web
```

---
*文档更新于：2026-04-27*
