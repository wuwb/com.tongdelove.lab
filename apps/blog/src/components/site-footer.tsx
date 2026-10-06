import Link from "next/link";

import { Separator } from "@tongdelove/ui/components/separator";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js
        </p>
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <Link href="/rss.xml" className="hover:text-foreground">
            RSS
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
