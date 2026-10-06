"use client";

import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@tongdelove/ui/components/button";
import { Separator } from "@tongdelove/ui/components/separator";
import { cn } from "@tongdelove/ui/lib/utils";

import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-lg text-sm font-bold">
            同
          </span>
          <span className="hidden sm:inline-block">{siteConfig.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link
                href={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  isActive(item.href) && "text-foreground font-medium",
                )}
              >
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button asChild variant="ghost" size="icon">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="菜单"
            onClick={() => setOpen((value) => !value)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 text-sm",
                  isActive(item.href) && "bg-accent text-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Separator />
        </div>
      ) : null}
    </header>
  );
}
