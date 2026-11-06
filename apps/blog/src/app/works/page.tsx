import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { getAllWorks } from "@/lib/posts";

export const metadata: Metadata = {
  title: "作品集",
  description: "项目展示与作品集",
};

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">作品集</h1>
        <p className="text-muted-foreground">
          共 {works.length} 个项目展示。
        </p>
      </header>

      {works.length ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {works.map((work) => (
            <PostCard key={work.slug} post={work} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">暂无作品集。</p>
      )}
    </div>
  );
}
