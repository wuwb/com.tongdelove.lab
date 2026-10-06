---
title: "pnpm workspace：把 UI 组件库共享给所有应用"
description: "在 monorepo 里让 apps 直接复用 packages 的源码，绕过先发布再安装的循环。"
date: "2026-09-24"
tags: ["pnpm", "Monorepo", "工程实践"]
author: "WuWenbin"
---

把博客放进 monorepo 之后，第一个要解决的问题是：**怎么让 `apps/blog` 用到 `packages/ui` 里的组件**。

## 三种做法

1. 发布到 npm 再安装 —— 改一行组件要等一次发版，不适合迭代期。
2. `file:` 协议软链 —— 能用，但构建时会把整个目录拷进来。
3. `workspace:` 协议 —— pnpm 的官方答案。

我选第三种：

```json
{
  "dependencies": {
    "@tongdelove/ui": "workspace:*"
  }
}
```

`pnpm install` 之后，`apps/blog/node_modules/@tongdelove/ui` 是一个指向 `packages/ui` 的软链，改组件立即生效，不需要任何构建步骤。

## 直接导出源码

`packages/ui` 没有编译产物，它的 `package.json` 直接把 `src` 暴露出去：

```json
{
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./lib/*": "./src/lib/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  }
}
```

于是应用侧可以这样按需引入：

```tsx
import { Button } from "@tongdelove/ui/components/button";
import { Card, CardContent } from "@tongdelove/ui/components/card";
import { cn } from "@tongdelove/ui/lib/utils";
```

代价是应用必须自己编译这些 TSX，Next.js 里加一行即可：

```ts
const nextConfig: NextConfig = {
  transpilePackages: ["@tongdelove/ui"],
};
```

## 依赖版本对齐

monorepo 最容易出现的问题，是同一个包在不同应用里装了不同版本。pnpm 提供了 `catalog`，在 `pnpm-workspace.yaml` 里统一声明：

```yaml
catalog:
  react: ^19.2.0
  react-dom: ^19.2.0
  typescript: ^5.9.3
```

应用里写 `"react": "catalog:"`，版本漂移的可能性就被消灭了大半。

## 只安装需要的部分

随着应用变多，全量 `pnpm install` 会越来越慢。pnpm 支持按依赖图裁剪安装：

```bash
# 只装 blog 以及它依赖的 workspace 包
pnpm install --filter "blog..." --no-frozen-lockfile
```

`blog...` 末尾的 `...` 表示"以及它的依赖"，CI 里用这一条能省下大量时间。

> 经验：CI 默认开启 frozen lockfile，新增应用后记得加 `--no-frozen-lockfile`，否则会直接报 `ERR_PNPM_OUTDATED_LOCKFILE`。

## 什么时候该拆包

我的判断标准很简单：**当第二个应用开始复制同一段代码时，就该抽到 `packages/`**。反过来，只有一个使用方的包，留在应用内部反而更省心——拆包带来的发布、版本、文档成本是实打实的。
