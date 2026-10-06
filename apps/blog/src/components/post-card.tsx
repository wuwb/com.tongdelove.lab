import { Clock } from "lucide-react";
import Link from "next/link";

import { Badge } from "@tongdelove/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tongdelove/ui/components/card";
import { cn } from "@tongdelove/ui/lib/utils";

import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, className }: { post: PostMeta; className?: string }) {
  return (
    <Card
      className={cn(
        "group gap-3 py-5 transition-shadow hover:border-foreground/20 hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="px-5">
        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTime} 分钟
          </span>
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link href={`/posts/${post.slug}`} className="group-hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        {post.description ? (
          <CardDescription className="line-clamp-2">{post.description}</CardDescription>
        ) : null}
      </CardHeader>
      {post.tags.length ? (
        <CardContent className="px-5">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} asChild variant="secondary">
                <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
              </Badge>
            ))}
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
