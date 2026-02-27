# 数据库重命名完成报告

## 重命名概述

将 `Assistant` (助手) 重命名为 `Prompt` (提示词)，
将 `Session` (会话) 重命名为 `Conversation` (对话)。

## 已完成的变更

### 1. 数据库 Schema ✅

**文件**: `src/main/services/database/schema.ts`

| 原表名     | 新表名        | 说明              |
| ---------- | ------------- | ----------------- |
| assistants | prompts       | 提示词配置表      |
| sessions   | conversations | 对话记录表        |
| messages   | messages      | 聊天消息表 (不变) |

**变更详情**:

- `assistants.id` → `prompts.id`
- `sessions.assistantId` → `conversations.promptId`
- `messages.sessionId` → `messages.conversationId`

**Schema版本**: 1 → 2

### 2. IPC 常量 ✅

**文件**: `src/shared/ipc.ts`

| 原常量                                  | 新常量                               |
| --------------------------------------- | ------------------------------------ |
| IPC.DATABASE.ASSISTANTS_GET_ALL         | IPC.DATABASE.PROMPTS_GET_ALL         |
| IPC.DATABASE.ASSISTANT_GET              | IPC.DATABASE.PROMPT_GET              |
| IPC.DATABASE.ASSISTANT_CREATE           | IPC.DATABASE.PROMPT_CREATE           |
| IPC.DATABASE.ASSISTANT_UPDATE           | IPC.DATABASE.PROMPT_UPDATE           |
| IPC.DATABASE.ASSISTANT_DELETE           | IPC.DATABASE.PROMPT_DELETE           |
| IPC.DATABASE.SESSIONS_GET_ALL           | IPC.DATABASE.CONVERSATIONS_GET_ALL   |
| IPC.DATABASE.SESSION_GET                | IPC.DATABASE.CONVERSATION_GET        |
| IPC.DATABASE.SESSION_CREATE             | IPC.DATABASE.CONVERSATION_CREATE     |
| IPC.DATABASE.SESSION_UPDATE             | IPC.DATABASE.CONVERSATION_UPDATE     |
| IPC.DATABASE.SESSION_DELETE             | IPC.DATABASE.CONVERSATION_DELETE     |
| IPC.DATABASE.MESSAGES_GET_FOR_ASSISTANT | IPC.DATABASE.MESSAGES_GET_FOR_PROMPT |
| IPC.DATABASE.EXPORT_SESSION             | IPC.DATABASE.EXPORT_CONVERSATION     |

### 3. TypeScript 类型定义 ✅

**文件**: `src/shared/ipc.ts`

```typescript
// 旧类型
type Assistant { ... }
type Session { ... }

// 新类型
type Prompt { ... }
type Conversation { ... }
```

**字段变更**:

```typescript
// Prompt 类型
promptId?: string      // 原 assistantId

// Conversation 类型
promptId?: string      // 原 assistantId

// Message 类型
conversationId: string // 原 sessionId
```

### 4. 数据库服务方法 ✅

**文件**: `src/main/services/database/index.ts`

| 原方法                   | 新方法                     |
| ------------------------ | -------------------------- |
| getAllAssistants         | getAllPrompts              |
| getAssistant             | getPrompt                  |
| createAssistant          | createPrompt               |
| updateAssistant          | updatePrompt               |
| deleteAssistant          | deletePrompt               |
| getAllSessions           | getAllConversations        |
| getSession               | getConversation            |
| createSession            | createConversation         |
| updateSession            | updateConversation         |
| deleteSession            | deleteConversation         |
| getSessionsWithAssistant | getConversationsWithPrompt |
| getMessagesForAssistant  | getMessagesForPrompt       |
| exportSessionData        | exportConversationData     |

### 5. IPC 处理器 ✅

**文件**: `src/main/ipc/database.ts`

所有IPC处理器已更新为使用新的方法名和类型。

### 6. Preload API ✅

