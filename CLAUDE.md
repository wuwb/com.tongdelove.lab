# CLAUDE

### Directory Structure

```
com.tongdelove.lab/
├── apps/                      # Frontend applications
│   ├── desktop/               # Electron desktop app (Three-tier: main/preload/renderer)
│   ├── web/                   # Next.js 14 packaging website
│   ├── lab/                   # Next.js 16 multi-module lab (resume, holiday avatar, printing)
│   ├── extension/             # WXT browser extension (1688, Temu platforms)
│   ├── design/                # Next.js packaging design tool (Konva.js)
│   ├── admin/                 # Refine/Umi admin dashboard
│   └── mobile/                # Expo React Native mobile app
├── services/                  # Backend services
│   ├── server/                # NestJS REST + GraphQL API (Prisma + PostgreSQL)
│   ├── node-api/              # Express API (legacy)
│   ├── python-api/            # Python service
│   └── recommendation-api/     # Recommendation algorithm service
├── packages/                  # Shared libraries
│   ├── ui/                    # UI component library (Chakra/Mantine + Tailwind)
│   ├── schema/                # Prisma/Zod data models
│   ├── auth/                  # Authentication/authorization module
│   ├── utils/                 # Common utilities
│   ├── hooks/                 # Custom React hooks
│   ├── db/                    # Database utilities (Prisma helpers)
│   ├── api/                   # tRPC API client
│   ├── validators/            # Form validators (Zod)
│   ├── core-lib/              # Core business logic
│   ├── i18n/                  # Internationalization utilities
│   ├── common-i18n/           # Translation files
│   ├── design/                # Design system
│   └── wechat/*               # WeChat SDK wrappers (mp, gzh, pay)
├── prisma/                    # Prisma client generation
├── tooling/                   # Shared tooling configs
├── pnpm-workspace.yaml        # pnpm workspace definition
└── package.json              # Root package scripts
```
