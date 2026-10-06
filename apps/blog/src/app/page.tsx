import { ArrowRight, Github, Rss } from "lucide-react";
import Link from "next/link";

import { Badge } from "@tongdelove/ui/components/badge";
import { Button } from "@tongdelove/ui/components/button";
import { Separator } from "@tongdelove/ui/components/separator";

import { PostCard } from "@/components/post-card";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags().slice(0, 10);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <section className="flex flex-col gap-6">
        <Badge variant="secondary" className="w-fit">
          技术笔记 · 工程实践
        </Badge>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          把复杂的东西拆成能跑起来的小步骤
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/posts">
              浏览文章
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/rss.xml">
              <Rss className="size-4" />
              RSS
            </Link>
          </Button>
        </div>
      </section>

      <Separator className="my-14" />

      <section className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">最新文章</h2>
          <Link
            href="/posts"
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
          >
            全部 {posts.length} 篇
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {tags.length ? (
        <section className="mt-14 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">标签</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Badge key={tag} asChild variant="outline">
                <Link href={`/tags/${encodeURIComponent(tag)}`} className="px-3 py-1 text-sm">
                  {tag}
                  <span className="text-muted-foreground ml-1">{count}</span>
                </Link>
              </Badge>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
