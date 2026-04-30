<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md - Web Application (Next.js 14)

> **Last Updated**: 2025-02-27  
> **Framework**: Next.js 14 (App Router)  
> **Styling**: TailwindCSS
> **Features**: i18n, SEO, Product catalog, User authentication  
> **Node Version**: >=20.x

---

## 🏗️ Architecture Overview

The web application is a large Next.js 14 website with hundreds of components and pages, using the App Router pattern.

```
apps/web/
├── src/
│   ├── pages/                  # Pages directory (not using AppRouter)
│   │   ├── index.tsx          # Homepage
│   │   ├── products/          # Product pages
│   │   │   ├── [slug].tsx     # Dynamic product detail
│   │   │   ├── accessories/
│   │   │   ├── carton/
│   │   │   ├── standard/
│   │   │   └── ...
│   │   ├── user/              # User authentication & profile
│   │   ├── sitemap/
│   │   └── ...
│   ├── components/            # React components
│   │   ├── common/            # Shared components (Header, Footer, Navbar)
│   │   ├── ui/                # UI component library
│   │   ├── components/        # Feature-specific components
│   │   ├── module/            # Feature modules
│   │   └── containers/        # Container components
│   ├── services/              # API calls & services
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript types
│   ├── hooks/                 # Custom React hooks
│   ├── contexts/              # React contexts
│   ├── config/                # Configuration files
│   └── styles/                # Global styles
├── next.config.js             # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 🔑 Core Concepts

### 1. Pages Router (Not App Router)

This app uses the **Pages Router** pattern (not App Router):

- Routes defined in `src/pages/` directory
- File-system based routing
- Each file becomes a route

### 2. Component Organization

Components are organized by **type/feature domain**:

```
components/
├── common/              # Cross-page shared components
│   ├── Navbar/          # Navigation bar
│   ├── Footer/          # Site footer
│   ├── Header/          # Page header
│   └── GlobalNav/       # Global navigation
├── ui/                  # Design system components
│   └── (50+ components like Button, Dialog, Input, etc.)
├── components/          # Reusable components
│   ├── ProjectCard
│   ├── post-body
│   └── ...
├── module/              # Feature modules
│   └── Pricing, ProductDemoList, etc.
└── containers/          # Container components
    └── Index, LoginForm, etc.
