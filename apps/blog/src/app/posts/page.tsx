import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章列表",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">文章</h1>
        <p className="text-muted-foreground">
          共 {posts.length} 篇文章，持续更新中。
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
