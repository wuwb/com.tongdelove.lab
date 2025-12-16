# UI共享包 - packages/ui

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **ui**

## 概述

**Shadcn/ui组件库** - 基于Radix UI和TailwindCSS的现代React组件库

## 技术栈

- **基础**: Radix UI primitives, React 18, TypeScript
- **样式**: TailwindCSS, Tailwind Animate, Class Variance Authority
- **表单**: React Hook Form, Zod
- **主题**: Next Themes, @radix-ui/themes
- **图标**: Lucide React, @radix-ui/react-icons
- **通知**: Sonner

## 目录结构

```
packages/ui/
├── src/
│   ├── components/              # 组件目录
│   │   ├── ui/                  # 基础组件
│   │   │   ├── button.tsx       # 按钮组件
│   │   │   ├── input.tsx        # 输入框
│   │   │   ├── card.tsx         # 卡片
│   │   │   ├── dialog.tsx       # 对话框
│   │   │   ├── dropdown-menu.tsx # 下拉菜单
│   │   │   ├── form.tsx         # 表单
│   │   │   ├── select.tsx       # 选择器
│   │   │   ├── table.tsx        # 表格
│   │   │   ├── tabs.tsx         # 标签页
│   │   │   └── ...              # 其他组件
│   │   └── layout/              # 布局组件
│   │       ├── sidebar.tsx      # 侧边栏
│   │       ├── header.tsx       # 头部
│   │       └── footer.tsx       # 底部
│   ├── hooks/                   # 自定义Hooks
│   │   ├── use-toast.ts         # Toast Hook
│   │   └── use-mobile.ts        # 移动端检测
│   ├── lib/                     # 工具库
│   │   ├── utils.ts             # 通用工具
│   │   └── cn.ts                # 类名合并
│   └── index.ts                 # 主入口
├── package.json
└── tsconfig.json
```

## 组件系统

### 基础组件 (UI Primitives)

#### Button 按钮
```typescript
import { Button } from '@tongdelove/ui'

// 变体
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// 大小
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon />
</Button>
```

#### Input 输入框
```typescript
import { Input } from '@tongdelove/ui'

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Enter email..." />
<Input type="password" placeholder="Enter password..." />
```

#### Card 卡片
```typescript
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@tongdelove/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Card Content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### 交互组件

#### Dialog 对话框
```typescript
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@tongdelove/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

#### Dropdown Menu 下拉菜单
```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tongdelove/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 表单组件

#### Form 表单
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@tongdelove/ui'

const formSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    username: '',
    email: '',
  },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

## 核心依赖

### Radix UI (无障碍组件)
```json
{
  "@radix-ui/react-accordion": "^1.1.2",       // 手风琴
  "@radix-ui/react-alert-dialog": "^1.1.6",    // 警告对话框
  "@radix-ui/react-dialog": "^1.1.1",          // 对话框
  "@radix-ui/react-dropdown-menu": "^2.1.1",   // 下拉菜单
  "@radix-ui/react-popover": "^1.1.1",         // 弹出层
  "@radix-ui/react-select": "^2.1.1",          // 选择器
  "@radix-ui/react-tabs": "^1.1.0",            // 标签页
  "@radix-ui/react-toast": "^1.2.1",           // 提示
  "@radix-ui/react-tooltip": "^1.1.2",         // 工具提示
  "@radix-ui/react-slot": "^1.1.0"             // Slot组件
}
```

### 样式工具
```json
{
  "class-variance-authority": "^0.7.0",        // 变体管理
  "clsx": "^2.1.1",                            // 条件类名
  "tailwind-merge": "^2.4.0",                  // Tailwind合并
  "tailwindcss-animate": "^1.0.7",             // 动画
  "@radix/themes": "^3.1.3"                    // 主题系统
}
```

### 主题系统
```typescript
// 主题配置
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

<Theme appearance="light" accentColor="violet" grayColor="slate" radius="large" scaling="100%">
  <YourApp />
</Theme>
```

## 开发命令

```bash
# 添加新组件
pnpm add                            # 添加Shadcn组件
pnpm ui-add                         # 交互式添加

# 代码质量
pnpm lint                           # ESLint检查
pnpm format                         # Prettier格式化
pnpm typecheck                      # TypeScript检查

# 清理
pnpm clean                          # 清理缓存
```

## 组件开发指南

### 1. 创建新组件
```bash
# 使用Shadcn CLI
pnpm dlx shadcn-ui add button

# 手动创建
# 1. 在 src/components/ui/ 下创建文件
# 2. 导出组件和类型
# 3. 在 index.ts 中导出
```

### 2. 组件模式
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 定义变体
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// 组件接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 组件实现
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// 导出
export { Button, buttonVariants }
```

### 3. 工具函数
```typescript
// lib/cn.ts - 类名合并
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts - 其他工具
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## 最佳实践

### 1. 变体管理
- 使用 `class-variance-authority` 定义组件变体
- 保持变体命名一致性 (default, destructive, outline, secondary, ghost, link)
- 支持大小变体 (default, sm, lg, icon)

### 2. 无障碍
- 所有交互组件基于 Radix UI，保证无障碍性
- 提供合适的 ARIA 属性
- 支持键盘导航

### 3. 样式策略
- 优先使用 TailwindCSS 类名
- 使用 `cn()` 工具合并类名
- 利用 CSS 自定义属性实现主题切换

### 4. 组件组合
- 使用 `Slot` 模式提高灵活性
- 支持 `asChild` prop 改变渲染元素
- 保持组件 API 简洁一致

## 使用示例

### 在应用中引入
```typescript
// apps/web/src/app/layout.tsx
import '@tongdelove/ui/styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 在组件中使用
```typescript
// apps/web/src/components/Example.tsx
import { Button } from '@tongdelove/ui'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@tongdelove/ui'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example</CardTitle>
        <CardDescription>This is an example card.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
      <CardFooter>
        Footer content
      </CardFooter>
    </Card>
  )
}
```

## 自定义主题

### Tailwind配置
```javascript
// tailwind.config.js
module.exports = {
  content: [
    // ...其他路径
    './node_modules/@tongdelove/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ...更多颜色
      },
    },
  },
}
```

### CSS变量
```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ...更多变量 */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ...更多变量 */
  }
}
```

## 相关资源

- [Shadcn/ui文档](https://ui.shadcn.com/)
- [Radix UI组件](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [class-variance-authority](https://cva.style/docs)

---

*最后更新: 2025-11-02*