```

### 3. Internationalization (i18n)

**Used**: `next-i18next`

Configuration files:

```
next-i18next.config.js     # i18n configuration
i18next-parser.config.js    # Parser for translations
```

**Language Files**: Located in `public/locales/` (likely)

- Supports multiple languages
- Namespace-based translations

### 4. SEO Optimization

**Files for SEO**:

```
src/components/common/Seo/index.tsx
src/components/common/Head/index.tsx
src/config/seo.ts
```

**Features**:

- Dynamic meta tags
- Sitemap generation
- OpenGraph tags
- Canonical URLs

### 5. Styling Architecture

**Primary**: TailwindCSS
**Components**: Mix of:

- Tailwind utility classes
- Custom CSS modules (`.module.css` files)
- Less files (`src/styles/variables.less`)

---

## 📁 Directory Details

### `/src/pages/` - Routes

| Directory/Files         | Routes                  | Purpose                   |
| ----------------------- | ----------------------- | ------------------------- |
| `index.tsx`             | `/`                     | Homepage                  |
| `products/`             | `/products/*`           | Product catalog & details |
| `products/[slug].tsx`   | `/products/:slug`       | Dynamic product page      |
| `products/accessories/` | `/products/accessories` | Accessories category      |
| `products/carton/`      | `/products/carton`      | Carton boxes              |
| `user/`                 | `/user/*`               | User auth & profile       |
| `user/login/`           | `/user/login`           | Login page                |
| `user/register/`        | `/user/register`        | Registration              |
| `about/`                | `/about`                | About page                |
| `contact/`              | `/contact`              | Contact page              |

**Page Structure Pattern**:

```typescript
// src/pages/about.tsx
export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Us</title>
      </Head>
      <MainContent />
    </Layout>
  )
}
```

### `/src/components/common/` - Shared Components

**Key Components**:

- `Navbar/` - Site navigation with responsive design
- `Footer/` - Site footer with links
- `Header/` - Page headers
- `GlobalNav/` - Global navigation menu
- `TopMenu/` - Top menu with dropdown
- `Layout/` - Page layout wrapper
- `Seo/` - SEO meta tags
- `Head/` - HTML head management
- `Lang/` - Language switcher

### `/src/components/ui/` - UI Components

**50+ UI Components** including:

- `Button` - various button styles and states
- `Dialog` - modal dialogs
- `Input` - form inputs
- `Checkbox` - checkbox inputs
- `Radio` - radio buttons
- `Select` - select dropdowns
- `Tooltip` - tooltips
- `Popover` - popover menus
- `Drawer` - slide-out panels
- `LoadingIndicator` - loading states
- And many more...

**Pattern**: Each component has:

- Module file (`.module.css`)
- Main component file
- Export in `index.tsx`
- Storybook stories (`.stories.tsx`)

### `/src/containers/` - Container Components

Containers connect data to presentation:

- `Index/` - Homepage container
- `Login`/`LoginForm/` - Login form containers
- `product/` - Product-related containers
- `introduce/` - Introduction pages
- `Daohang`/`DaohangCard`/`DaohangLink` - Navigation containers

---

## 🎯 Key Patterns & Conventions

### 1. Page Layout Pattern

**Wrapper Component**:

```typescript
// src/components/common/Layout/Layout.tsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

**Page Usage**:

```typescript
export default function AboutPage() {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  )
}
```

### 2. Component Prop Patterns

**Prop Interface**:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>
}
```

### 3. API Service Pattern

**Service Files** (`/src/services/`):

```typescript
// src/services/Post.service.ts
import axios from '@/utils/axios'

export async function getPosts() {
  const { data } = await axios.get('/api/posts')
  return data
}

export async function getPost(id: string) {
  const { data } = await axios.get(`/api/posts/${id}`)
  return data
}
```

### 4. Custom Hooks

**Hook Files** (`/src/hooks/`):

```typescript
// src/hooks/useDomClean.ts
import { useEffect } from 'react'

export function useDomClean() {
  useEffect(() => {
    // Cleanup logic
    return () => {
      // Cleanup on unmount
    }
  }, [])
}
```

---

## 🔧 Development Workflow

### Running the App

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type check
pnpm typecheck
```

### Adding a New Page

1. **Create file** in `src/pages/`:

   ```bash
   touch src/pages/my-page.tsx
   ```

2. **Implement page**:

   ```typescript
   export default function MyPage() {
     return <Layout><MyContent /></Layout>
   }
   ```

3. **Route** will be `/my-page`

### Adding a New Component

1. **Create component** in appropriate directory:
   - UI component: `src/components/ui/my-component.tsx`
   - Common component: `src/components/common/MyComponent/`

2. **Add styles** (if needed):

   ```css
   /* MyComponent.module.css */
   .container { ... }
   ```

3. **Export** from index:
   ```typescript
   export { MyComponent } from './MyComponent'
   ```

---

## 🚫 Anti-Patterns to Avoid

1. **Hardcoded URLs**
   - ❌ `<a href="/products/box">`
   - ✅ `<Link href="/products/box">` or use config

2. **Missing SEO tags**
   - ❌ Pages without meta tags
   - ✅ Use `<Seo />` or `<Head />` components

3. **Direct style manipulation**
   - ❌ `style={{ width: '100px' }}`
   - ✅ Use Tailwind classes: `className="w-[100px]"`

4. **Large component files**
   - ❌ 500+ line single file
   - ✅ Split into smaller features

5. **Skipping translation**
   - ❌ Hardcoded text
   - ✅ Use `useTranslation` hook

---

## 🔍 Common Issues & Solutions

| Issue                | Solution                                  |
| -------------------- | ----------------------------------------- |
| i18n not working     | Check `next-i18next` configuration        |
| Tailwind not purging | Use `@apply` or dynamic classes correctly |
| Build timeout        | Check for large images/assets             |
| SEO tags not showing | Ensure `Head` component is used correctly |

---

## 📊 Key Files & Sizes

| Directory/File               | Approx. Files | Purpose             |
| ---------------------------- | ------------- | ------------------- |
| `src/pages/`                 | 50+           | Page routes         |
| `src/components/common/`     | 30+           | Shared components   |
| `src/components/ui/`         | 50+           | UI components       |
| `src/components/components/` | 20+           | Reusable components |
| `src/services/`              | 5+            | API services        |
| `src/hooks/`                 | 5+            | Custom hooks        |

---

## 🤝 Contributing

When working on the web app:

1. Use Pages Router (not App Router)
2. Components in appropriate directories
3. Use TailwindCSS for styling
4. Include i18n for user-facing text
5. Add SEO meta tags to pages
6. Test responsive design
7. Follow component prop patterns

---

_For Next.js patterns, see [Next.js Documentation](https://nextjs.org/docs)_
_For TailwindCSS, see [TailwindCSS Documentation](https://tailwindcss.com/docs)_

# Web应用模块 - apps/web

## 导航

> 根目录 / [应用层](../CLAUDE.md#应用模块详解) / **web**

## 概述

**包装品官网** - 基于Next.js 14构建的企业官网和产品展示平台

## 技术栈

- **框架**: Next.js 14.2.5, React 18.3.1, TypeScript 5.4.5
- **UI库**: TailwindCSS 3.4.6, Shadcn/ui
- **状态管理**: SWR 1.2.2, React Query
- **认证**: NextAuth 4.24.11
- **图表**: Chart.js (集成在组件中)
- **构建工具**: Webpack 5.88.2

## 目录结构

```
apps/web/
├── public/                    # 静态资源
│   ├── common/
│   │   └── js/lib/codemirror/ # 代码编辑器资源
│   └── images/
├── src/
│   ├── app/                   # Next.js App Router
│   ├── components/            # 可复用组件
│   ├── pages/                 # 传统页面路由 (保留)
│   ├── hooks/                 # 自定义Hooks
│   ├── utils/                 # 工具函数
│   ├── styles/                # 样式文件
│   └── types/                 # TypeScript类型定义
├── package.json
└── next.config.js
```

## 核心功能

### 1. 页面模块

- **首页**: 产品展示、公司介绍
- **产品页**: 包装品类目、详情页
- **关于我们**: 公司历史、团队介绍
- **联系我们**: 联系表单、地址信息
- **博客**: 技术文章、行业资讯

### 2. 电商功能

- **购物车**: 基于React Context
- **结算流程**: 集成支付系统
- **订单管理**: 状态跟踪
- **用户账户**: 登录/注册/个人中心

### 3. 交互组件

- **轮播图**: Swiper.js实现
- **图片画廊**: 响应式网格布局
- **表单组件**: 集成验证
- **加载器**: 骨架屏、spinner

## 依赖详情

### UI依赖

```json
{
  "@ant-design/cssinjs": "^1.20.0", // Ant Design CSS-in-JS
  "@tailwindcss/typography": "^0.5.15", // Tailwind排版插件
  "react-fast-marquee": "^1.6.5", // 跑马灯效果
  "swiper": "8.4.5", // 轮播组件
  "react-icons": "^4.10.1" // 图标库
}
```

### 数据获取

```json
{
  "axios": "^1.7.9", // HTTP客户端
  "axios-hooks": "^3.0.1", // Axios Hooks
  "swr": "^1.2.2", // 数据缓存
  "wpapi": "^1.2.2" // WordPress API
}
```

### 国际化

```json
{
  "i18next": "^22.4.10", // 国际化框架
  "next-i18next": "^13.3.0", // Next.js集成
  "react-intl": "^5.24.6", // React Intl
  "next-transpile-modules": "^9.0.0" // 模块转换
}
```

### SEO与性能

```json
{
  "next-seo": "^4.28.1", // SEO优化
  "next-themes": "^0.4.4", // 主题切换
  "nextjs-progressbar": "^0.0.16" // 进度条
}
```

## 关键文件

### 配置文件

- `next.config.js` - Next.js配置
- `tailwind.config.js` - TailwindCSS配置
- `tsconfig.json` - TypeScript配置
- `eslint.config.js` - ESLint配置

### 主要组件

- `layout.tsx` - 根布局组件
- `page.tsx` - 首页组件
- `loading.tsx` - 加载状态组件
- `error.tsx` - 错误边界组件

## 路由结构

### App Router (新)

```
src/app/
├── page.tsx                    # /
├── layout.tsx                  # 根布局
├── loading.tsx                 # 全局加载
├── error.tsx                   # 全局错误
├── about/                      # 关于我们
│   └── page.tsx
├── products/                   # 产品页
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── blog/                       # 博客
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── contact/                    # 联系我们
    └── page.tsx
