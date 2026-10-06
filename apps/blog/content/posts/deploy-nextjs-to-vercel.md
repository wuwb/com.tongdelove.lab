---
title: "把 monorepo 里的 Next.js 应用部署到 Vercel"
description: "Root Directory、安装命令与过滤安装，几个决定部署成败的配置项。"
date: "2026-10-04"
tags: ["Vercel", "Next.js", "部署"]
author: "WuWenbin"
---

部署单个 Next.js 应用到 Vercel 几乎是零配置的，但如果这个应用躺在 monorepo 的 `apps/` 里，有三个地方必须先想清楚。

## 1. Root Directory 指向应用目录

Vercel 需要知道"项目根目录"在哪，否则它会在仓库根找 `package.json`，然后一脸茫然。

设成 `apps/blog` 之后，Vercel 会在这个目录里做框架识别、跑构建、找 `.next` 产物。

## 2. 安装命令要回到仓库根

`workspace:` 协议只有在 workspace 根目录才能解析。所以在应用目录下的 `vercel.json` 里，安装命令要显式回到根：

```json
{
  "installCommand": "cd ../.. && pnpm install --filter \"blog...\" --no-frozen-lockfile",
  "buildCommand": "next build"
}
```

两个细节：

- `blog...` 的 `...` 表示"连带它的 workspace 依赖"，这里会把 `packages/ui` 一起装上。
- `--no-frozen-lockfile` 是必须的，CI 环境默认冻结 lockfile，新增应用会直接失败。

## 3. 只上传需要的目录

CLI 部署时，Vercel 上传的是当前工作目录。用 `.vercelignore` 把无关目录排除掉，能显著缩短上传和构建时间：

```text
node_modules
.next
apps/*
!apps/blog
packages/*
!packages/ui
```

## 用 CLI 验证一遍

```bash
cd apps/blog
vercel deploy --prod
```

部署完成后，Vercel 会给一个 `.vercel/project.json`，里面记着 `projectId` 和 `orgId`，之后每次部署都复用同一个项目。

## 环境变量

站点地址这类信息建议走环境变量，避免把域名硬编码进代码：

```ts
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
```

`metadataBase`、`sitemap.ts`、RSS 都从这里取地址，改域名时只改一个环境变量。

## 上线前检查清单

1. `pnpm build` 本地能通过。
2. 文章页面全部命中静态生成（构建输出里出现 `●  (SSG)`）。
3. `/sitemap.xml` 与 `/rss.xml` 能正常返回。
4. 深浅色主题各看一遍，确认组件库的变量都被扫进 CSS。

做完这四步，剩下的就是往 `content/posts` 里继续丢 Markdown 了。
