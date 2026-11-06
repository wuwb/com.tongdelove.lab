#!/usr/bin/env python3
"""
Step 3: Download remote images and localize them.

- Download images from Wayback Machine (archive.org/web/...im_/...)
- Save to public/images/wayback/{slug}/
- Replace remote refs in markdown → local paths
- Rate limit: 1s+ between requests, 3 retries

Usage:
    python3 download-images.py --dry-run --slug command-curl
    python3 download-images.py --slug command-curl
    python3 download-images.py --slug command-curl,debian-9-install-docker-tutorial
    python3 download-images.py --all --dry-run
    python3 download-images.py --all
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BLOG_DIR = Path(__file__).resolve().parent.parent.parent
POSTS_DIR = BLOG_DIR / "content" / "posts"
IMG_BASE = BLOG_DIR / "public" / "images" / "wayback"
REPORT_PATH = BLOG_DIR / "content" / "image-download-report.md"

SLEEP = 1.0
RETRIES = 3
TIMEOUT = 30

# Only these hosts — skip Gravatar, twitter.com, etc.
ALLOWED_HOSTS = {
    "blog.tongdelove.com",
    "tongdelove.com",
    "www.tongdelove.com",
}


def extract_image_urls(md_content: str) -> list[str]:
    """Extract all remote image URLs from markdown body.

    Handles: ![alt](url)  and  [![alt](url)](link)  (image inside link)
    """
    urls = []
    # Markdown image pattern
    for m in re.finditer(r"!\[([^\]]*)\]\((https?://[^)\s]+)\)", md_content):
        url = m.group(2).rstrip(")")
        # Skip Wayback toolbar badges
        if "/web/" in url and "im_" not in url:
            continue
        urls.append(url)
    # Deduplicate
    return list(dict.fromkeys(urls))


def is_downloadable(url: str) -> bool:
    """Check if URL points to a host we want to fetch."""
    try:
        parsed = urlparse(url)
        host = parsed.hostname or ""
        return host in ALLOWED_HOSTS
    except Exception:
        return False


def to_wayback_url(original_url: str, prefer_cdn: bool = True) -> str:
    """Convert original blog image URL → Wayback Machine snapshot URL.

    First try direct archive.org/web/...im_ snapshot.
    If no known snapshot, fall back to original URL.
    """
    return f"https://web.archive.org/web/20240601000000im_/{original_url}"


def download_image(url: str, dest: Path) -> bool:
    """Download image from Wayback Machine. Returns True on success."""
    if dest.exists() and dest.stat().st_size > 500:
        return True  # already downloaded

    dest.parent.mkdir(parents=True, exist_ok=True)

    for attempt in range(RETRIES):
        try:
            r = requests.get(url, timeout=TIMEOUT, verify=False,
                             headers={"User-Agent": "Mozilla/5.0"})
            if r.status_code == 200 and len(r.content) > 200:
                dest.write_bytes(r.content)
                return True
            elif r.status_code in (429, 503):
                wait = 2 ** attempt + 1
                time.sleep(wait)
            elif r.status_code in (404, 410):
                return False  # gone, don't retry
            else:
                return False
        except requests.exceptions.SSLError:
            return False
        except Exception as e:
            wait = 2 ** attempt + 1
            time.sleep(wait)

    return False


def filename_from_url(url: str, fallback_ext: str = ".png") -> str:
    """Generate stable filename for an image URL."""
    parsed = urlparse(url)
    path = parsed.path or ""
    # Try to preserve original filename + extension
    parts = path.split("/")
    orig_name = parts[-1] if parts else ""
    if "." in orig_name and len(orig_name) > 3:
        # Keep original but sanitize
        safe = re.sub(r"[^a-zA-Z0-9._-]", "_", orig_name)[:60]
        hash_part = hashlib.sha256(url.encode()).hexdigest()[:6]
        return f"{hash_part}_{safe}"
    else:
        hash_part = hashlib.sha256(url.encode()).hexdigest()[:12]
        return f"{hash_part}{fallback_ext}"


def download_with_fallback(original_url: str, slug: str) -> tuple[Optional[Path], str]:
    """Try Wayback first, fall back to original. Returns (dest_path_or_None, status)."""
    # Extract extension from URL
    parsed = urlparse(original_url)
    ext = Path(parsed.path).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"}:
        ext = ".png"

    dest = IMG_BASE / slug / filename_from_url(original_url, ext)

    # Try Wayback snapshot
    wb_url = to_wayback_url(original_url)
    if download_image(wb_url, dest):
        return dest, "ok_wb"

    time.sleep(SLEEP)

    # Fallback: try original URL (may be dead but worth one try)
    try:
        r = requests.get(original_url, timeout=15, verify=False,
                         headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200 and len(r.content) > 200:
            dest.write_bytes(r.content)
            return dest, "ok_original"
    except Exception:
        pass

    return None, "failed"


def process_file(file_path: Path, dry_run: bool = False) -> dict:
    """Download + localize all images in one article. Returns stats."""
    slug = file_path.stem
    content = file_path.read_text(encoding="utf-8", errors="replace")
    urls = extract_image_urls(content)

    stats = {
        "slug": slug,
        "total_images": len(urls),
        "to_download": sum(1 for u in urls if is_downloadable(u)),
        "downloaded": 0,
        "failed": 0,
        "skipped": sum(1 for u in urls if not is_downloadable(u)),
        "missing": [],
    }

    if stats["to_download"] == 0:
        return stats

    if dry_run:
        return stats

    for url in urls:
        if not is_downloadable(url):
            continue

        new_path, status = download_with_fallback(url, slug)
        time.sleep(SLEEP)

        if new_path is None:
            stats["failed"] += 1
            stats["missing"].append(url)
            continue

        # Replace in content
        local_md_path = f"/images/wayback/{slug}/{new_path.name}"
        content = content.replace(url, local_md_path)
        stats["downloaded"] += 1

    # Write back
    file_path.write_text(content, encoding="utf-8")
    return stats


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", default=True)
    parser.add_argument("--no-dry-run", dest="dry_run", action="store_false")
    parser.add_argument("--slug", help="Single slug or comma-separated slugs")
    parser.add_argument("--all", action="store_true", help="Process ALL posts")
    parser.add_argument("--limit", type=int, default=0, help="Max articles (0 = all)")
    args = parser.parse_args()

    if not args.slug and not args.all:
        print("Specify --slug <name> or --all")
        sys.exit(1)

    mode = "DRY RUN" if args.dry_run else "REAL RUN"
    print(f"=== Step 3: Localize images ({mode}) ===\n")

    IMG_BASE.mkdir(parents=True, exist_ok=True)

    if args.slug:
        slugs = [s.strip() for s in args.slug.split(",") if s.strip()]
        files = []
        for s in slugs:
            f = POSTS_DIR / f"{s}.md"
            if f.exists():
                files.append(f)
            else:
                print(f"  [!] Not found: {f}")
    else:
        files = sorted(POSTS_DIR.glob("*.md"))
        if args.limit > 0:
            files = files[:args.limit]

    all_stats = []
    for i, f in enumerate(files, 1):
        slug = f.stem
        content_len = len(f.read_text(encoding="utf-8", errors="replace"))
        if content_len < 500:
            continue

        stats = process_file(f, dry_run=args.dry_run)
        all_stats.append(stats)

        marker = "→" if stats["downloaded"] > 0 else "·"
        if not args.dry_run or stats["to_download"] > 0:
            print(f"  [{i}/{len(files)}] {marker} {slug}: "
                  f"{stats['downloaded']}/{stats['to_download']} downloaded, "
                  f"{stats['failed']} failed, {stats['skipped']} skipped")

    # Summary
    total_downloaded = sum(s["downloaded"] for s in all_stats)
    total_failed = sum(s["failed"] for s in all_stats)
    total_missing_articles = [s["slug"] for s in all_stats if s["missing"]]

    print(f"\n--- Summary ---")
    print(f"  Articles processed: {len(all_stats)}")
    print(f"  Images downloaded:  {total_downloaded}")
    print(f"  Images failed:      {total_failed}")

    if total_missing_articles:
        print(f"\n--- Missing images ({len(total_missing_articles)} articles) ---")
        for s in all_stats:
            if s["missing"]:
                print(f"  {s['slug']}:")
                for u in s["missing"]:
                    print(f"    ✗ {u[:100]}")

    if not args.dry_run and total_missing_articles:
        # Write missing-images report
        report_lines = ["# Missing Image Report", "",
                        f"Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}", ""]
        for s in all_stats:
            if s["missing"]:
                report_lines.append(f"## {s['slug']} ({s['failed']} missing)")
                report_lines.append("")
                for u in s["missing"]:
                    report_lines.append(f"- {u}")
                report_lines.append("")
        REPORT_PATH.write_text("\n".join(report_lines), encoding="utf-8")
        print(f"\n  Missing image report: {REPORT_PATH}")


if __name__ == "__main__":
    main()
