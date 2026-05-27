# AGENTS.md - Desktop Application (Electron)

> **Last Updated**: 2025-02-27
> **Framework**: Electron + React + TypeScript + tailwind + redux-toolkit
> **Build Tool**: electron-vite (Vite 7.x)
> **Architecture**: Three-tier (Main Process | Preload | Renderer)

---

## Architecture Overview

The desktop application is built using **Electron** with a three-tier architecture pattern:

```
├── src/
│   ├── main/                     # Main Process (Node.js)
│   │   ├── index.ts             # Electron entry point
│   │   ├── windows/             # Window management
│   │   ├── ipc/                 # IPC handlers (ollama, settings, database, ai, window)
│   │   └── services/            # Business logic layer
│   │       ├── database/        # SQLite operations
│   │       ├── ai/              # AI provider factory + registry
│   │       ├── ollama.service.ts
│   │       └── store.ts         # State management
│   ├── preload/                 # Preload Script (Secure bridge)
│   │   ├── index.ts             # Preload entry
│   │   └── index.d.ts           # TypeScript definitions
│   └── renderer/                # Renderer Process (React)
│       │── main.tsx         # React entry
│       │── routes.tsx       # Client-side routing
│       │── components/      # UI components organized by feature
│       │── pages/           # Page components (chat, settings)
│       │── hooks/           # Custom React hooks
│       │── types/           # TypeScript types
│       └── index.html
├── electron.vite.config.ts       # Vite build config
├── electron-builder.yml          # Electron Builder packing config
└── package.json
```

---

## 🔑 Core Concepts

### 1. Three-Tier Architecture

| Tier                 | Runtime         | Purpose                                          | Security                         |
| -------------------- | --------------- | ------------------------------------------------ | -------------------------------- |
| **Main Process**     | Node.js         | System access, window management, business logic | Full OS access                   |
| **Preload Script**   | Node.js context | Secure bridge between main and renderer          | Context isolation                |
| **Renderer Process** | Chromium        | UI rendering (React)                             | Sandboxed, no direct Node access |

### 2. IPC (Inter-Process Communication)

All communication between main and renderer goes through **contextBridge**:

```typescript
// Preload (index.ts)
const api = {
  createAboutWindow: () => ipcRenderer.invoke('create-about-window'),
  onAboutWindowClosed: (callback: () => void) => {
    ipcRenderer.on('about-window-closed', callback)
  }
}

// Expose securely
if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('api', api)
}
```

### 3. AI Provider Registry

The app supports multiple AI providers through a factory pattern:

```typescript
// main/services/ai/registry.ts
export * as AnthropicProvider from './providers/anthropic.factory'
export * as GoogleProvider from './providers/google.factory'
export * as MockProvider from './providers/mock.factory'
export * as OpenAIProvider from './providers/openai.factory'
export * as OllamaProvider from './providers/ollama.factory'

// Dynamic provider loading based on settings
```

---

### `/src/preload/` - Preload Script

**Entry Point**: `index.ts` (148 lines)

- Defines all exposed APIs
- Types defined in `index.d.ts`
- Uses `contextBridge.exposeInMainWorld()` for secure exposure

**Exposed APIs**:

```typescript
window.api // General app controls
```

### `/src/renderer/` - Renderer Process (React)

#### **Component Organization**

Components are organized by **feature domain**:

```
src/
├── components/
│   ├── chat/              # Chat feature (Sidebar, Input, Messages)
│   ├── provider/          # AI provider management
│   ├── prompt/            # Prompt templates
│   ├── model/             # Model configuration
│   ├── Header/            # Application header
│   ├── ui/                # Reusable UI components (shadcn)
│   └── layouts/           # Page layouts
├── pages/
│   ├── index.tsx          # Chat page (default)
│   ├── settings/          # Settings pages
│   │   ├── index.tsx      # Settings layout
│   │   ├── Models.tsx     # Model management
│   │   ├── General.tsx    # General settings
│   │   └── PlaceholderSettings.tsx
│   ├── chat/             # Chat sub-pages
│   └── about.tsx         # About page
└── hooks/                # Custom React hooks
    ├── usePrompts.ts
    ├── useSettings.ts
    ├── useAiChat.ts
    └── useConversations.ts
```

#### **Client-Side Routing**

`routes.tsx` defines the routing structure:

- Uses conditional rendering (no router library)
- Current route stored in state
- Simple page switching logic

#### **Shared Types** (`/src/shared/`)

| File           | Purpose                                      |
| -------------- | -------------------------------------------- |
| `ipc.ts`       | IPC channel constants, TypeScript interfaces |
| `types.ts`     | Shared type definitions                      |
| `constants.ts` | App-wide constants                           |
| `utils.ts`     | Shared utility functions                     |

---

## 🎯 Key Patterns & Conventions

### 1. IPC Handler Registration Pattern

**Main Process**:

```typescript
// In main/index.ts
import { registerOllamaIpc } from './ipc/ollama'
import { registerSettingsIpc } from './ipc/settings'
// ... other handlers

app.whenReady().then(() => {
  createWindow()
  // Register ALL IPC handlers
  registerOllamaIpc()
  registerSettingsIpc()
  registerDatabaseIpc()
  registerAiIpc()
  registerWindowIpc()
})
```

**Naming Convention**:

- IPC handler function: `register{Module}Ipc()`
- IPC channel constant: `IPC.MODULE.ACTION`
- Invoke handler: `ipcRenderer.invoke(IPC.MODULE.ACTION, ...args)`

### 2. AI Provider Factory Pattern

Each provider implements a common interface:

