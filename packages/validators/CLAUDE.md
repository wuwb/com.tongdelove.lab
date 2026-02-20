# Validators共享包 - packages/validators

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **validators**

## 概述

**表单验证器** - 基于Zod的统一表单验证解决方案

## 技术栈

- **验证**: Zod 3.23.8
- **类型**: TypeScript 5.4.5
- **集成**: React Hook Form
- **工具**: @tongdelove/utils

## 目录结构

```
packages/validators/
├── src/
│   ├── auth/                    # 认证验证
│   │   ├── index.ts
│   │   ├── login.ts             # 登录验证
│   │   ├── register.ts          # 注册验证
│   │   ├── reset-password.ts    # 重置密码
│   │   └── change-password.ts   # 修改密码
│   ├── user/                    # 用户验证
│   │   ├── index.ts
│   │   ├── create-user.ts       # 创建用户
│   │   ├── update-profile.ts    # 更新资料
│   │   └── update-settings.ts   # 更新设置
│   ├── post/                    # 文章验证
│   │   ├── index.ts
│   │   ├── create-post.ts       # 创建文章
│   │   ├── update-post.ts       # 更新文章
│   │   └── comment.ts           # 评论验证
│   ├── product/                 # 产品验证
│   │   ├── index.ts
│   │   ├── create-product.ts    # 创建产品
│   │   └── update-product.ts    # 更新产品
│   ├── order/                   # 订单验证
│   │   ├── index.ts
│   │   ├── create-order.ts      # 创建订单
│   │   └── update-order.ts      # 更新订单
│   ├── contact/                 # 联系验证
│   │   ├── index.ts
│   │   └── contact-form.ts      # 联系表单
│   ├── newsletter/              # 订阅验证
│   ├── search/                  # 搜索验证
│   ├── common/                  # 通用验证
│   │   ├── index.ts
│   │   ├── email.ts             # 邮箱验证
│   │   ├── phone.ts             # 手机验证
│   │   ├── url.ts               # URL验证
│   │   ├── password.ts          # 密码验证
│   │   ├── username.ts          # 用户名验证
│   │   └── date.ts              # 日期验证
│   └── index.ts                 # 主入口
├── package.json
└── tsconfig.json
```

## 核心验证器

### 1. 认证验证 (auth/)

#### 登录验证 (src/auth/login.ts)
```typescript
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(1, '请输入密码')
    .min(8, '密码至少8位字符')
    .max(100, '密码不能超过100位字符'),
  rememberMe: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>

// React Hook Form集成
export const loginResolver = zodResolver(loginSchema)
```

#### 注册验证 (src/auth/register.ts)
```typescript
import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, '请输入用户名')
    .min(3, '用户名至少3位字符')
    .max(50, '用户名不能超过50位字符')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      '用户名只能包含字母、数字、下划线和连字符'
    ),
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址'),
  password: z
    .string()
    .min(1, '请输入密码')
    .min(8, '密码至少8位字符')
    .max(100, '密码不能超过100位字符')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '密码必须包含大小写字母和数字'
    ),
  confirmPassword: z.string().min(1, '请确认密码'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, '请同意服务条款'),
  subscribeNewsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
})

export type RegisterInput = z.infer<typeof registerSchema>

export const registerResolver = zodResolver(registerSchema)
```

#### 重置密码验证 (src/auth/reset-password.ts)
```typescript
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址'),
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(1, '请输入新密码')
    .min(8, '密码至少8位字符')
    .max(100, '密码不能超过100位字符')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '密码必须包含大小写字母和数字'
    ),
  confirmPassword: z.string().min(1, '请确认密码'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
})

export type NewPasswordInput = z.infer<typeof newPasswordSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, '请输入当前密码'),
  newPassword: z
    .string()
    .min(1, '请输入新密码')
    .min(8, '密码至少8位字符')
    .max(100, '密码不能超过100位字符')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '密码必须包含大小写字母和数字'
    ),
  confirmNewPassword: z.string().min(1, '请确认新密码'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '两次输入的新密码不一致',
  path: ['confirmNewPassword'],
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
```

### 2. 用户验证 (user/)

#### 创建用户验证 (src/user/create-user.ts)
```typescript
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, '请输入姓名')
    .min(2, '姓名至少2位字符')
    .max(50, '姓名不能超过50位字符'),
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址'),
  username: z
    .string()
    .min(1, '请输入用户名')
    .min(3, '用户名至少3位字符')
    .max(30, '用户名不能超过30位字符')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      '用户名只能包含字母、数字、下划线和连字符'
    ),
  role: z.enum(['admin', 'user', 'moderator'], {
    errorMap: () => ({ message: '请选择有效的角色' }),
  }),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .max(500, '个人简介不能超过500位字符')
    .optional(),
  avatar: z
    .string()
    .url('请输入有效的头像URL')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('请输入有效的网站URL')
    .optional()
    .or(z.literal('')),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export const createUserResolver = zodResolver(createUserSchema)
```

