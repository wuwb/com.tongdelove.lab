import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@tongdelove/ui/components/badge";
import { Button } from "@tongdelove/ui/components/button";
import { Separator } from "@tongdelove/ui/components/separator";

import { PostCard } from "@/components/post-card";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "文章不存在" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2">
        <Link href="/posts">
          <ArrowLeft className="size-4" />
          返回文章列表
        </Link>
      </Button>

      <article className="flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          {post.description ? (
            <p className="text-muted-foreground text-lg leading-relaxed">{post.description}</p>
          ) : null}
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTime} 分钟阅读
            </span>
            <span>{post.author}</span>
          </div>
          {post.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} asChild variant="secondary">
                  <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
                </Badge>
              ))}
            </div>
          ) : null}
        </header>

        <Separator />

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      {related.length ? (
        <section className="mt-16 flex flex-col gap-6">
          <h2 className="text-xl font-semibold tracking-tight">相关阅读</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