```typescript
export function createProvider(providerConfig: ModelConfig): AIProvider {
  switch (providerConfig.id) {
    case 'openai':
      return OpenAIProvider.create(providerConfig)
    case 'anthropic':
      return AnthropicProvider.create(providerConfig)
    case 'ollama':
      return OllamaProvider.create(providerConfig)
    // ... other providers
  }
}
```

**Output**: Returns a standard `AIProvider` interface with methods:

- `streamChat(request)`: Streams AI responses
- `cancel()`: Cancels active request

### 3. React Hook Pattern

Custom hooks encapsulate business logic:

```typescript
// hooks/useSettings.ts
export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  useEffect(() => {
    window.api.settings.get().then(setSettings)
  }, [])

  const updateSetting = useCallback(async (key: keyof AppSettings, value: any) => {
    await window.api.settings.set(key, value)
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { settings, updateSetting }
}
```

**Naming Convention**:

- Hooks start with `use`
- Async data fetching on mount
- Optimistic state updates
- Error handling is minimal (assumes success)

### 4. Type Safety Across Boundaries

**IPC Types**:

```typescript
// shared/ipc.ts
export const IPC = {
  OLLAMA: {
    LIST_MODELS: 'ollama:list-models'
  },
  SETTINGS: {
    GET: 'settings:get',
    SET: 'settings:set'
  }
} as const

export interface OllamaModel {
  name: string
  modified_at: string
  size: number
}
```

**Preload Types** (`preload/index.d.ts`):

```typescript
interface Window {
  ollama: {
    listModels: () => Promise<OllamaModel[]>
  }
}
```

---

## 🔧 Development Workflow

### Running the App

```bash
# Start dev server (includes hot reload)
pnpm dev

# Build for production
pnpm build

# Package as installer
pnpm dist
```

### Adding a New IPC Handler

1. **Create handler file** in `/src/main/ipc/`:

   ```typescript
   import { ipcMain } from 'electron'
   import { IPC_CHANNELS } from '@/shared/ipc'

   export function registerMyFeatureIpc() {
     ipcMain.handle(IPC_CHANNELS.MY_FEATURE_ACTION, async (event, ...args) => {
       // Implementation
       return result
     })
   }
   ```

2. **Add IPC channel constant** in `/src/shared/ipc.ts`:

   ```typescript
   export const IPC = {
     // ... existing
     MY_FEATURE: {
       ACTION: 'my-feature:action'
     }
   } as const
   ```

3. **Expose in preload** (`/src/preload/index.ts`):

   ```typescript
   const myFeature = {
     action: (...args) => ipcRenderer.invoke(IPC.MY_FEATURE.ACTION, ...args)
   }

   // In contextBridge section
   contextBridge.exposeInMainWorld('myFeature', myFeature)
   ```

4. **Register in main** (`/src/main/index.ts`):

   ```typescript
   import { registerMyFeatureIpc } from './ipc/my-feature'

   app.whenReady().then(() => {
     // ... window creation
     registerMyFeatureIpc()
   })
   ```

5. **Use in renderer**:
   ```typescript
   const result = await window.myFeature.action(arg1, arg2)
   ```

### Adding a New AI Provider

1. **Create factory** in `/src/main/services/ai/providers/your-provider.factory.ts`:

   ```typescript
   import type { AIProvider, ModelConfig } from '../types'

   export function create(config: ModelConfig): AIProvider {
     return {
       streamChat: async (request) => {
         // Streaming implementation
       },
       cancel: () => {
         // Cancel implementation
       }
     }
   }
   ```

2. **Register in registry** (`/src/main/services/ai/registry.ts`):

   ```typescript
   export * as YourProvider from './providers/your-provider.factory'
   ```

3. **Add to main import** (`/src/main/services/ai/index.ts`)

---

## 🚫 Anti-Patterns to Avoid

1. **Direct Node imports in renderer**
   - ❌ `import fs from 'fs'` in renderer
   - ✅ Use IPC to request main process operations

2. **Bypassing contextBridge**
   - ❌ `window.api = api` in preload without `contextBridge`
   - ✅ Always use `contextBridge.exposeInMainWorld()`

3. **Renderer-to-renderer IPC**
   - ❌ Use main process for IPC between renderer windows
   - ✅ Use webContents-based communication or shared state

4. **State synchronization issues**
   - ❌ Multiple sources of truth for same data
   - ✅ Keep state in main process or single source of truth

5. **Type assertion instead of proper typing**
   - ❌ `const result = data as any`
   - ✅ Define proper TypeScript interfaces

---

## Key Files Reference

| File                              | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `main/index.ts`                   | Electron entry point, window creation |
| `main/windows/main.ts`            | Main window configuration             |
| `preload/index.ts`                | Preload script, API exposure          |
| `renderer/main.tsx`               | React entry point                     |
| `renderer/routes.tsx`             | Client routing logic                  |
| `renderer/pages/chat/index.tsx`   | Chat page component                   |
| `renderer/hooks/useAiChat.ts`     | AI chat logic hook                    |
| `shared/ipc.ts`                   | IPC constants and types               |

---

## Contributing

When working on the desktop app:

1. Understand the three-tier separation
2. Always use IPC for cross-tier communication
3. Keep types in sync across main/preload/renderer
4. Register new IPC handlers in main process

- 文件名用大写驼峰，不要有中划线
- 不加非必要注释
- 使用函数式编程，不用类实现

## 

react 组件中，按一下顺序定义变量和方法

- 全局变量
- 局部变量
- 方法
- 副作用
- 渲染模板

---

_For Electron-specific patterns, see [Electron Best Practices](https://www.electronjs.org/docs/latest/tutorial/best-practices)_
