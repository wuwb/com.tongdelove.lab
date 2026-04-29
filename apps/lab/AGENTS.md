# AGENTS.md - Lab Application

> **Last Updated**: 2025-02-27
> **Framework**: Next.js 16 (App Router 3+)
> **Features**: Multi-module app (resume, holiday avatar, study materials)
> **Node**: >=20.x

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
