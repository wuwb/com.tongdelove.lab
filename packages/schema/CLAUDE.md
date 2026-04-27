# Schema共享包 - packages/schema

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **schema**

## 概述

**数据模型定义包** - 基于Zod和Prisma的数据验证和类型定义中心

## 技术栈

- **语言**: TypeScript 5.4.5
- **验证**: Zod 3.23.8
- **数据库**: Prisma Client 5.20.0
- **类型生成**: Prisma JSON Types Generator 3.0.3
- **构建**: TypeScript Compiler

## 目录结构

```
packages/schema/
├── src/
│   ├── db/                      # 数据库模型
│   │   ├── user.ts              # 用户模型
│   │   ├── post.ts              # 文章模型
│   │   ├── comment.ts           # 评论模型
│   │   ├── product.ts           # 产品模型
│   │   ├── order.ts             # 订单模型
│   │   └── index.ts             # 统一导出
│   ├── validators/              # 验证器
│   │   ├── user.ts              # 用户验证
│   │   ├── auth.ts              # 认证验证
│   │   └── index.ts
│   ├── types/                   # 类型定义
│   │   ├── api.ts               # API类型
│   │   ├── graphql.ts           # GraphQL类型
│   │   └── index.ts
│   └── index.ts                 # 主入口
├── dist/                        # 构建输出
├── prisma/                      # Prisma配置
│   └── schema.prisma            # 数据模型
├── package.json
├── tsconfig.json
└── README.md
```

## 核心模型

### 1. 用户模型 (src/db/user.ts)

```typescript
// 基于Zod的用户模型
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
```

### 2. 文章模型 (src/db/post.ts)

```typescript
import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  authorId: z.string().uuid(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Post = z.infer<typeof PostSchema>;
```

### 3. 评论模型 (src/db/comment.ts)

```typescript
import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  postId: z.string().uuid(),
  authorId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
  createdAt: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;
```

## 验证器

### 认证验证 (src/validators/auth.ts)

```typescript
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8位字符'),
});

export const RegisterSchema = LoginSchema.extend({
  username: z.string().min(3, '用户名至少3位字符'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
```

### 用户验证 (src/validators/user.ts)

```typescript
import { z } from 'zod';

export const UserUpdateSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});

export const UserProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/).optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
    zipCode: z.string(),
  }).optional(),
});

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserProfileInput = z.infer<typeof UserProfileSchema>;
```

## API类型

### GraphQL类型 (src/types/graphql.ts)

```typescript
// 基于Prisma生成的GraphQL类型
export interface GraphQLContext {
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  prisma: PrismaClient;
}

// 通用响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 使用示例

### 1. 在服务端使用

```typescript
import { UserSchema } from '@tongdelove/schema';
import type { User } from '@tongdelove/schema';

// 验证用户数据
const userData: User = {
  id: 'uuid',
  email: 'user@example.com',
  username: 'johndoe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

// 验证
const validatedUser = UserSchema.parse(userData);
```

### 2. 在客户端使用

```typescript
import { LoginSchema } from '@tongdelove/schema';
import type { LoginInput } from '@tongdelove/schema';

// 表单验证
const handleSubmit = (data: LoginInput) => {
  // 数据已经过Zod验证
  login(data);
};

// React Hook Form集成
const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
  resolver: zodResolver(LoginSchema),
});
```

### 3. Prisma集成

```typescript
import { PrismaClient } from '@prisma/client';
import { UserSchema } from '@tongdelove/schema';

const prisma = new PrismaClient();

// 创建用户
const createUser = async (data: unknown) => {
  const validatedData = UserSchema.parse(data);
  return prisma.user.create({
    data: validatedData,
  });
};
```

## 构建配置

### package.json配置

```json
{
  "name": "@tongdelove/schema",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch --preserveWatchOutput --sourcemap",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "zod": "^3.23.8"
  },
  "peerDependencies": {
    "@prisma/client": "^7.4.0"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@tongdelove/typescript-config": "workspace:*",
    "@tongdelove/eslint-config": "workspace:*"
  }
}
```

### TypeScript配置

```json
{
  "extends": "@tongdelove/typescript-config",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Prisma集成

### Schema文件 (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 脚本配置

```json
{
  "prisma": {
    "seed": "ts-node scripts/seed.ts",
    "schema": "prisma/schema.prisma"
  },
  "scripts": {
    "generate": "prisma generate --schema=prisma/schema.prisma",
    "db:push": "prisma db push --schema=prisma/schema.prisma",
    "db:migrate": "prisma migrate dev --schema=prisma/schema.prisma"
  }
}
```

## 开发命令

```bash
# 构建
pnpm build                        # 编译TypeScript
pnpm dev                          # 监听模式编译
pnpm clean                        # 清理dist目录

# 代码质量
pnpm lint                         # ESLint检查
pnpm lint:fix                     # 自动修复
pnpm lint:prettier                # Prettier检查

# 数据库
pnpm db:generate                  # 生成Prisma客户端
pnpm db:push                      # 推送schema到数据库
pnpm db:migrate                   # 运行迁移
```

## 类型安全

### 1. 运行时验证
- 使用Zod在运行时验证数据
- 防止无效数据进入系统
- 清晰的错误消息

### 2. 静态类型检查
- TypeScript编译时检查
- 编辑器智能提示
- 提前发现类型错误

### 3. 数据库一致性
- Prisma自动生成类型
- Schema驱动开发
- 前后端类型共享

## 最佳实践

### 1. 模型定义
```typescript
// ✅ 好的做法
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
});

// ❌ 避免
export const UserSchema = z.object({
  id: z.any(),
  email: z.any(),
});
```

### 2. 验证策略
- 使用严格的类型定义
- 提供有意义的错误消息
- 避免使用`z.any()`

### 3. 复用模型
- 通用字段使用接口
- 组合多个模式
- 使用`z.extend()`扩展

## 常见问题

### Q: 如何添加新模型？
A:
1. 在 `src/db/` 下创建文件
2. 使用Zod定义模式
3. 在 `index.ts` 中导出
4. 更新Prisma schema (如需要)

### Q: 如何处理可选字段？
A:
```typescript
const UserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
});
```

### Q: 如何处理联合类型？
A:
```typescript
const StatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('pending'),
]);
```

### Q: 如何自定义验证器？
A:
```typescript
const customValidator = z.string().refine(
  (val) => val.length > 5,
  { message: '必须超过5个字符' }
);
```

## 相关包

- `@prisma/client` - Prisma数据库客户端
- `zod` - TypeScript优先的Schema验证
- `@tongdelove/utils` - 工具函数
- `@tongdelove/validators` - 表单验证

## 参考文档

- [Zod官方文档](https://zod.dev/)
- [Prisma文档](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

*最后更新: 2025-11-02*