#### 更新资料验证 (src/user/update-profile.ts)
```typescript
import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, '请输入姓名')
    .min(2, '姓名至少2位字符')
    .max(50, '姓名不能超过50位字符')
    .optional(),
  bio: z
    .string()
    .max(500, '个人简介不能超过500位字符')
    .optional(),
  avatar: z
    .string()
    .url('请输入有效的头像URL')
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('请输入有效的网站URL')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional()
    .or(z.literal('')),
  location: z
    .string()
    .max(100, '位置信息不能超过100位字符')
    .optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export const updateProfileResolver = zodResolver(updateProfileSchema)
```

### 3. 产品验证 (product/)

#### 创建产品验证 (src/product/create-product.ts)
```typescript
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, '请输入产品名称')
    .min(2, '产品名称至少2位字符')
    .max(255, '产品名称不能超过255位字符'),
  description: z
    .string()
    .min(1, '请输入产品描述')
    .min(10, '产品描述至少10位字符')
    .max(2000, '产品描述不能超过2000位字符'),
  price: z
    .number()
    .positive('价格必须为正数')
    .min(0, '价格不能为负数')
    .max(999999, '价格过高'),
  compareAtPrice: z
    .number()
    .positive()
    .optional(),
  sku: z
    .string()
    .min(1, '请输入SKU')
    .max(100, 'SKU不能超过100位字符')
    .optional(),
  inventory: z
    .number()
    .int('库存数量必须为整数')
    .nonnegative('库存数量不能为负数')
    .default(0),
  images: z
    .array(
      z.object({
        url: z.string().url('请输入有效的图片URL'),
        alt: z.string().max(255).optional(),
      })
    )
    .min(1, '至少需要一张产品图片')
    .max(10, '最多只能上传10张图片'),
  category: z.string().min(1, '请选择产品分类'),
  tags: z.array(z.string()).max(20, '最多只能添加20个标签').optional(),
  weight: z
    .number()
    .positive('重量必须为正数')
    .optional(),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  seo: z
    .object({
      metaTitle: z.string().max(60, 'SEO标题不超过60位字符').optional(),
      metaDescription: z.string().max(160, 'SEO描述不超过160位字符').optional(),
      keywords: z.array(z.string()).max(10).optional(),
    })
    .optional(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>

export const createProductResolver = zodResolver(createProductSchema)
```

### 4. 订单验证 (order/)

#### 创建订单验证 (src/order/create-order.ts)
```typescript
import { z } from 'zod'

export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, '请输入名字').max(50),
  lastName: z.string().min(1, '请输入姓氏').max(50),
  company: z.string().max(100).optional(),
  addressLine1: z.string().min(1, '请输入地址').max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(1, '请输入城市').max(100),
  state: z.string().min(1, '请输入省份/州').max(100),
  postalCode: z.string().min(1, '请输入邮政编码').max(20),
  country: z.string().min(1, '请选择国家').max(100),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional()
    .or(z.literal('')),
})

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, '产品ID不能为空'),
        quantity: z
          .number()
          .int()
          .positive('数量必须为正整数')
          .max(999, '数量不能超过999'),
        price: z.number().positive('价格必须为正数'),
      })
    )
    .min(1, '至少需要一件商品'),
  shippingAddress: shippingAddressSchema,
  billingAddress: shippingAddressSchema.optional(),
  paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer'], {
    errorMap: () => ({ message: '请选择有效的支付方式' }),
  }),
  shippingMethod: z.enum(['standard', 'express', 'overnight'], {
    errorMap: () => ({ message: '请选择有效的配送方式' }),
  }),
  couponCode: z.string().max(50).optional(),
  notes: z.string().max(500).optional(),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

export const createOrderResolver = zodResolver(createOrderSchema)
```

### 5. 联系表单验证 (src/contact/contact-form.ts)
```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, '请输入您的姓名')
    .min(2, '姓名至少2位字符')
    .max(100, '姓名不能超过100位字符'),
  email: z
    .string()
    .min(1, '请输入邮箱地址')
    .email('请输入有效的邮箱地址'),
  phone: z
    .string()
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(1, '请输入主题')
    .min(5, '主题至少5位字符')
    .max(200, '主题不能超过200位字符'),
  message: z
    .string()
    .min(1, '请输入留言内容')
    .min(10, '留言内容至少10位字符')
    .max(2000, '留言内容不能超过2000位字符'),
  type: z.enum(['general', 'support', 'sales', 'partnership']).default('general'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  preferredContactMethod: z.enum(['email', 'phone']).default('email'),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>

export const contactFormResolver = zodResolver(contactFormSchema)
```

