# 数据库工具包 - packages/db

## 导航

> 根目录 / [共享包](../CLAUDE.md#共享包详解) / **db**

## 概述

**数据库工具包** - 基于Drizzle ORM和MySQL的现代数据库操作层

## 技术栈

- **ORM**: Drizzle ORM 0.30.4
- **数据库**: MySQL 3.9.2, PlanetScale Database 1.16.0
- **环境变量**: @t3-oss/env-core 0.10.0
- **验证**: Zod 3.23.8
- **工具**: Drizzle Kit 0.20.14
- **类型**: TypeScript 5.4.5

## 目录结构

```
packages/db/
├── src/
│   ├── schema/                 # 数据模型
│   │   ├── auth.ts             # 认证相关表
│   │   ├── user.ts             # 用户表
│   │   ├── post.ts             # 文章表
│   │   └── index.ts            # 统一导出
│   ├── migrations/             # 数据库迁移
│   ├── config.ts               # Drizzle配置
│   ├── client.ts               # 数据库客户端
│   ├── index.ts                # 主入口
│   └── utils/                  # 工具函数
│       ├── query.ts            # 查询工具
│       └── transaction.ts      # 事务工具
├── .env                        # 环境变量
├── drizzle.config.ts           # Drizzle Kit配置
├── package.json
└── tsconfig.json
```

## Drizzle配置

### drizzle.config.ts
```typescript
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './src/migrations',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
```

### config.ts
```typescript
import { defineConfig } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = defineConfig({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
})
```

## 数据模型

### 用户表 (schema/user.ts)
```typescript
import {
  pgTable,
  varchar,
  timestamp,
  text,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    username: varchar('username', { length: 255 }),
    bio: text('bio'),
    avatar: varchar('avatar', { length: 500 }),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    role: varchar('role', { length: 50 }).default('user').notNull(),
    status: varchar('status', { length: 50 }).default('active').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
    usernameIdx: uniqueIndex('users_username_idx').on(table.username),
    statusIdx: index('users_status_idx').on(table.status),
  })
)

// 关系
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}))
```

### 文章表 (schema/post.ts)
```typescript
import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './user'

export const posts = pgTable(
  'posts',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    excerpt: text('excerpt'),
    coverImage: varchar('cover_image', { length: 500 }),
    status: varchar('status', { length: 50 }).default('draft').notNull(),
    publishedAt: timestamp('published_at', { mode: 'date' }),
    authorId: varchar('author_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('posts_slug_idx').on(table.slug),
    statusIdx: index('posts_status_idx').on(table.status),
    publishedIdx: index('posts_published_idx').on(table.publishedAt),
  })
)

// 关系
export const postsRelations = relations(posts, ({ many, one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}))
```

### 评论表 (schema/comment.ts)
```typescript
import {
  pgTable,
  varchar,
  text,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users, posts } from './index'

export const comments = pgTable(
  'comments',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    content: text('content').notNull(),
    authorId: varchar('author_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    postId: varchar('post_id', { length: 255 })
      .notNull()
      .references(() => posts.id),
    parentId: varchar('parent_id', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    postIdx: index('comments_post_idx').on(table.postId),
    authorIdx: index('comments_author_idx').on(table.authorId),
  })
)

// 关系
export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}))
```

## 数据库客户端

### client.ts
```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from './config'
import * as schema from './schema'

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })
export * as tables from './schema'
```

## 查询操作

### 基础查询 (utils/query.ts)
```typescript
import { db } from '../client'
import { users, posts, comments } from '../schema'
import { eq, desc, and, sql } from 'drizzle-orm'

// 获取用户
export const getUser = async (id: string) => {
  const result = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      posts: {
        where: eq(posts.status, 'published'),
        orderBy: [desc(posts.publishedAt)],
        limit: 10,
      },
    },
  })
  return result
}

// 获取文章列表
export const getPosts = async (limit: number = 20, offset: number = 0) => {
  const result = await db.select({
    id: posts.id,
    title: posts.title,
    slug: posts.slug,
    excerpt: posts.excerpt,
    coverImage: posts.coverImage,
    publishedAt: posts.publishedAt,
    author: {
      id: users.id,
      name: users.name,
      avatar: users.avatar,
    },
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(eq(posts.status, 'published'))
  .orderBy(desc(posts.publishedAt))
  .limit(limit)
  .offset(offset)

  return result
}

// 搜索文章
export const searchPosts = async (query: string, limit: number = 20) => {
  const result = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.status, 'published'),
        sql`MATCH (${posts.title}, ${posts.content}) AGAINST (${query} IN BOOLEAN MODE)`
      )
    )
    .orderBy(desc(posts.publishedAt))
    .limit(limit)

  return result
}

// 统计查询
export const getPostStats = async () => {
  const result = await db
    .select({
      status: posts.status,
      count: sql<number>`COUNT(*)`,
    })
    .from(posts)
    .groupBy(posts.status)

  return result
}
```

### 复杂查询示例
```typescript
import { db } from '../client'
import { posts, users, comments } from '../schema'
import { eq, inArray, sql, count } from 'drizzle-orm'

// 获取热门文章 (基于评论数)
export const getPopularPosts = async (limit: number = 10) => {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      commentCount: sql<number>`COUNT(${comments.id})`,
    })
    .from(posts)
    .leftJoin(comments, eq(posts.id, comments.postId))
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.status, 'published'))
    .groupBy(posts.id, users.name)
    .orderBy(count(comments.id), 'desc')
    .limit(limit)

  return result
}

// 获取相关文章
export const getRelatedPosts = async (postId: string, tags: string[], limit: number = 5) => {
  const result = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.status, 'published'),
        sql`${posts.id} != ${postId}`,
        sql`JSON_OVERLAPS(${posts.tags}, JSON_ARRAY(${tags.map(tag => `"${tag}"`).join(',')}))`
      )
    )
    .limit(limit)

  return result
}
```

## 事务操作

### 事务工具 (utils/transaction.ts)
```typescript
import { db } from '../client'
import { users, posts } from '../schema'
import { eq } from 'drizzle-orm'

// 创建用户和文章
export const createUserWithPost = async (
  userData: typeof users.$inferInsert,
  postData: typeof posts.$inferInsert
) => {
  return await db.transaction(async (tx) => {
    // 创建用户
    const [user] = await tx
      .insert(users)
      .values(userData)
      .returning()

    // 创建文章
    const [post] = await tx
      .insert(posts)
      .values({
        ...postData,
        authorId: user.id,
      })
      .returning()

    return { user, post }
  })
}

// 批量更新文章状态
export const updatePostsStatus = async (
  postIds: string[],
  status: 'published' | 'draft' | 'archived'
) => {
  return await db.transaction(async (tx) => {
    const results = await tx
      .update(posts)
      .set({ status })
      .where(inArray(posts.id, postIds))
      .returning()

    return results
  })
}
```

## 插入操作

### 基础插入
```typescript
import { db } from '../client'
import { users, posts } from '../schema'

// 创建用户
export const createUser = async (userData: typeof users.$inferInsert) => {
  const [result] = await db.insert(users).values(userData).returning()
  return result
}

// 创建文章
export const createPost = async (postData: typeof posts.$inferInsert) => {
  const [result] = await db.insert(posts).values(postData).returning()
  return result
}

// 批量创建
export const createUsers = async (userData: typeof users.$inferInsert[]) => {
  const results = await db.insert(users).values(userData).returning()
  return results
}
```

## 更新操作

### 基础更新
```typescript
import { db } from '../client'
import { users, posts } from '../schema'
import { eq } from 'drizzle-orm'

// 更新用户
export const updateUser = async (
  id: string,
  updates: Partial<typeof users.$inferInsert>
) => {
  const [result] = await db
    .update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  return result
}

// 更新文章
export const updatePostStatus = async (id: string, status: string) => {
  const [result] = await db
    .update(posts)
    .set({
      status,
      publishedAt: status === 'published' ? new Date() : null,
    })
    .where(eq(posts.id, id))
    .returning()

  return result
}
```

## 删除操作

### 基础删除
```typescript
import { db } from '../client'
import { users, posts } from '../schema'
import { eq } from 'drizzle-orm'

// 删除用户
export const deleteUser = async (id: string) => {
  const [result] = await db.delete(users).where(eq(users.id, id)).returning()
  return result
}

// 软删除文章
export const softDeletePost = async (id: string) => {
  return await updatePostStatus(id, 'deleted')
}
```

## 依赖详情

### 核心依赖
```json
{
  "drizzle-orm": "^0.30.4",                   // ORM核心
  "@planetscale/database": "^1.16.0",        // PlanetScale驱动
  "@t3-oss/env-core": "^0.10.0",             // 环境变量
  "zod": "^3.23.8"                            // 数据验证
}
```

### 开发依赖
```json
{
  "drizzle-kit": "^0.20.14",                  // 迁移工具
  "mysql2": "^3.9.2",                         // MySQL驱动
  "dotenv-cli": "^7.4.1",                     // 环境变量
  "typescript": "^5.4.5"                      // TypeScript
}
```

## 环境变量

### 必需变量
```bash
DATABASE_URL=mysql://user:password@localhost:3306/dbname
```

### PlanetScale配置
```bash
# PlanetScale数据库
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/dbname
```

## 开发命令

```bash
# 数据库操作
pnpm push                                    # 推送schema到数据库
pnpm studio                                  # 打开Drizzle Studio
pnpm build                                   # 构建类型定义

# 代码质量
pnpm lint                                    # ESLint检查
pnpm format                                  # Prettier格式化
pnpm typecheck                               # TypeScript检查

# 清理
pnpm clean                                   # 清理缓存
```

## Drizzle Studio

### 启动Studio
```bash
pnpm with-env drizzle-kit studio --config src/config.ts
```

访问 http://localhost:7983 查看数据库界面，可以：
- 浏览表结构
- 查看数据
- 执行查询
- 修改数据

## 最佳实践

### 1. 类型安全
```typescript
// 使用类型推断
type User = typeof users.$inferSelect
type NewUser = typeof users.$inferInsert

// 验证输入
import { z } from 'zod'

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

const createUser = async (data: unknown) => {
  const validated = UserSchema.parse(data)
  return db.insert(users).values(validated).returning()
}
```

### 2. 性能优化
```typescript
// 使用索引
const table = pgTable('table', {
  id: varchar('id').primaryKey(),
}, (table) => ({
  index: index('table_index').on(table.column),
}))

// 选择特定字段
const users = await db
  .select({
    id: users.id,
    name: users.name,
  })
  .from(users)

// 分页查询
const posts = await db
  .select()
  .from(posts)
  .limit(10)
  .offset(20)
```

### 3. 错误处理
```typescript
try {
  const result = await db.insert(users).values(userData)
  return result
} catch (error) {
  if (error.code === '23505') { // 唯一约束违反
    throw new Error('用户已存在')
  }
  throw error
}
```

## 常见问题

### Q: 如何处理一对多关系？
A:
```typescript
// 定义关系
export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
})

export const posts = pgTable('posts', {
  id: varchar('id').primaryKey(),
  authorId: varchar('author_id').references(() => users.id),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

// 查询关系
const user = await db.query.users.findFirst({
  where: eq(users.id, id),
  with: {
    posts: true, // 自动加载关联的文章
  },
})
```

### Q: 如何进行复杂查询？
A: 使用SQL片段
```typescript
import { sql } from 'drizzle-orm'

const result = await db
  .select()
  .from(posts)
  .where(
    sql`DATE(${posts.createdAt}) = CURDATE()`
  )
```

### Q: 如何使用事务？
A:
```typescript
const result = await db.transaction(async (tx) => {
  const [user] = await tx.insert(users).values(userData).returning()
  const [post] = await tx.insert(posts).values({ ...postData, authorId: user.id }).returning()
  return { user, post }
})
```

## 相关资源

- [Drizzle ORM文档](https://orm.drizzle.team/)
- [Drizzle Kit文档](https://orm.drizzle.team/kit-docs/overview)
- [PlanetScale文档](https://planetscale.com/docs)

---

*最后更新: 2025-11-02*
