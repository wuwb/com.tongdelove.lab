---
title: "Tailwind CSS v4：配置从 JS 搬进了 CSS"
description: "没有 tailwind.config.js 之后，主题变量、插件和内容扫描该写在哪里。"
date: "2026-09-30"
tags: ["Tailwind CSS", "CSS", "前端"]
author: "WuWenbin"
---

升级到 Tailwind CSS v4 之后，最不习惯的一点是：**`tailwind.config.js` 没了**。配置全部搬进 CSS 文件，第一眼会觉得别扭，用顺了反而更直接。

## 入口从三条指令变成一个 import

v3 的做法：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

v4 只剩一行：

```css
@import "tailwindcss";
```

## 主题变量写在 @theme

以前在 `theme.extend.colors` 里定义，现在直接写 CSS 变量：

```css
@theme {
  --color-brand-500: oklch(0.62 0.19 259);
  --font-display: "Satoshi", sans-serif;
}
```

生成的工具类会自动跟上：`bg-brand-500`、`font-display`。

需要引用外部变量时用 `@theme inline`，避免多包一层变量嵌套：

```css
@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, "PingFang SC", sans-serif;
}
```

## 插件改成 @plugin

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

顺序不能反——`@plugin` 必须出现在 `@import "tailwindcss"` 之后。排版本身还是老样子：

```tsx
<article className="prose dark:prose-invert max-w-none" />
```

## 内容扫描

v4 默认自动扫描项目文件，跨包时需要手动 `@source`：

```css
@source "../../../apps/**/*.{ts,tsx}";
@source "../../../packages/ui/src/**/*.{tsx}";
```

这一点在 monorepo 里容易踩坑：**组件库里的类名如果没被扫到，构建产物里就找不着对应的 CSS**，本地 dev 一切正常，上线才发现样式丢了。

## 暗色模式

v4 推荐显式声明变体：

```css
@custom-variant dark (&:is(.dark *));
```

配合 `next-themes` 的 `attribute="class"`，切换主题就是给 `<html>` 加一个 class。

## 几个值得记住的差异

- 配置文件是 CSS，不是 JS —— 编辑器补全靠的是 CSS 语言服务。
- 默认色彩空间换成了 **oklch**，同一组 HSL 值迁移过来后颜色会略有变化。
- `postcss.config` 里只需要留 `@tailwindcss/postcss` 一个插件，`autoprefixer` 不再必需。

整体来说 v4 的改动是"把配置还给 CSS"，理解这一点之后，剩下的都是查文档的事。