### 6. 通用验证 (common/)

#### 邮箱验证 (src/common/email.ts)
```typescript
import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, '请输入邮箱地址')
  .email('请输入有效的邮箱地址')
  .max(255, '邮箱地址不能超过255位字符')

export type EmailInput = z.infer<typeof emailSchema>

// 验证单个邮箱
export const isValidEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

// 验证多个邮箱（逗号分隔）
export const multipleEmailsSchema = z
  .string()
  .refine(
    (val) => {
      const emails = val.split(',').map((e) => e.trim())
      return emails.every((email) => isValidEmail(email))
    },
    { message: '包含无效的邮箱地址' }
  )

export type MultipleEmailsInput = z.infer<typeof multipleEmailsSchema>
```

#### 手机验证 (src/common/phone.ts)
```typescript
import { z } from 'zod'

// 中国手机号验证
export const chinesePhoneSchema = z
  .string()
  .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码')

// 国际手机号验证（简单版）
export const internationalPhoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, '请输入有效的国际手机号码')

// 通用手机号验证
export const phoneSchema = z
  .string()
  .min(1, '请输入手机号码')
  .regex(/^\+?[1-9]\d{6,15}$/, '请输入有效的手机号码')

export type PhoneInput = z.infer<typeof phoneSchema>

export const isValidPhone = (phone: string): boolean => {
  try {
    phoneSchema.parse(phone)
    return true
  } catch {
    return false
  }
}
```

#### 密码验证 (src/common/password.ts)
```typescript
import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(1, '请输入密码')
  .min(8, '密码至少8位字符')
  .max(100, '密码不能超过100位字符')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    '密码必须包含大小写字母和数字'
  )

export const strongPasswordSchema = z
  .string()
  .min(1, '请输入密码')
  .min(12, '强密码至少12位字符')
  .max(100, '密码不能超过100位字符')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    '强密码必须包含大小写字母、数字和特殊字符'
  )

export type PasswordInput = z.infer<typeof passwordSchema>

export const passwordStrength = (password: string): {
  score: number
  label: string
  feedback: string[]
} => {
  let score = 0
  const feedback: string[] = []

  if (password.length < 8) {
    feedback.push('密码至少8位字符')
  } else {
    score += 1
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('至少包含一个小写字母')
  } else {
    score += 1
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('至少包含一个大写字母')
  } else {
    score += 1
  }

  if (!/\d/.test(password)) {
    feedback.push('至少包含一个数字')
  } else {
    score += 1
  }

  if (!/[@$!%*?&]/.test(password)) {
    feedback.push('至少包含一个特殊字符')
  } else {
    score += 1
  }

  const labels = ['很弱', '弱', '一般', '强', '很强']
  const label = labels[Math.min(score, 4)]

  return { score, label, feedback }
}
```

#### URL验证 (src/common/url.ts)
```typescript
import { z } from 'zod'

export const urlSchema = z
  .string()
  .url('请输入有效的URL')
  .max(2048, 'URL不能超过2048位字符')

export const imageUrlSchema = z
  .string()
  .url('请输入有效的图片URL')
  .refine(
    (url) => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
      return imageExtensions.some((ext) =>
        url.toLowerCase().includes(ext)
      )
    },
    { message: 'URL必须指向图片文件' }
  )

export type UrlInput = z.infer<typeof urlSchema>
export type ImageUrlInput = z.infer<typeof imageUrlSchema>
```

#### 用户名验证 (src/common/username.ts)
```typescript
import { z } from 'zod'

export const usernameSchema = z
  .string()
  .min(1, '请输入用户名')
  .min(3, '用户名至少3位字符')
  .max(30, '用户名不能超过30位字符')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    '用户名只能包含字母、数字、下划线和连字符'
  )

export const usernameWithChineseSchema = z
  .string()
  .min(1, '请输入用户名')
  .min(2, '用户名至少2位字符')
  .max(50, '用户名不能超过50位字符')
  .regex(
    /^[a-zA-Z0-9_\-\u4e00-\u9fa5]+$/,
    '用户名只能包含字母、数字、中文、下划线和连字符'
  )

export type UsernameInput = z.infer<typeof usernameSchema>

export const isValidUsername = (username: string): boolean => {
  try {
    usernameSchema.parse(username)
    return true
  } catch {
    return false
  }
}
```

## React Hook Form集成

### 自定义Hook (src/hooks/use-form.ts)
```typescript
import { useForm, type UseFormProps, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ZodSchema } from 'zod'

export function useZodForm<T extends FieldValues>(
  schema: ZodSchema<T>,
  options: Omit<UseFormProps<T>, 'resolver'> = {}
) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...options,
  })

  return form
}

// 使用示例
const form = useZodForm(loginSchema, {
  defaultValues: {
    email: '',
    password: '',
  },
})
```

