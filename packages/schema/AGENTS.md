# AGENTS.md - Schema Package

> **Last Updated**: 2025-02-27
> **Purpose**: Database models and type definitions
> **Tech**: Prisma ORM + Zod validation

---

## 📦 Database Models

The `@tongdelove/schema` package provides shared database models used by the server and applications.

### Directory Structure

```
packages/schema/
├── src/
│   ├── db/                # Prisma models
│   │   ├── article.ts      # Article/Content models
│   │   ├── book.ts         # Book models
│   │   ├── bookchapter.ts  # Book chapter models
│   │   ├── bookstar.ts     # Book star models
│   │   ├── comment.ts      # Comment models
│   │   ├── box.ts          # Box packaging models
│   │   ├── user.ts         # User models
│   │   ├── commodities.ts  # Commodities models
│   │   └── ...
│   ├── generated/         # Auto-generated Prisma types
│   └── index.ts            # Exports
└── package.json
```

### Key Models

#### User Management

- `UserModel.ts` - User accounts and profiles
- `AccountModel.ts` - Third-party account links

#### Content Management

- `ArticleModel.ts` - Articles, blog posts
- `BookModel.ts` - Books
- `BookChapterModel.ts` - Book chapters
- `CommentModel.ts` - Comments system

#### Product Management

- `BoxType`, `PaperType`, `DetailType` enums
- `ProductModel.ts`, `CommoditiesModel.ts`

#### Financial

- `CreditTransactionModel.ts` - Credit system
- `CreditTransactionModel.ts` - Subscription webhooks

#### System

- `FreelancerTaskModel.ts` - Freelance tasks
- `SubscribeWebhookModel.ts` - Webhooks

---

## 🔑 Usage

### Importing Types

```typescript
import { Article, Book, BookChapter, Comment, User } from '@tongdelove/schema'
```

### Using Prisma Types

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const article = await prisma.article.findMany({
  include: {
    author: true,
    categories: true,
  },
})
```

### Zod Validation

```typescript
import { ArticleModelSchema } from '@tongdelove/schema'
import { z } from 'zod'

const result = ArticleModelSchema.safeParse(data)
if (!result.success) {
  // Handle validation errors
}
```

---

## 🔧 Development

### Prisma Operations

```bash
# Generate client
pnpm --filter @tongdelove/schema build

# Generate types only
prisma generate

# Create migration
prisma migrate dev --create-only
```

### Adding New Model

1. Add to Prisma schema: `prisma/schema.prisma`
2. Run `prisma generate`
3. Add TypeScript wrapper in `src/db/`
4. Add Zod schema if needed

---

## 📊 Model Relationships

```
User (1) ----< (N) Article
User (1) ----< (N) Comment
Article (1) ----< (N) Comment
Book (1) ----< (N) BookChapter
Book (N) ----< (M) BookStar
```

---

## 🤝 Contributing

1. Prisma schema changes require migration
2. TypeScript types auto-generated
3. Keep models in sync with database
4. Use Zod schemas for validation

---

_For full database schema, see `prisma/schema.prisma` in the database directory_
