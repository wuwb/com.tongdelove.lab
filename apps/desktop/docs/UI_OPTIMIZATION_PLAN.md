# 应用界面优化计划

## 项目概述

**应用**: openZhuli - AI聊天桌面应用
**技术栈**:

- Electron + React 19
- Chakra UI 3.8.x + TailwindCSS
- TypeScript
- Better-SQLite3 数据库

## 目标

打造现代化、扁平化、一致性的用户界面，提升用户体验和视觉吸引力。

---

## 一、窗口结构改造

### 1.1 移除系统标题栏，使用自定义标题栏

**当前状态**:

- 使用 Electron 默认窗口标题栏
- 有系统控制按钮（最小化、最大化、关闭）

**改造方案**:

```typescript
// src/main/windows/main.ts
new BrowserWindow({
  frame: false, // 移除系统边框
  titleBarStyle: 'hidden', // 隐藏标题栏（macOS）
  transparent: true, // 可选：透明窗口
  backgroundColor: '#ffffff',
  width: 1200,
  height: 800,
  webPreferences: {
    frame: false
  }
})
```

**自定义标题栏组件**:

- ✅ 应用 Logo/名称
- ✅ 窗口控制按钮（自定义样式）
- ✅ 可选：标签页指示器

**创建文件**: `src/renderer/src/components/WindowTitleBar/index.tsx`

---

## 二、主布局重构

### 2.1 整体布局结构

```
┌─────────────────────────────────────────────────┐
│  [自定义标题栏]  ────  [拖拽区域]  ────  [控制按钮] │
├──────┬────────────────────────────────────────────┤
│      │                                        │
│  侧边  │            主内容区                   │
│  栏   │                                        │
│      │                                        │
│  ┌──┴──┐│  ┌──────────────────────────────┐     │
│  │导航 ││  │       聊天界面             │     │
│  │     ││  │                          │     │
│  │● 聊天││  │  ┌────────────────┐        │     │
│  │     ││  │  │  消息列表     │        │     │
│  │助手库││  │  └────────────────┘        │     │
│  │     ││  │                              │     │
│  │绘图 ││  │  ┌────────────────┐        │     │
│  │     ││  │  │  输入框         │        │     │
│  │小程序││  │  └────────────────┘        │     │
│  │     ││  │                              │     │
│  │┌──┴──┐│  │                              │     │
│  ││二级││  │                              │     │
│  ││导航││  └──────────────────────────────┘     │
│  └┴────┘┘                                        │
└──────┴────────────────────────────────────────────┘
```

### 2.2 侧边栏设计

**功能模块**:

1. **主导航** (主侧边栏)
   - 聊天
   - 助手库 (Prompts) - 新增
   - 绘图 - 新增
   - 小程序 - 新增
   - 设置

2. **二级导航** (上下文侧边栏，动态显示)
   - 聊天时：显示对话列表
   - 助手库时：显示 Prompt 列表 + 创建按钮
   - 设置时：显示设置分类

**文件结构**:

```
src/renderer/src/layout/
├── AppLayout.tsx           # 主布局容器
├── Sidebar/
│   ├── index.tsx            # 侧边栏主组件
│   ├── MainNav.tsx         # 主导航
│   ├── SecondaryNav.tsx    # 二级导航容器
│   └── components/
│       ├── ChatNav.tsx     # 聊天二级导航
│       ├── PromptNav.tsx   # 助手库二级导航
│       ├── DrawingNav.tsx  # 绘图二级导航
│       ├── MiniAppNav.tsx   # 小程序二级导航
│       └── SettingsNav.tsx  # 设置二级导航
└── Header/
    └── CustomTitleBar.tsx   # 自定义标题栏
```

---

## 三、侧边栏功能模块

### 3.1 导航设计规范

#### 3.1.1 主导航 (MainNav)

**设计**:

- 图标 + 文字标签
- 宽度：200px
- 支持折叠（可选）
- 当前选中状态：背景色高亮

**使用图标** (来自 lucide-react):

- 聊天: `MessageSquare`
- 助手库: `Sparkles`
- 绘图: `PenTool`
- 小程序: `Smartphone`
- 设置: `Settings`

```tsx
import { MessageSquare, Sparkles, PenTool, Smartphone, Settings } from 'lucide-react'

const MAIN_NAV_ITEMS = [
  { id: 'chat', label: '聊天', icon: MessageSquare },
  { id: 'prompts', label: '助手库', icon: Sparkles },
  { id: 'drawing', label: '绘图', icon: PenTool },
  { id: 'miniapp', label: '小程序', icon: Smartphone },
  { id: 'settings', label: '设置', icon: Settings }
]
```