### 组件使用示例
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@tongdelove/validators/auth/login'

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginInput) => {
    console.log(data)
    // 处理登录逻辑
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label>邮箱</label>
        <input
          type="email"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <span>{form.formState.errors.email.message}</span>
        )}
      </div>

      <div>
        <label>密码</label>
        <input
          type="password"
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <span>{form.formState.errors.password.message}</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            {...form.register('rememberMe')}
          />
          记住我
        </label>
      </div>

      <button type="submit">登录</button>
    </form>
  )
}
```

## 主入口 (src/index.ts)

```typescript
// Auth validators
export { loginSchema, type LoginInput, loginResolver } from './auth/login'
export { registerSchema, type RegisterInput, registerResolver } from './auth/register'
export {
  resetPasswordSchema,
  newPasswordSchema,
  changePasswordSchema,
  type ResetPasswordInput,
  type NewPasswordInput,
  type ChangePasswordInput,
} from './auth/reset-password'

// User validators
export {
  createUserSchema,
  type CreateUserInput,
  createUserResolver,
} from './user/create-user'
export {
  updateProfileSchema,
  type UpdateProfileInput,
  updateProfileResolver,
} from './user/update-profile'

// Product validators
export {
  createProductSchema,
  type CreateProductInput,
  createProductResolver,
} from './product/create-product'

// Order validators
export {
  createOrderSchema,
  type CreateOrderInput,
  createOrderResolver,
} from './order/create-order'

// Contact validators
export {
  contactFormSchema,
  type ContactFormInput,
  contactFormResolver,
} from './contact/contact-form'

// Common validators
export { emailSchema, type EmailInput, isValidEmail } from './common/email'
export {
  chinesePhoneSchema,
  internationalPhoneSchema,
  phoneSchema,
  type PhoneInput,
  isValidPhone,
} from './common/phone'
export {
  passwordSchema,
  strongPasswordSchema,
  type PasswordInput,
  passwordStrength,
} from './common/password'
export { urlSchema, imageUrlSchema, type UrlInput, type ImageUrlInput } from './common/url'
export {
  usernameSchema,
  usernameWithChineseSchema,
  type UsernameInput,
  isValidUsername,
} from './common/username'

// Utils
export { useZodForm } from './hooks/use-form'
```

## 依赖详情

### 核心依赖
```json
{
  "zod": "^3.23.8"                               // 数据验证
}
```

### 开发依赖
```json
{
  "@tongdelove/eslint-config": "workspace:*",    // ESLint配置
  "@tongdelove/prettier-config": "workspace:*",  // Prettier配置
  "@tongdelove/typescript-config": "workspace:^", // TypeScript配置
  "typescript": "^5.4.5"                         // TypeScript
}
```

### Peer依赖
```json
{
  "react-hook-form": "^7.0.0"                    // 表单管理（可选）
}
```

## 开发命令

```bash
# 构建
pnpm build                                       # TypeScript编译
pnpm dev                                         # 监听模式编译

# 代码质量
pnpm lint                                        # ESLint检查
pnpm format                                      # Prettier格式化
pnpm typecheck                                   # TypeScript检查

# 清理
pnpm clean                                       # 清理缓存
```

## 最佳实践

### 1. 验证规则设计
- 保持验证规则的单一职责
- 使用有意义的错误消息
- 平衡严格性和灵活性

### 2. 性能优化
- 避免在验证器中执行复杂计算
- 使用可选验证减少不必要的检查
- 合理使用条件验证

### 3. 用户体验
- 提供清晰的错误提示
- 实时验证反馈
- 支持前端和后端验证

### 4. 错误处理
- 提供完整的错误信息
- 区分不同类型的错误
- 处理边界情况

## 常见问题

### Q: 如何创建自定义验证器？
A:
```typescript
import { z } from 'zod'

// 自定义验证器
const customValidator = z.string().refine(
  (val) => {
    // 验证逻辑
    return val.includes('expected-value')
  },
  { message: '包含期望的值' }
)

// 复杂验证
const complexSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine(
  (data) => data.endDate > data.startDate,
  { message: '结束日期必须晚于开始日期', path: ['endDate'] }
)
```

### Q: 如何组合多个验证器？
A:
```typescript
import { z } from 'zod'

// 联合验证
const unionSchema = z.union([
  z.string().email(),
  z.string().regex(/^\+?[1-9]\d{6,15}$/),
])

// 对象合并
const baseUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

const userWithRoleSchema = baseUserSchema.extend({
  role: z.enum(['admin', 'user']),
})
```

## 相关资源

- [Zod文档](https://zod.dev/)
- [React Hook Form文档](https://react-hook-form.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

*最后更新: 2025-11-02*
