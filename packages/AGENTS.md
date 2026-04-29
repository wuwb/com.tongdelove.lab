# AGENTS.md - Shared Packages

> **Last Updated**: 2025-02-27  
> **Purpose**: Shared libraries and utilities for the monorepo  
> **Build System**: Turborepo

---

## 📦 Package Overview

The packages directory contains **shared libraries** used across multiple applications in the monorepo.

```
packages/
├── ui/                    # UI component library (Chakra/tailwind)
├── schema/                # Prisma/Zod data models
├── auth/                  # Authentication & authorization
├── utils/                 # Common utility functions
├── hooks/                 # Custom React hooks
├── db/                    # Database utilities (Prisma helpers)
├── api/                   # tRPC API client
├── validators/            # Form validators (Zod)
├── core-lib/              # Core business logic
├── i18n/                  # Internationalization utilities
├── common-i18n/           # Translation files
└── design/                # Design system
```

---

## 🎯 Package Matrix

| Package                    | Purpose         | Key Exports                       | Consumers                     |
| -------------------------- | --------------- | --------------------------------- | ----------------------------- |
| **@tongdelove/ui**         | UI components   | Button, Dialog, Input, ..., theme | web, lab, admin, desktop, lab |
| **@tongdelove/schema**     | Database models | PrismaClient, Zod schemas         | server, all apps              |
| **@tongdelove/auth**       | Auth logic      | AuthProvider, useAuth             | web, lab                      |
| **@tongdelove/utils**      | Utilities       | formatDate, formatNumber, ...     | Multiple packages             |
| **@tongdelove/hooks**      | React hooks     | useLocalStorage, useDebounce, ... | Frontend apps                 |
| **@tongdelove/db**         | Prisma helpers  | PrismaService, query helpers      | server                        |
| **@tongdelove/api**        | tRPC client     | api router, client types          | Frontend apps                 |
| **@tongdelove/validators** | Zod validators  | userSchema, productSchema, ...    | Forms, API validation         |
| **@tongdelove/i18n**       | i18n utilities  | useTranslation, formatMessage     | Frontend apps                 |
| **@tongdelove/design**     | Design tokens   | colors, spacing, typography       | UI components                 |

---

## 📁 Package Details

### @tongdelove/ui

**Purpose**: Shared UI component library

**Key Files**:

```
packages/ui/
├── src/
│   ├── components/     # UI components (50+)
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── input/
│   │   └── ...
│   ├── theme/          # Chakra theme
│   └── index.ts        # Barrel exports
├── tailwind.config.ts  # Tailwind configuration
└── package.json
```

**Tech Stack**: Chakra UI, Tailwind CSS, React

**Usage**:

```typescript
import { Button, Dialog, Input } from '@tongdelove/ui'

export function MyComponent() {
  return (
    <Button variant="primary">Click me</Button>
  )
}
```

**See Also**: `packages/ui/AGENTS.md`

### @tongdelove/schema

**Purpose**: Database models and type definitions

**Key Files**:

```
packages/schema/
├── src/
│   ├── db/            # Prisma models
│   │   ├── article.ts
│   │   ├── book.ts
│   │   ├── comment.ts
│   │   └── ...
│   ├── generated/     # Auto-generated types
│   └── index.ts
└── package.json
```

**Includes**:

- Prisma client types
- Zod schemas from Prisma models
- Database enum types

**Usage**:

```typescript
import { Article, Book, Comment } from '@tongdelove/schema'
import { ArticleModelSchema } from '@tongdelove/schema'

// Type safety for database operations
const article: Article = { ... }

// Validation
const result = ArticleModelSchema.parse(data)
```

**See Also**: `packages/schema/CLAUDE.md`

### @tongdelove/auth

**Purpose**: Authentication & authorization

**Key Files**:

```
packages/auth/
├── src/
│   ├── index.ts       # Main exports
│   ├── auth/          # Auth logic
│   ├── session/       # Session management
│   └── env.ts         # Environment variables
├── package.json
└── tsconfig.json
```

**Exports**:

- Auth providers for NextAuth
- Session helpers
- Auth utilities

**Usage**:

```typescript
import { AuthProvider, useAuth } from '@tongdelove/auth'

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
```

### @tongdelove/utils

**Purpose**: Common utility functions

**Key Files**:

```
packages/utils/
├── src/
│   ├── arrays.ts      # Array utilities
│   ├── strings.ts     # String utilities
│   ├── numbers.ts     # Number utilities
│   ├── dates.ts       # Date utilities
│   └── index.ts
└── package.json
```

**Exports**:

- Array operations (group, sort, unique)
- String formatting (capitalize, slugify)
- Number formatting (currency, percentage)
- Date formatting (relative, absolute)

**Usage**:

```typescript
import { formatCurrency, formatDate } from '@tongdelove/utils'

const date = formatDate(new Date())
const price = formatCurrency(19.99, 'USD')
```

### @tongdelove/hooks

**Purpose**: Custom React hooks

**Key Files**:

```
packages/hooks/
├── src/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   ├── useMediaQuery.ts
│   └── index.ts
└── package.json
```

**Exports**:

- `useLocalStorage` - Persist state to localStorage
- `useDebounce` - Debounce callbacks
- `useMediaQuery` - Respond to media queries
- `useDimensions` - Get element dimensions

**Usage**:

```typescript
import { useDebounce, useLocalStorage } from '@tongdelove/hooks'

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', '')
  const debouncedValue = useDebounce(value, 500)
  // ...
}
```