#### 3.1.2 二级导航 (SecondaryNav)

**PromptNav (助手库二级导航)**:

```
┌─────────────────┐
│  助手库          │ ← 标题
├─────────────────┤
│  [+] 新建助手    │
├─────────────────┤
│  🔍 搜索助手      │
├─────────────────┤
│  📚 分类: 全部    │
│  ─────────────── │
│  • 编程助手      │
│  • 写作助手      │
│  • 翻译助手      │
│  📝 自定义助手    │
│  • My Assistant  │
│  • Code Helper   │
└─────────────────┘
```

#### 3.1.3 SettingsNav (设置二级导航)

**设置分类**:

```
模型服务 (服务图标: Server)
├─ 大模型配置
├─ Ollama 管理
└─ MCP 服务集

常规设置 (服务图标: Settings)
├─ 应用设置
├─ 快捷键
└─ 关于我们

显示设置 (服务图标: Monitor)
├─ 主题设置
├─ 字体大小
└─ 界面缩放

数据设置 (服务图标: Database)
├─ 数据备份
├─ 数据迁移
└─ 清除缓存

API 服务 (服务图标: Key)
├─ API Keys 管理
└─ 自定义端点

快捷键 (服务图标: Keyboard)
└─ 快捷键列表

关于我们 (服务图标: Info)
├─ 版本信息
├─ 使用协议
└─ 反馈建议
```

---

## 四、设置页面重构

### 4.1 设置页面布局

```
┌─────────────────────────────────────────────────────┐
│  设置                              [搜索框]        │
├──────┬───────────────────────────────────────────────┤
│      │  当前: 大模型配置                         │
│  分类│                                            │
│  ┌──┴──┐│  ┌──────────────────────────────────────┐   │
│  │模型服││  │  OpenAI                              │   │
│  │  务  ││  │  ┌──────────────────────────────┐  │   │
│  │显示设││  │  │ API Key: sk-*****       [👁] │  │   │
│  │数据设││  │  │ [显示] [隐藏]             │  │   │
│  │快捷键││  │  └──────────────────────────────┘  │   │
│  │关于  ││  │                                      │   │
│  └──────┘│  │  Anthropic                           │   │
│  │模型 ││  │  ┌──────────────────────────────┐  │   │
│  │服务  ││  │  │ API Key: sk-ant-*******   [👁]  │  │   │
│  │     ││  │  └──────────────────────────────┘  │   │
│      ││  │                                      │   │
│      ││  │  [保存设置]                           │   │
│      ││  └──────────────────────────────────────┘   │
├──────┴───────────────────────────────────────────────┤
│                                                          │
└──────────────────────────────────────────────────────┘
```

### 4.2 设置分类详情

#### 4.2.1 模型服务

**OpenAI**:

- API Key
- 选择的模型 (下拉选择)
- 温度 (滑块 0-2)
- 最大 Token (滑块)

**Anthropic**:

- API Key
- 选择的模型
- Temperature

**Google Gemini**:

- API Key
- 选择模型

**Ollama**:

- Ollama 端点 URL
- 可用模型列表（自动获取）

**MCP 服务**:

- 已安装的 MCP 服务器列表
- 添加新 MCP 服务器

#### 4.2.2 常规设置

- 应用语言: 中文/English
- 启动时行为: 打开上次对话/新建对话
- 自动保存间隔: [ ] 分钟
- 硬件加速: 开启/关闭

**快捷键**:

- `Cmd + N`: 新建对话
- `Cmd + S`: 保存当前对话
- `Cmd + /`: 搜索
- `Cmd + ,`: 打开设置
- `Escape`: 关闭弹窗

#### 4.4.3 显示设置

- 主题: 浅色/深色/跟随系统
- 字体大小: 小/中/大/特大
- 界面缩放: 100% / 125% / 150%
- 消息字体: 等宽/非等宽

#### 4.2.4 数据设置

- **数据备份**:
  - 导出所有数据 (JSON + SQLite)
  - 导出当前会话
  - 导出助手库

- **数据迁移**:
  - 从 localStorage 迁移
  - 数据格式升级工具

- **数据清理**:
  - 清除缓存
  - 清除历史记录
  - 重置所有数据

