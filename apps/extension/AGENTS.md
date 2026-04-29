# AGENTS.md - Browser Extension

> **Last Updated**: 2025-02-27
> **Framework**: WXT (Web Extension Tools)
> **Platforms**: Chrome (1688, Temu support)
> **Node**: >=20.x

---

## 🏗️ Architecture Overview

Browser extension built with WXT framework for cross-platform compatibility.

```
apps/extension/
├── src/
│   ├── entrypoints/         # Extension entry points
│   │   ├── background.ts    # Service worker
│   │   ├── popup/           # Popup page
│   │   ├── options/         # Options page
│   │   └── content/         # Content scripts
│   │       ├── 1688.ts     # 1688.com injections
│   │       └── temu.ts      # Temu.com injections
│   ├── components/          # UI components
│   ├── utils/               # Utilities
│   └── styles/              # Styles
└── wxt.config.ts           # WXT configuration
```

---

## 🔑 Key Components

### Background Script

- **File**: `src/entrypoints/background.ts`
- **Purpose**: Service worker, persistent state
- **Tasks**: Event handling, data storage, API calls

### Content Scripts

- **1688.com**: `src/entrypoints/content/1688.ts`
- **Temu.com**: `src/entrypoints/content/temu.ts`
- **Purpose**: DOM manipulation, scraping, UI injection

### Popup

- **File**: `src/entrypoints/popup/index.html`
- **Purpose**: Extension popup interface

### Options Page

- **File**: `src/entrypoints/options/index.html`
- **Purpose**: Settings and configuration

---

## 🔧 Development

```bash
# Start dev mode
pnpm dev

# Build for production
pnpm build

# Watch mode
pnpm dev --watch
```

### WXT Configuration

```typescript
// wxt.config.ts
export default defineConfig({
  manifest: {
    name: 'Packaging Helper',
    version: '1.0.0',
    permissions: ['storage', 'tabs'],
  },
  modules: ['@wxt-dev/module-react'],
})
```

---

## 🎯 Platform-Specific Patterns

### 1688.com Integration

- Product detail page scraping
- Price comparison
- Image extraction

### Temu.com Integration

- Similar features
- Platform-specific selectors

---

## 🤝 Contributing

Content script patterns:

- Isolate platform logic by platform
- Use content script isolation
- Avoid global namespace pollution
- Use WXT's storage API for data persistence

---

_For WXT documentation, see [WXT Documentation](https://wxt.dev)_