### @tongdelove/db

**Purpose**: Database utilities (server-side only)

**Key Files**:

```
packages/db/
├── src/
│   ├── client.ts      # Prisma client instance
│   ├── schema.ts      # Database schema imports
│   └── helpers.ts     # Query helpers
└── package.json
```

**Usage** (NestJS services):

```typescript
import { PrismaClient } from '@tongdelove/db'

@Injectable()
export class UsersService {
  private prisma = new PrismaClient()

  async findAll() {
    return this.prisma.user.findMany()
  }
}
```

### @tongdelove/api

**Purpose**: tRPC API client (if used)

**Note**: Check if this package is active. Some projects use REST instead.

### @tongdelove/validators

**Purpose**: Zod validators for forms and API validation

**Key Files**:

```
packages/validators/
├── src/
│   ├── user.ts        # User form validators
│   ├── product.ts     # Product validators
│   └── index.ts
└── package.json
```

**Usage**:

```typescript
import { userLoginSchema } from '@tongdelove/validators'
import { z } from 'zod'

async function login(data: unknown) {
  const validated = userLoginSchema.parse(data)
  // Auth logic
}
```

### @tongdelove/i18n

**Purpose**: Internationalization utilities

**Key Files**:

```
packages/i18n/
├── src/
│   ├── index.ts
│   └── locales/       # Translation files (likely)
└── package.json
```

### @tongdelove/common-i18n

**Purpose**: Shared translation files

**Note**: Contains translation strings used across multiple apps

---

## 🔑 Working Conventions

### Package Structure Pattern

**Standard Package Layout**:

```
my-package/
├── src/
│   ├── index.ts       # Public API
│   ├── internal/      # Internal utilities
│   └── types.ts       # Package types
├── package.json       # Dependencies
├── tsconfig.json     # TypeScript config
├── tsconfig.lint.json # Linting config
└── README.md (optional)
```

### Export Pattern

**index.ts (Barrel Export)**:

```typescript
// Re-export everything from internal files
export * from './components'
export * from './utils'
export { myFunction } from './internal/helpers'

// Or explicit named exports
export { ComponentA, ComponentB } from './components'
export * from './types'
```

### TypeScript Configuration

**Extends Base Config**:

```json
{
  "extends": "@tongdelove/typescript-config/base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  }
}
```

### Dependencies Pattern

**Workspace Protocol**:

```json
{
  "dependencies": {
    "@tongdelove/ui": "workspace:*",
    "@tongdelove/utils": "workspace:*"
  }
}
```

---

## 🔧 Development Workflow

### Adding a New Package

```bash
# 1. Create directory
mkdir packages/my-package
cd packages/my-package

# 2. Initialize
pnpm init

# 3. Update package.json
```

**package.json Template**:

```json
{
  "name": "@tongdelove/my-package",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

### Building Specific Package

```bash
pnpm --filter @tongdelove/my-package build
```

### Testing Package

```bash
pnpm --filter @tongdelove/my-package test
```

---

## 🚫 Anti-Patterns to Avoid

1. **Circular dependencies**
   - ❌ Package A depends on B, B depends on A
   - ✅ Extract common code to a third package

2. **Bloating shared packages**
   - ❌ Adding app-specific code to `utils`
   - ✅ Keep packages minimal and focused

3. **Breaking changes without version update**
   - ❌ Changing public API without bumping version
   - ✅ Use semver: Major.Minor.Patch

4. **Direct imports from other packages**
   - ❌ `import from '../../../ui/src/components'`
   - ✅ `import from '@tongdelove/ui'`

5. **Skipping TypeScript strict mode**
   - ❌ `"strict": false`
   - ✅ `"strict": true` (inherited from base)

---

## 🔍 Dependency Graph

```
                    ┌──────────────┐
                    │ @tongdelove/ │
                    │   schema     │
                    └──────┬───────┘
                           │
      ┌─────────────────────┼─────────────────────┐
      │                     │                     │
┌─────▼─────┐      ┌──────▼──────┐     ┌──────▼──────┐
│     ui     │      │     auth     │     │    db       │
│  (Mantine) │      │ (NextAuth)  │     │ (Prisma)    │
└─────┬─────┘      └─────────────┘     └─────────────┘
      │
      ├──────────┬──────────┐
      │          │          │
  ┌───▼───┐ ┌──▼────┐ ┌───▼──────┐
  │ web   │ │ lab   │ │ desktop  │
  └───────┘ └───────┘ └──────────┘

packages/utils, packages/hooks, packages/validators
are used by multiple consumers where appropriate.
```

---

## 📊 Package Sizes

| Package | Source Files     | Approx. LOC | Purpose           |
| ------- | ---------------- | ----------- | ----------------- |
| ui      | 50+ components   | 1000+       | Component library |
| schema  | 20+ models       | 500+        | Database models   |
| utils   | 5+ utility files | 500+        | Utility functions |
| auth    | 5+ files         | 300+        | Authentication    |
| hooks   | 5+ hooks         | 300+        | React hooks       |

---

## 🤝 Contributing

When working on packages:

1. Keep packages focused and minimal
2. Use workspace protocol for internal dependencies
3. Export public API via `index.ts`
4. Include TypeScript types
5. Run typecheck before committing
6. Document breaking changes in CHANGELOG
7. Use semantic versioning

---

_For package-specific documentation, see individual package AGENTS.md files_