- **数据位置**:
  - 数据库路径显示
  - 打开数据文件夹

#### 4.2.5 快捷键

快捷键表格，支持修改：

```
| 功能          | 快捷键         | 状态 |
|---------------|----------------|------|
| 新建对话       | Cmd/Ctrl + N   | ⚙️   |
| 保存           | Cmd/Ctrl + S   | ⚙️   |
| 搜索           | Cmd/Ctrl + /   | ⚙️   |
| 设置           | Cmd/Ctrl + ,   | ⚙️   |
| 发送消息       | Enter          |      |
| 换行           | Shift + Enter  |      |
| 搜索消息       | Cmd/Ctrl + K   | ⚙️   |
```

#### 4.2.6 API 服务

**API Keys 管理**:

- 新增 API Key
- 编辑 API Key
- 删除 API Key
- 隐藏/显示 API Key
- API Key 验证状态

**自定义端点**:

- 添加自定义 API 端点
- 编辑自定义端点
- 测试连接
- 设置默认端点

#### 4.2.7 关于我们

- **版本信息**:
  - 应用版本: v0.1.0
  - Electron 版本: v38.x.x
  - Node.js 版本: v22.16.0

- **使用协议**:
  - 服务条款
  - 隐私政策
  - 开源协议

- **反馈建议**:
  - GitHub Issues
  - 邮箱反馈
  - 功能建议

---

## 五、助手库界面

### 5.1 助手库功能

**功能**:

- 创建自定义助手 (Prompt)
- 管理助手列表
- 搜索/过滤助手
- 编辑/删除助手
- 导出/导入助手配置

### 5.2 创建助手对话框

**字段**:

```
┌─────────────────────────────────────┐
│  创建新助手                          │
├─────────────────────────────────────┤
│  名称:* _________________________      │
│  描述: ____________________________      │
│  图标: 🤖   颜色: [选择器]           │
│              □□□□□                   │
├─────────────────────────────────────┤
│  模型配置                            │
│  提供商: [OpenAI ▼]  模型: [gpt-4o ▼]  │
├─────────────────────────────────────┤
│  系统提示词:                         │
│  ┌──────────────────────────────┐  │
│  │ 你是一个专业的编程助手...      │  │
│  │                              │  │
│  │                              │  │
│  │                              │  │
│  └──────────────────────────────┘  │
├─────────────────────────────────────┤
│  标签: 编程, AI助手, 效率工具       │
│  [+ 添加标签]    x                    │
├─────────────────────────────────────┤
│          [取消]        [创建]        │
└─────────────────────────────────────┘
```

---

## 六、绘图功能模块

### 6.1 绘图界面

**功能**:

- Canvas 画板
- 工具栏:
  - 画笔
  - 橡皮擦
  - 颜色选择
  - 画笔大小
  - 图形工具 (矩形、圆形、线条)
- 图层管理
- 保存/导出图片

**文件**: `src/renderer/src/drawing/`

```
src/renderer/src/drawing/
├── index.tsx              # 绘图主界面
├── components/
│   ├── Toolbar.tsx        # 工具栏
│   ├── Canvas.tsx         # Canvas 组件
│   ├── LayerPanel.tsx    # 图层面板
│   └── ColorPicker.tsx   # 颜色选择器
└── hooks/
    ├── useCanvas.tsx
    └── useDrawing.tsx
```

---

## 七、小程序入口

### 7.1 小程序界面

**功能**:

- 小程序列表网格
- 每个小程序显示:
  - 图标
  - 名称
  - 描述
- 启动小程序

**内置小程序示例**:

- 数据可视化助手
- 代码格式化工具
- Markdown 编辑器
- 图片转换工具
- 翻译工具

**文件**: `src/renderer/src/miniapp/`

```
src/renderer/src/miniapp/
├── index.tsx              # 小程序主界面
├── apps/
│   ├── Dashboard.tsx      # 数据可视化
│   ├── Formatter.tsx      # 代码格式化
│   ├── Markdown.tsx       # Markdown编辑器
│   ├── ImageConvert.tsx   # 图片转换
│   └── Translator.tsx     # 翻译工具
└── components/
    ├── AppGrid.tsx        # 小程序网格
    └── AppCard.tsx        # 小程序卡片
```

---

## 八、聊天界面优化

### 8.1 扁平化设计原则

**减少或移除的元素**:

