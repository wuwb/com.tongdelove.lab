---
title: "用 Next.js App Router 搭一个纯静态博客"
description: "不接数据库、不用 CMS，只靠 Markdown 文件和静态生成，把博客的构建链路压到最短。"
date: "2026-09-18"
tags: ["Next.js", "React", "Markdown"]
author: "WuWenbin"
---

一个技术博客需要的其实很少：**一个能读 Markdown 的程序，和一堆 Markdown 文件**。剩下的事情——列表页、详情页、标签、RSS、SEO——都可以交给 App Router 的静态生成。

这篇记录我在 monorepo 里新建 `apps/blog` 的全过程。

## 为什么不用 CMS

| 方案 | 优点 | 代价 |
| --- | --- | --- |
| Headless CMS | 有后台、多人协作 | 多一个服务、多一份账单 |
| 数据库 | 灵活、可查询 | 需要接口层与缓存 |
| Markdown 文件 | 零依赖、可 diff、可 review | 写作需要本地环境 |

对一个人维护的博客来说，第三种方案的性价比高得离谱：文章就是仓库里的文件，改一个错别字走一次 commit，历史记录天然完整。

## 目录结构

```text
apps/blog
├── content/posts      # 文章源文件
│   ├── build-a-blog-with-nextjs.md
│   └── ...
└── src
    ├── app            # 路由
    ├── components     # 组件
    └── lib/posts.ts   # Markdown 读取与编译
```

## 读取 Markdown

核心就两件事：**解析 frontmatter** 和 **把 Markdown 编译成 HTML**。

```ts
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify);

export function getAllPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      return { slug: file.replace(/\.md$/, ""), ...data, content };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
```

> 关键点：`fs` 只在**构建时**执行。只要页面是静态生成的，部署产物里就不存在"运行时读文件"这回事。

## 静态生成每一篇文章

用 `generateStaticParams` 把 slug 全部枚举出来，Next.js 会在构建阶段把每篇文章渲染成 HTML：

```tsx
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return <article dangerouslySetInnerHTML={{ __html: post.html }} />;
}
```

注意 Next.js 15 之后 `params` 是 `Promise`，需要 `await`。

## 一点体会

- **先做静态，再谈动态**。评论、搜索、浏览量这些可以后加，静态骨架不该为它们让路。
- **元信息写进 frontmatter**，标题、摘要、标签、日期统一在一个地方，列表页和 RSS 都能复用。
- **草稿用 `draft: true` 控制**，构建时过滤掉，本地开发照常可见。

写完这些，一个能用的博客就成型了。下一篇聊 monorepo 里怎么把 `packages/ui` 的组件接进来。
