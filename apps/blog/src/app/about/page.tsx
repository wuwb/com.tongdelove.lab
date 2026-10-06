import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: siteConfig.author.bio,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <header className="mb-8 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">关于</h1>
        <p className="text-muted-foreground">{siteConfig.author.bio}</p>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2>这个博客是怎么搭的</h2>
        <ul>
          <li>框架：Next.js App Router，全站静态生成</li>
          <li>组件：来自 monorepo 里的 <code>packages/ui</code>（shadcn/ui + Tailwind CSS v4）</li>
          <li>内容：Markdown 文件放在 <code>content/posts</code>，通过 unified / remark / rehype 编译成 HTML</li>
          <li>部署：Vercel</li>
        </ul>

        <h2>写点什么</h2>
        <p>
          文章以 Markdown 保存，头部用 frontmatter 写元信息，新增一篇文章只需要往
          <code>content/posts</code> 里丢一个 <code>.md</code> 文件：
        </p>
        <pre>
          <code>{`---
title: "文章标题"
description: "一句话摘要"
date: "2026-09-20"
tags: ["Next.js", "Markdown"]
---

正文内容……`}</code>
        </pre>

        <blockquote>
          <p>工程里最有价值的东西，往往是把一件事做到可重复。</p>
        </blockquote>
      </div>
    </div>
  );
}