- ❌ 深重的阴影 (`boxShadow`, `shadow-lg`, `shadow-xl`)
- ❌ 大圆角 (`rounded="xl"`)
- ❌ 高对比度的 border
- ❌ 复杂的渐变背景
- ❌过多的装饰元素

**采用的设计风格**:

- ✅ 扁平化颜色 (无渐变)
- ✅ 细边框 (1px solid subtle)
- ✅ 小圆角 (`rounded="md"` 或 `rounded="sm"`)
- ✅ 柔和的阴影或无阴影
- ✅ 清晰的层次关系（通过间距和颜色区分）

### 8.2 样式优化细则

#### 8.2.1 消息气泡

**优化前**:

```tsx
<Box bg="blue.500" color="white" p={4} borderRadius={16} boxShadow="lg">
  {content}
</Box>
```

**优化后**:

```tsx
<Box bg="blue.500" color="white" p={3} borderRadius="md" borderWidth={1} borderColor="blue.600">
  {content}
</Box>
```

#### 8.2.2 输入框

**优化前**:

```tsx
<Input
  size="lg"
  borderRadius="lg"
  boxShadow="md"
  _focus={{
    boxShadow: 'lg',
    borderColor: 'blue.500'
  }}
/>
```

**优化后**:

```tsx
<Input
  size="md"
  borderRadius="md"
  borderWidth={1}
  borderColor="gray.300"
  _focus={{
    borderColor: "blue.500",
    borderWidth={2},
    boxShadow: "none"
  }}
/>
```

#### 8.2.3 按钮

**优化前**:

```tsx
<Button
  size="lg"
  fontWeight="bold"
  boxShadow="base"
  bgGradient="linear(to-r, blue.500, purple.600)"
  _hover={{
    bgGradient: 'linear(to-r, blue.600, purple.700)'
  }}
>
  发送
</Button>
```

**优化后**:

```tsx
<Button
  size="md"
  borderWidth={1}
  borderColor="blue.500"
  _hover={{
    bg: 'blue.50',
    borderColor: 'blue.600'
  }}
>
  发送
</Button>
```

#### 8.2.4 卡片

**优化前**:

```tsx
<Card borderRadius="xl" boxShadow="lg" p={6}>
  {content}
</Card>
```

**优化后**:

```tsx
<Card borderRadius="md" borderWidth={1} borderColor="gray.200" p={4}>
  {content}
</Card>
```

### 8.3 聊天界面布局优化

```
┌───────────────────────────────────────────────────────┐
│  [自定义标题栏]                                            │
├──────┬──────────────────────────────────────────────────┤
│  侧边 │  新建对话                                [⚙️]    │
│  栏   │  ┌───────────────┐                      [🔍]    │
│      │  │ ChatGPT-4o     │                            │
│  ● 聊天│  ██████████████▊│                            │
│  等消息│  └───────────────┘                            │
│      │                                              │
│  导航  │  [模型: gpt-4o] [提供商: OpenAI]           │
│       │                                              │
│  ┌──┴──┐│  ┌──────────────────────────────────┐    │
│  │二级 ││  │  User: 你好！                   │    │
│  │导航 ││  │                                  │    │
│  │     ││  │  Assistant: 你好！有什么需要帮助       │    │
│  │     ││  │                的吗？                │    │
│  │     ││  │                                  │    │
│  │     ││  └──────────────────────────────────┘    │
│  └──────┘│  ├──────────────────────────────────┤    │
│         │  │ 你好！                           │    │
│         │  ├──────────────────────────────────┤    │
│         │  │ 有什么需要帮助的吗？              │    │
│         │  ├──────────────────────────────────┤    │
│         │  │                                   │    │
│         │  ├──────────────────────────────────┤    │
│  │模型  │  │ [输入框...]              [发送] │    │
│  │选择  │  └──────────────────────────────────┘    │
│  │      │                                            │
│  └──────┘│  ┌────────────────────────────────┐         │
│         │  │ [快捷操作：复制、删除、编辑...]      │ │
│         │  └────────────────────────────────┘         │
└────────┴────────────────────────────────────────┘
```

### 8.4 颜色方案优化

**浅色主题**:

