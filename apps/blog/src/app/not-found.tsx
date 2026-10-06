import Link from "next/link";

import { Button } from "@tongdelove/ui/components/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-muted-foreground text-sm">404</p>
      <h1 className="text-3xl font-bold tracking-tight">页面走丢了</h1>
      <p className="text-muted-foreground">这个地址下没有内容，换个地方看看吧。</p>
      <Button asChild className="mt-2">
        <Link href="/">回到首页</Link>
      </Button>
    </div>
  );
}