```

### Pages Router (保留)

```
src/pages/
├── _app.tsx                    # 自定义App组件
├── _document.tsx               # 自定义Document
├── index.tsx                   # 旧首页 (保留)
├── api/                        # API路由
│   ├── auth/
│   └── contact/
```

## 开发命令

```bash
# 开发
pnpm dev                        # Next.js开发服务器 (端口3000)
pnpm build                      # 生产构建
pnpm start                      # 生产服务器
pnpm analyze                    # 构建分析

# 代码质量
pnpm lint                       # ESLint检查
pnpm lint:fix                   # 自动修复
pnpm prettier                   # Prettier格式化
```

## Hooks使用

### SWR数据获取

```typescript
// 示例
const { data, error, isLoading } = useSWR('/api/products', fetcher)
```

### 自定义Hooks

- `useAuth` - 认证状态管理
- `useCart` - 购物车状态
- `useLocalStorage` - 本地存储
- `useDebounce` - 防抖

## 样式系统

### TailwindCSS

- 使用 `@tongdelove/design` 设计系统
- 自定义颜色主题
- 响应式断点: sm, md, lg, xl, 2xl

### 组件样式

- 优先使用Tailwind类名
- 复杂样式使用CSS Modules
- 动态样式使用内联样式

## API集成

### 内部API

- `services/server` - 核心API服务
- GraphQL端点 (Apollo Client)
- REST API (Axios)

### 外部服务

- WordPress CMS
- 支付系统 (Stripe, PayPal)
- 邮件服务 (Resend)
- 分析 (Google Analytics)

## 性能优化

### Next.js优化

- **Image组件**: 自动优化图片
- **Code Splitting**: 路由级别分割
- **动态导入**: 按需加载组件
- **静态生成**: SSG用于静态页面

### 缓存策略

- SWR缓存API响应
- CDN缓存静态资源
- 浏览器缓存控制

## 部署配置

### Vercel部署

- 自动构建和部署
- 环境变量配置
- 域名绑定

### Docker部署

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 环境变量

### 必需变量

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_GRAPHQL=http://localhost:3001/graphql
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

### 可选变量

```bash
NEXT_PUBLIC_GA_ID=GA-XXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_MIXPANEL_TOKEN=...
```

## 测试策略

### 单元测试

- Vitest测试框架
- React Testing Library
- Jest配置

### E2E测试

- Playwright
- Cypress (备选)

## 常见问题

### Q: 如何添加新页面？

A: 在 `src/app/` 下创建新目录和 `page.tsx` 文件

### Q: 如何自定义主题？

A: 修改 `tailwind.config.js` 或使用 `@tongdelove/design` 包

### Q: 如何添加API调用？

A: 使用SW Hook或Axios，创建自定义 `useApi` Hook

### Q: 如何部署到生产环境？

A: 使用Vercel CLI或GitHub Actions自动部署

## 相关文档

- [Next.js文档](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [SWR](https://swr.vercel.app/)

---

_最后更新: 2025-11-02_