- 主色: `blue.500` (#3b82f6)
- 背景: `gray.50` (#f9fafb)
- 表面: `white` (#ffffff)
- 边框: `gray.200` (#e5e7eb)
- 文字: `gray.900` (#111827)
- 文字弱: `gray.600` (#4b5563)

**深色主题**:

- 主色: `blue.400` (#60a5fa)
- 背景: `gray.900` (#111827)
- 表面: `gray.800` (#1f2937)
- 边框: `gray.700` (#374151)
- 文字: `gray.100` (#f3f4f6)
- 文字弱: `gray.400` (#9ca3af)

### 8.5 间距系统

统一使用 Chakra UI 的间距系统:

- `spacing={2}` = 8px
- `spacing={3}` = 12px
- `spacing={4}` = 16px
- `spacing={6}` = 24px
- `spacing={8}` = 32px

---

## 九、设计系统组件库

### 9.1 创建 Design Token

**文件**: `src/renderer/src/theme/tokens.ts`

```typescript
export const designTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#3b82f6',
      600: '#2563eb'
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      900: '#111827'
    }
  },
  shadows: {
    flat: 'none',
    subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
  },
  borderRadius: {
    sm: '6px', // 0.375rem
    md: '8px', // 0.5rem
    lg: '12px' // 0.75rem
  }
}
```

### 9.2 创建自定义 AppShell 组件

**文件**: `src/renderer/src/layout/AppShell.tsx`

```tsx
import { WindowTitleBar } from '../components/Header/CustomTitleBar'
import { AppSidebar } from './Sidebar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WindowTitleBar />
      <div display="flex" height="calc(100vh - 32px)">
        <AppSidebar />
        <div flex={1} overflow="auto">
          {children}
        </div>
      </div>
    </>
  )
}
```

---

## 十、实现路线图

### Phase 1: 基础结构 (Week 1-2)

- [ ] 自定义标题栏组件
- [ ] AppShell 主布局
- [ ] 侧边栏框架
- [ ] 主导航实现
- [ ] 二级导航容器

### Phase 2: 功能菜单 (Week 2-3)

- [ ] 助手库二级导航
- [ ] 绘图入口页面
- [ ] 小程序入口页面
- [ ] Prompt 组件集成

### Phase 3: 设置页面重构 (Week 3-4)

- [ ] 设置二级分类导航
- [ ] 模型服务设置
- [ ] 常规设置
- [ ] 显示设置
- [ ] 数据设置
- [ 快捷键设置
- [] API 服务
- [] 关于我们

### Phase 4: 聊天界面优化 (Week 4-5)

- [ ] 扁平化样式改造
- [ ] 消息气泡重设计
- [ ] 输入框优化
- [ ] 按钮样式统一
- [] 调色板更新

### Phase 5: 新功能开发 (Week 5+)

- [ ] 绘图功能完整实现
- [] 小程序框架搭建
- [ ] 小程序示例开发
- [ ] 数据可视化助手

---

## 十一、设计规范文档

### 11.1 组件设计规范

**所有组件遵循**:

1. **扁平化设计** - 无过度阴影和渐变
2. **清晰层次** - 通过间距、颜色、边框区分 3.一致间距\*\* - 使用 Chakra spacing 系统
3. **统一图标** - 使用 lucide-react
4. **类型安全** - TypeScript 严格模式

### 11.2 颜色使用指南

**主色**:

- 蓝色系用于主要操作和强调元素
- 避免大面积使用，保持克制

**中性色**:

- 用于背景、边框、文字
- 适度使用灰色营造层次

**状态色**:

- Success: green.500
- Warning: yellow.500
- Error: red.500
- Info: blue.500

### 11.3 图标使用规范

**图标来源**: lucide-react (与 `@tongdelove/ui` 一致)

**图标大小**:

- 小: 16px (size={4})
- 中: 20px (size={5})
- 大: 24px (size={6})

**图标使用场景**:

- 导航: 20px
- 功能按钮: 18px
- 状态指示: 16px

---

## 十二、验收标准

### 12.1 功能验收

- [ ] 自定义标题栏正常工作，窗口控制功能完整
- [ ] 所有导航菜单可正常切换
- [ ] 助手库 CRUD 功能完整
- [ ] 设置页面所有分类可正常访问
- [ ] 扁平化样式在所有页面生效
- [ ] 深色/浅色主题切换正常

### 12.2 视觉验收

- [ ] 无明显的阴影过重
- [ ] 圆角统一协调
- [ ] 颜色符合设计规范
- [ ] 间距系统一致
- [ ] 图标对齐统一
- [ ] 字体层级清晰

### 12.3 交互验收

- [ ] 所有按钮有明确的悬停状态
- [ ] 输入框有清晰的焦点状态
- [ ] 卡片/列表项有悬停反馈
- [ ] 过渡动画流畅自然
- [ ] 加载状态明确

### 12.4 性能验收

- [ ] 首屏加载时间 < 2s
- [ ] 页面切换无卡顿
- [ ] 大数据量滚动流畅
- [ ] 低端设备基本可用

---

## 十三、参考资源

### 13.1 设计系统参考

- **Linear** - 现代化扁平化设计的优秀案例
- **Vercel** - 极简主义，清晰的层次
- **Notion** - 扁平化 + 柔和的阴影
- **Raycast** macOS 原生应用设计感

### 13.2 Component Libraries

- **Chakra UI v3.8** - 已使用的UI框架
- **@tongdelove/ui** - 内部组件库
- **Headless UI** - 无障碍组件库
- **Radix UI** - 底层组件库

### 13.3 Design Tools

- **Figma** - 主要设计工具
- **Framer Design** - 动效原型
- **React Scan** - React 组件库浏览器

---

## 十四、后续优化方向

### 14.1 短期优化 (1-2个月)

- [ ] 添加更多绘图工具
- [ ] 小程序市场功能
- [ ] 主题自定义功能
- [ ] 助手分享功能

### 14.2 中期优化 (3-6个月)

- [ ] AI 辅助绘图
- [ ] 插件系统
- [ ] 多语言支持
- [ ] 云端同步

### 14.3 长期规划 (6个月+)

- [ ] 协作共享
- [ ] 手机端同步
- [ ] 导出 Word/PDF
- - [ ] API 开放平台

---

## 十五、风险与注意事项

### 15.1 技术风险

- Electron 窗口拖拽可能影响性能
- 大量数据渲染内存占用
- Native 模块兼容性

### 15.2 设计风险

- 扁平化可能显得单调
- 层次感不足可能影响可用性
- 颜色方案在不同显示器效果不同

### 15.3 缓解措施

- 保留适度的阴影提供层次感
- 确保足够的颜色对比度
- 性能优化：虚拟列表、懒加载

---

## 附录

### A. 文件清单

需要创建或修改的文件：

```
src/renderer/src/
├── layout/
│   ├── AppShell.tsx
│   ├── Sidebar/
│   │   ├── index.tsx
│   │   ├── MainNav.tsx
│   │   ├── SecondaryNav.tsx
│   │   └── components/
│   │       ├── ChatNav.tsx
│   │       ├── PromptNav.tsx
│   │       ├── DrawingNav.tsx
│   │       ├── MiniAppNav.tsx
│   │       └── SettingsNav.tsx
│   └── Header/
│       └── CustomTitleBar.tsx
├── pages/
│   ├── chat/
│   │   ├── index.tsx (优化)
│   │   └── components/
│   │       ├── MessageList.tsx
│   │       ├── ChatInput.tsx
│   │       └── ModelSelector.tsx
│   ├── prompts/ (新建)
│   ├── drawing/ (新建)
│   ├── miniapp/ (新建)
│   └── setting/
│       ├── index.tsx (重构)
│       └── components/
│           ├── ModelSettings.tsx
│           ├── AppearanceSettings.tsx
│           ├── DataSettings.tsx
│           ├── APISettings.tsx
│           ├── KeyboardShortcuts.tsx
│           └── About.tsx
├── theme/
│   ├── tokens.ts (新建)
│   └── colors.ts (新建)
└── components/
    └── Header/
        └── CustomTitleBar.tsx (新建)
```

### B. 依赖需求

✅ 已有:

- `lucide-react` ^0.541.0
- `@tongdelove/ui`
- `react` ^19.1.1

建议新增:

- `framer-motion` ^12.23.24 (动效)
- `react-hot-toast` (通知提示)

### C. 时间估算

| 阶段                  | 工作量 | 时间         |
| --------------------- | ------ | ------------ |
| Phase 1: 基础结构     | 中等   | 1-2 周       |
| Phase 2: 功能菜单     | 中等   | 1-2 周       |
| Phase 3: 设置页面重构 | 复杂   | 2-3 周       |
| Phase 4: 聊天界面优化 | 复杂   | 2-3 周       |
| Phase 5: 新功能开发   | 复杂   | 4-6 周       |
| **总计**              | -      | **10-16 周** |

---

**文档版本**: v1.0
**创建日期**: 2026-02-26
**最后更新**: 2026-02-26
**负责人**: Sisyphus
