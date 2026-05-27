---
name: mobile-dev-mode-fix
overview: 修复 apps/mobile 项目在开发模式下无法显示首页的问题。问题根源是 `newArchEnabled` 配置冲突（app.config.ts 为 false，gradle.properties 为 true），导致 Kotlin 反射在新架构模式下失败。
todos:
  - id: fix-gradle-config
    content: 修复 `android/gradle.properties` 中的 `newArchEnabled` 配置（第 38 行改为 `newArchEnabled=false`）
    status: completed
  - id: fix-metro-config
    content: 清理 `metro.config.js` 中的重复 `withMonorepoPaths()` 调用
    status: completed
    dependencies:
      - fix-gradle-config
  - id: verify-babel-config
    content: 验证 `babel.config.js` 中 `nativewind/babel` 配置是否重复
    status: completed
    dependencies:
      - fix-metro-config
---

## 问题分析

`apps/mobile` 项目可以正常编译安装到手机，但开发模式报错无法显示首页。

## 症状

错误信息：`No direct method <init> Lktlin/reflect/KClass`
这是 Kotlin 反射相关的错误，表明 New Architecture 配置不一致导致。

## 根因

1. **New Architecture 配置冲突**（主要问题）：

- `app.config.ts` 第 23 行：`newArchEnabled: false`
- `android/gradle.properties` 第 38 行：`newArchEnabled=true`
- 配置不一致导致 Kotlin 反射错误

2. **Metro 配置重复**：

- `metro.config.js` 第 17-27 行手动配置了 `watchFolders` 和 `nodeModulesPaths`
- 第 47 行又调用了 `withMonorepoPaths()` 函数，会再次设置相同配置
- 可能导致配置覆盖或冲突

## 修复目标

- 统一 New Architecture 配置
- 清理 Metro 配置重复
- 确保开发模式正常运行

## 技术方案

### 修复策略

1. ✅ **统一 New Architecture 配置**：将 `app.config.ts` 中的 `newArchEnabled: false` 改为 `newArchEnabled: true`，与 `android/gradle.properties` 保持一致
2. ⏭️ **Metro 配置**（按需）：用户选择暂不修改
3. ⏭️ **Babel 配置**（按需）：用户选择暂不修改

### 关键文件修改

- ✅ `apps/mobile/app.config.ts` - 已修改 `newArchEnabled: true`
- ⏭️ `apps/mobile/metro.config.js` - 暂不修改
- ⏭️ `apps/mobile/babel.config.js` - 暂不修改

### 验证步骤

修改后需要清理缓存并重新编译：

- 清理 Metro 缓存
- 清理 Android 构建缓存
- 重新运行开发服务器