**文件**: `src/preload/index.ts`, `src/preload/index.d.ts`

```typescript
// 原API
window.database.getAllAssistants()
window.database.getAllSessions()

// 新API
window.database.getAllPrompts()
window.database.getAllConversations()
```

### 7. React Hooks ✅

| 原Hook        | 新Hook           | 文件                                         |
| ------------- | ---------------- | -------------------------------------------- |
| useAssistants | usePrompts       | `src/renderer/src/hooks/usePrompts.ts`       |
| useSessions   | useConversations | `src/renderer/src/hooks/useConversations.ts` |

**Hook 方法变更**:

```typescript
// usePrompts
getAllPrompts()
getPrompt()
createPrompt()
updatePrompt()
deletePrompt()

// useConversations
getAllConversations()
getConversation()
createConversation()
updateConversation()
deleteConversation()
loadConversationMessages()
```

### 8. UI 组件 ✅

**目录**: `src/renderer/src/components/assistant` → `src/renderer/src/components/prompt`

| 原组件                    | 新组件                      |
| ------------------------- | --------------------------- |
| CreateAssistantDialog.tsx | CreatePromptDialog.tsx      |
| AssistantList.tsx         | PromptList.tsx              |
| AssistantManager.tsx      | PromptManager.tsx           |
| DataMigrator.tsx          | DataMigrator.tsx (保持不变) |

## 测试验证

### TypeScript 编译

```bash
cd apps/desktop
npx tsc --noEmit
```

✅ 无编译错误

## 数据迁移

旧数据库文件仍然使用 `assistants` 和 `sessions` 表名。需要执行以下步骤：

### 选项1: 重新初始化数据库

```typescript
// 删除旧数据库文件
rm ~/Library/Application Support/desktop/chat.db

// 应用会自动创建新表结构
```

### 选项2: 数据迁移脚本

```sql
-- 重命名表
ALTER TABLE assistants RENAME TO prompts;
ALTER TABLE sessions RENAME TO conversations;

-- 更新字段名
ALTER TABLE conversations RENAME COLUMN assistantId TO promptId;
ALTER TABLE messages RENAME COLUMN sessionId TO conversationId;
```

### 选项3: 使用导入导出

```typescript
// 导出旧数据
const oldData = await window.database.exportAll()

// 清空数据库
await window.database.clearAll()

// 旧数据会在导入时自动映射到新表结构
```

## 代码影响范围

### 已修改的文件类型

- `.ts` - TypeScript 源文件 (~30个)
- `.tsx` - React 组件文件 (~15个)
- `.d.ts` - TypeScript 类型声明文件 (~2个)

### 未受影响的模块

- AI 服务 (`src/main/services/ai/`)
- 设置管理 (`src/main/services/store/`)
- 设置IPC (`src/main/ipc/settings.ts`)
- AI IPC (`src/main/ipc/ai.ts`)

## 向后兼容性

⚠️ **不兼容**: 数据库表结构已更改

**影响**:

- 旧数据库文件无法直接使用
- 需要重新初始化或迁移数据

**建议**:

- 在应用启动时检测数据库版本
- 自动执行迁移脚本
- 提供用户选择清除或迁移数据的选项

## 下一步

1. **生产环境部署**
   - 备份现有数据
   - 测试迁移脚本
   - 验证新功能

2. **文档更新**
   - API 文档
   - 用户指南
   - 开发者文档

3. **代码审查**
   - 确保所有引用已更新
   - 检查遗漏的导入
   - 验证类型安全

## 总结

✅ 所有代码已成功重命名
✅ TypeScript 编译通过
✅ 数据库 Schema 版本已更新
✅ IPC 通道已更新
✅ React Hooks 已更新
✅ UI 组件已更新

**重命名后更清晰的命名**:

- `Assistant` → `Prompt`: 更准确描述其作为"系统提示词"的本质
- `Session` → `Conversation`: 更符合聊天对话的语义
- 整体命名更一致且易于理解
