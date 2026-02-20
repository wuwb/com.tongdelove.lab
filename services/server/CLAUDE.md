# 服务器模块 - services/server

## 导航

> 根目录 / [服务层](../CLAUDE.md#服务层详解) / **server**

## 概述

**核心API服务** - 基于NestJS构建的企业级后端API服务，提供GraphQL、REST、WebSocket等多种接口

## 技术栈

- **框架**: NestJS 10.3.7
- **语言**: TypeScript 5.4.5
- **数据库**: PostgreSQL (Prisma), MySQL, MongoDB
- **ORM**: Prisma 5.20.0
- **GraphQL**: Apollo Server 4.9.3
- **缓存**: Redis, Cache Manager
- **消息队列**: Bull (Redis)
- **认证**: JWT, Passport
- **文档**: Swagger (OpenAPI 3.0)

## 目录结构

```
services/server/
├── src/
│   ├── main.ts                 # 应用入口
│   ├── app.module.ts           # 根模块
│   ├── common/                 # 通用模块
│   │   ├── adapters/           # 适配器
│   │   ├── decorators/         # 装饰器
│   │   ├── filters/            # 过滤器
│   │   ├── guards/             # 守卫
│   │   ├── interceptors/       # 拦截器
│   │   └── pipes/              # 管道
│   ├── config/                 # 配置模块
│   │   ├── config.default.ts   # 默认配置
│   │   └── database.config.ts  # 数据库配置
│   ├── core/                   # 核心模块
│   │   ├── database/           # 数据库层
│   │   │   ├── prisma/         # Prisma服务
│   │   │   └── typeorm/        # TypeORM服务
│   │   ├── wechat-auth/        # 微信认证
│   │   └── core.module.ts      # 核心模块
│   ├── modules/                # 业务模块
│   │   ├── app/                # 应用配置
│   │   ├── cms/                # CMS模块
│   │   │   ├── ad/             # 广告管理
│   │   │   ├── authors/        # 作者管理
│   │   │   ├── photo/          # 图片管理
│   │   │   └── post/           # 文章管理
│   │   ├── erp/                # ERP模块
│   │   ├── mall/               # 商城模块
│   │   ├── stock/              # 库存模块
│   │   ├── system/             # 系统管理
│   │   │   ├── access/         # 权限管理
│   │   │   ├── account/        # 账户管理
│   │   │   ├── role/           # 角色管理
│   │   │   └── user/           # 用户管理
│   │   └── tech/               # 技术模块
│   │       └── github/         # GitHub集成
│   └── shared/                 # 共享服务
│       └── services/           # 共享服务类
├── prisma/                     # Prisma配置
│   └── schema.prisma           # 数据模型
├── api-docs.json               # Swagger文档
├── docker-compose.yml          # Docker配置
├── package.json
└── nest-cli.json
```

## 核心模块

### 1. 数据库层 (src/core/database/)

#### Prisma模块

- **服务**: `prisma/prisma.service.ts`
- **功能**: Prisma客户端管理
- **特性**:
  - 连接池管理
  - 事务支持
  - 钩子函数
  - 软删除

#### TypeORM模块 (弃用)

- **状态**: 逐步迁移到Prisma
- **历史**: 曾使用的ORM解决方案

### 2. 系统管理模块 (src/modules/system/)

#### 访问控制 (access)

- **控制器**: `access.controller.ts`
- **服务**: `access.service.ts`
- **功能**: 权限分配、资源管理

#### 账户管理 (account)

- **控制器**: `account.controller.ts`
- **服务**: `account.service.ts`
- **功能**: 用户账户CRUD、登录认证

#### 角色管理 (role)

- **控制器**: `role.controller.ts`
- **服务**: `role.service.ts`
- **功能**: 角色定义、权限绑定

#### 用户管理 (user)

- **实体**: `user.entity.ts`
- **服务**: `user.service.ts`
- **功能**: 用户信息管理、Profile

### 3. CMS模块 (src/modules/cms/)

#### 文章管理 (post)

- **服务**: `post.service.ts`
- **功能**: 文章CRUD、分类管理、标签系统

#### 图片管理 (photo)

- **控制器**: `photo.controller.ts`
- **服务**: `photo.service.ts`
- **功能**: 图片上传、CDN管理、图片处理

#### 广告管理 (ad)

- **实体**: `ad.entity.ts`
- **服务**: `ad.service.ts`
- **功能**: 广告位管理、展示统计

### 4. 商城模块 (src/modules/mall/)

#### 产品管理 (products)

- **服务**: `products.service.ts`
- **功能**: 产品CRUD、库存同步、价格管理

#### 客户管理 (customer)

- **服务**: `customer.service.ts`
- **功能**: 客户信息、订单历史、积分系统

### 5. 微信认证 (src/core/wechat-auth/)

- **服务**: `wechat-auth.service.ts`
- **功能**:
  - 微信授权登录
  - JSSDK集成
  - 网页授权
  - 消息推送

## 依赖详情

### 核心依赖

```json
{
  "@nestjs/core": "^10.3.7", // NestJS核心
  "@nestjs/common": "^10.3.7", // 通用模块
  "@nestjs/platform-express": "^10.1.0", // Express适配器
  "@nestjs/graphql": "^12.0.8", // GraphQL支持
  "@nestjs/apollo": "^12.0.7", // Apollo集成
  "@nestjs/config": "^3.0.0", // 配置管理
  "@nestjs/jwt": "10.1.0", // JWT认证
  "@nestjs/passport": "^10.0.0", // Passport集成
  "@nestjs/schedule": "^3.0.1", // 定时任务
  "@nestjs/websockets": "^10.1.0", // WebSocket支持
  "prisma": "^7.3.0", // Prisma ORM
  "@prisma/client": "^7.3.0", // Prisma客户端
  "graphql": "^16.7.1", // GraphQL核心
  "apollo-server-core": "^3.12.0" // Apollo服务器
}
```

### 数据库

```json
{
  "mysql2": "3.5.2", // MySQL驱动
  "pg": "^8.11.1", // PostgreSQL驱动
  "mongoose": "^7.4.0", // MongoDB驱动
  "typeorm": "^0.3.17", // TypeORM (遗留)
  "prisma-nestjs-graphql": "^21.2.0" // Prisma GraphQL生成
}
```

### 缓存与消息队列

```json
{
  "cache-manager": "^5.2.3", // 缓存管理
  "ioredis": "^5.4.1", // Redis客户端
  "bull": "^4.10.4", // 任务队列
  "@nestjs/bull": "^10.0.1" // Bull集成
}
```

### 认证与安全

```json
{
  "bcryptjs": "^2.4.3", // 密码加密
  "jsonwebtoken": "^9.0.2", // JWT处理
  "passport": "^0.7.0", // 认证框架
  "passport-jwt": "^4.0.1", // JWT策略
  "passport-local": "^1.0.0", // 本地策略
  "passport-github2": "^0.1.12" // GitHub OAuth
}
```

### 第三方集成

```json
{
  "@aws-sdk/client-s3": "^3.374.0", // AWS S3
  "ali-oss": "^6.17.1", // 阿里云OSS
  "@sendgrid/mail": "^7.7.0", // 邮件服务
  "@sentry/node": "^7.59.3", // 错误追踪
  "nodemailer": "^6.9.4", // 邮件发送
  "alipay-sdk": "^3.4.0", // 支付宝SDK
  "cheerio": "1.0.0-rc.12" // HTML解析
}
```

## API文档

### GraphQL API

- **端点**: `/graphql`
- **Playground**: 开发环境可用
- **Schema**: 自动生成自Prisma模型

### REST API

- **文档**: Swagger UI (`/api`)
- **格式**: OpenAPI 3.0
- **认证**: Bearer Token

### WebSocket

- **协议**: Socket.IO
- **功能**: 实时通知、聊天

## 环境变量

### 数据库配置

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
DIRECT_URL=postgresql://user:pass@localhost:5432/db
```

### 认证配置

```bash
AUTH_SECRET=your-jwt-secret
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
AUTH_REDIRECT_PROXY_URL=http://localhost:3000
```

### 第三方服务

```bash
# 邮件服务
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=noreply@example.com

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket

# Redis
REDIS_URL=redis://localhost:6379

# 微信
WECHAT_APP_ID=your-app-id
WECHAT_APP_SECRET=your-app-secret
```

## 开发命令

```bash
# 开发
pnpm dev                          # 启动开发服务器
pnpm start:debug                  # 调试模式
pnpm build                        # 生产构建
pnpm start:prod                   # 生产启动

# 数据库
pnpm generate                     # 生成Prisma客户端
pnpm db:migrate-save              # 创建迁移
pnpm db:migrate-up                # 应用迁移
pnpm db:init                      # 初始化数据库
pnpm db:clean                     # 清空数据库
pnpm studio                       # Prisma Studio
pnpm seed                         # 种子数据

# 代码质量
pnpm lint                         # ESLint检查
pnpm lint:fix                     # 自动修复
pnpm format                       # Prettier格式化

# 文档
pnpm api                          # 生成GraphQL schema
```

## Docker支持

### 开发环境

```bash
pnpm compose:up                   # 启动所有服务
pnpm compose:down                 # 停止并删除容器
```

### 生产构建

```bash
docker build -t server .
docker run -p 3001:3001 server
```

## 数据库迁移

### 创建迁移

```bash
pnpm db:migrate-save --name init
```

### 重置数据库

```bash
pnpm db:clean
pnpm db:init
```

## 常见问题

### Q: 如何添加新的API端点？

A:

1. 创建Module: `nest g module module-name`
2. 创建Service: `nest g service module-name`
3. 创建Controller: `nest g controller module-name`
4. 在AppModule中导入新模块

### Q: 如何更新数据库模型？

A:

1. 修改 `prisma/schema.prisma`
2. 运行 `pnpm db:migrate-save --name description`
3. 运行 `pnpm generate` 更新客户端

### Q: 如何添加GraphQL查询？

A:

1. 在Prisma Schema中定义模型
2. 使用 `@nestjs/graphql` 装饰器
3. 创建Resolver类
4. 定义查询方法

### Q: 如何配置缓存？

A:

```typescript
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key)
  }
}
```

## 性能优化

### 数据库

- 使用Prisma连接池
- 查询优化 (索引、限制)
- 读写分离

### 缓存

- Redis缓存热点数据
- 查询结果缓存
- 页面级缓存

### 监控

- Sentry错误追踪
- Winston日志
- 性能指标收集

---

_最后更新: 2025-11-02_
