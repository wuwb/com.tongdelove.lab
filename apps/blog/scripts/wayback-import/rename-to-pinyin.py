#!/usr/bin/env python3
"""
Step 1: Rename Chinese-slug article files → pinyin slug.
Only touches Wayback-imported files (author=WuWenbin) in content/posts/.
User's original files (build-a-blog-with-nextjs.md etc.) are untouched.

Usage:
    python3 rename-to-pinyin.py --dry-run       # show what would change
    python3 rename-to-pinyin.py                  # actually rename files
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

from pypinyin import pinyin, Style

POSTS_DIR = Path(__file__).resolve().parent.parent.parent / "content" / "posts"

# Files that existed before Wayback import — DO NOT TOUCH
USER_ORIGINAL_FILES = {
    "build-a-blog-with-nextjs.md",
}

# Gallery subpages (168829xxxx-xxx_中文+数字.md) — handled in step 2 as works, not renamed here
GALLERY_RE = re.compile(r"^\d{10,}-.+_[\u4e00-\u9fff][\u4e00-\u9fff0-9]*\.md$")


def title_to_pinyin_slug(title: str) -> str:
    """Convert a Chinese title to pinyin slug (no tones, lowercase, hyphen-separated).

    English words and tech terms are preserved as-is by pypinyin.
    """
    # Get pinyin list (each char → list of readings; pick first = default)
    pys = pinyin(title, style=Style.NORMAL, heteronym=False)
    # Flatten and join each segment
    parts = []
    for item in pys:
        parts.append(item[0])
    joined = " ".join(parts)
    # Normalize: strip punctuation around space
    # Replace non-[a-z0-9] chars with hyphen
    slug = re.sub(r"[^a-z0-9]+", "-", joined.lower())
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug


def unique_slug(slug: str, existing: set[str]) -> str:
    if slug not in existing:
        return slug
    i = 2
    while f"{slug}-{i}" in existing:
        i += 1
    return f"{slug}-{i}"


def read_title(file_path: Path) -> str:
    """Extract title from markdown frontmatter."""
    content = file_path.read_text(encoding="utf-8", errors="replace")
    m = re.search(r'^title:\s*"([^"]+)"', content, re.MULTILINE)
    if m:
        return m.group(1).strip()
    m = re.search(r"^title:\s*(.+)$", content, re.MULTILINE)
    if m:
        return m.group(1).strip().strip('"').strip("'")
    # Fallback to H1
    m = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if m:
        return m.group(1).strip()
    return file_path.stem


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", default=True)
    parser.add_argument("--no-dry-run", dest="dry_run", action="store_false")
    args = parser.parse_args()

    mode = "DRY RUN" if args.dry_run else "REAL RUN"
    print(f"=== Step 1: Rename Chinese slugs → pinyin ({mode}) ===")

    all_files = sorted(POSTS_DIR.glob("*.md"))
    print(f"Total .md files in posts/: {len(all_files)}")

    # Collect what we currently have
    existing_stems = {p.stem for p in all_files}
    rename_plan = []  # [(old_file, new_stem, title)]

    skipped_user_orig = []
    skipped_gallery = []
    skipped_already_en = []

    for f in all_files:
        stem = f.stem

        # Skip user original
        if f.name in USER_ORIGINAL_FILES:
            skipped_user_orig.append(f.name)
            continue

        # Skip gallery subpages (handled in step 2)
        if GALLERY_RE.match(f.name):
            skipped_gallery.append(f.name)
            continue

        # Skip if already all-Latin slug (no Chinese chars)
        if not re.search(r"[\u4e00-\u9fff]", stem):
            skipped_already_en.append(f.name)
            continue

        # This one needs renaming
        title = read_title(f)
        new_slug = title_to_pinyin_slug(title)

        # If generated slug is identical to current stem, skip
        if new_slug == stem:
            continue

        rename_plan.append((f, new_slug, title))

    # Resolve conflicts
    planned_stems = existing_stems.copy()
    final_plan = []
    for (old_file, new_slug, title) in rename_plan:
        resolved = unique_slug(new_slug, planned_stems)
        planned_stems.add(resolved)
        final_plan.append((old_file, resolved, title))

    # Report
    print(f"\nSkipped (user original): {len(skipped_user_orig)}")
    print(f"Skipped (gallery, step 2): {len(skipped_gallery)}")
    print(f"Skipped (already English): {len(skipped_already_en)}")
    print(f"\nFiles to rename: {len(final_plan)}")

    if final_plan:
        print("\nSample renames:")
        for (old, new, title) in final_plan[:10]:
            marker = "" if old.stem == new else f" → {new}.md"
            print(f"  {old.name} → {new}.md")
            if old.stem != new:
                print(f"    title: {title}")

    if args.dry_run:
        print("\n[DRY RUN] No files changed. Re-run with --no-dry-run to apply.")
        return

    # Apply renames
    renamed = 0
    failed = 0
    for (old_file, new_stem, title) in final_plan:
        new_path = old_file.parent / f"{new_stem}.md"
        if new_path.exists():
            print(f"  [SKIP TARGET EXISTS] {old_file.name} → {new_stem}.md")
            failed += 1
            continue
        try:
            shutil.move(str(old_file), str(new_path))
            print(f"  ✓ {old_file.name} → {new_stem}.md")
            renamed += 1
        except Exception as e:
            print(f"  ✗ FAIL {old_file.name}: {e}")
            failed += 1

    print(f"\nDone. Renamed: {renamed}, Failed: {failed}")


if __name__ == "__main__":
    main()
