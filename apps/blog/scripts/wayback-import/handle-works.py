#!/usr/bin/env python3
"""
Step 2: Handle work-show gallery subpages + mark work-show main pages.

- 25 gallery subpages (168xxx_xxx.md) → move to content/_archive/gallery/
  These are image-detail subpages that are linked FROM work-show main pages.
  They are NOT independent articles; main pages already contain all images.

- 8 work-show main pages → add `type: "work"` + "作品集" tag
  They stay in content/posts/ as proper portfolio pages.

Usage:
    python3 handle-works.py --dry-run
    python3 handle-works.py
"""

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path

BLOG_DIR = Path(__file__).resolve().parent.parent.parent
POSTS_DIR = BLOG_DIR / "content" / "posts"
GALLERY_ARCHIVE = BLOG_DIR / "content" / "_archive" / "gallery"

GALLERY_RE = re.compile(r"^\d{10,}-.+_[\u4e00-\u9fff][\u4e00-\u9fff0-9]*\.md$")
WORK_SHOW_MAIN_RE = re.compile(r"(work-show|works-show)", re.IGNORECASE)

# Known main portfolio entry points (may also match via regex)
WORK_SHOW_MAIN_FILES = {
    "2023-04-water-sprink-day-work-show.md",
    "2023-05-golf-score-project-work-show.md",
    "2023-05-valentines-day-work-show.md",
    "2023-06-sports-day-work-show.md",
    "2023-07-wish-upon-a-star-work-show.md",
    "2023-08-the-most-beautiful-work-show.md",
    "2024-05-enchanted-work-show.md",
    "anchor-siging-online-work-show.md",
}


def add_frontmatter_field(content: str, field: str, value: str) -> str:
    """Add a YAML field to frontmatter (before --- closing)."""
    lines = content.split("\n")
    if not lines or lines[0].strip() != "---":
        return content

    # Find second ---
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        return content

    # Check if field already exists
    for line in lines[1:end_idx]:
        if line.startswith(f"{field}:"):
            # Replace value
            lines = lines[:1] + [f"{field}: {value}"] + lines[1:end_idx] + lines[end_idx:]
            return "\n".join(lines)

    # Insert before end_idx
    lines.insert(end_idx, f"{field}: {value}")
    return "\n".join(lines)


def add_tag(content: str, tag: str) -> str:
    """Add a tag to frontmatter tags list."""
    lines = content.split("\n")
    if not lines or lines[0].strip() != "---":
        return content

    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_idx = i
            break
    if end_idx is None:
        return content

    # Find tags line
    tags_line_idx = None
    for i in range(1, end_idx):
        if lines[i].startswith("tags:"):
            tags_line_idx = i
            break

    if tags_line_idx is None:
        # No tags field yet — add one
        lines.insert(end_idx, f'tags: ["{tag}"]')
        return "\n".join(lines)

    # Parse existing tags
    m = re.match(r'tags:\s*\[(.*)\]', lines[tags_line_idx])
    if not m:
        # Multi-line YAML array — just skip complex case
        return content

    existing = m.group(1)
    # Parse comma-separated quoted strings
    existing_tags = re.findall(r'"([^"]*)"', existing) + re.findall(r"'([^']*)'", existing)
    if tag in existing_tags:
        return content  # already there

    new_tags = existing_tags + [tag]
    new_line = "tags: [" + ", ".join(f'"{t}"' for t in new_tags) + "]"
    lines[tags_line_idx] = new_line
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", default=True)
    parser.add_argument("--no-dry-run", dest="dry_run", action="store_false")
    args = parser.parse_args()

    mode = "DRY RUN" if args.dry_run else "REAL RUN"
    print(f"=== Step 2: Handle works & gallery ({mode}) ===\n")

    all_files = sorted(POSTS_DIR.glob("*.md"))

    gallery_files = []
    work_show_mains = []
    other_files = []

    for f in all_files:
        if GALLERY_RE.match(f.name):
            gallery_files.append(f)
        elif WORK_SHOW_MAIN_RE.search(f.name) or f.name in WORK_SHOW_MAIN_FILES:
            work_show_mains.append(f)
        else:
            other_files.append(f)

    print(f"Gallery subpages to archive:  {len(gallery_files)}")
    print(f"Work-show main pages to mark: {len(work_show_mains)}")
    print(f"Regular articles:             {len(other_files)}")

    # Part A: Archive gallery subpages
    print(f"\n--- Archive gallery subpages → {GALLERY_ARCHIVE} ---")
    for f in gallery_files:
        print(f"  {f.name}")

    if not args.dry_run:
        GALLERY_ARCHIVE.mkdir(parents=True, exist_ok=True)
        for f in gallery_files:
            dest = GALLERY_ARCHIVE / f.name
            if dest.exists():
                dest.unlink()
            shutil.move(str(f), str(dest))
        print(f"\n  ✓ Archived {len(gallery_files)} files")

    # Part B: Mark work-show main pages
    print(f"\n--- Mark work-show main pages with type: work + tag 作品集 ---")
    for f in work_show_mains:
        print(f"  {f.name}")
        if args.dry_run:
            continue

        content = f.read_text(encoding="utf-8")
        content = add_frontmatter_field(content, "type", '"work"')
        content = add_tag(content, "作品集")
        f.write_text(content, encoding="utf-8")

    print(f"\n--- Done ---")
    remaining = len(list(POSTS_DIR.glob("*.md")))
    print(f"Remaining files in content/posts/: {remaining}")


if __name__ == "__main__":
    main()
