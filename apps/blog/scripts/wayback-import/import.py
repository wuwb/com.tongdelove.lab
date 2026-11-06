#!/usr/bin/env python3
"""
Wayback Machine blog importer for blog.tongdelove.com → apps/blog

Usage:
    python3 import.py --dry-run          # default, no file writes
    python3 import.py --limit 10         # only process first N articles
    python3 import.py --max-fetch 5      # fetch at most N raw snapshots
    python3 import.py --skip-images      # don't download images
    python3 import.py --force             # overwrite existing markdown files
    python3 import.py                    # real run (no --dry-run)

Requires: beautifulsoup4, lxml, html2text, requests, charset-normalizer
(e.g. `source .venv-import/bin/activate` in apps/blog/)
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import logging
import os
import re
import sys
import time
import urllib.parse
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup, NavigableString, Tag
from charset_normalizer import from_bytes
import html2text
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

WAYBACK_VERIFY = False  # Wayback Machine SSL sometimes has cert chain issues

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
BLOG_DIR = PROJECT_ROOT  # apps/blog
POSTS_DIR = BLOG_DIR / "content" / "posts"
CACHE_DIR = BLOG_DIR / ".wayback-cache"
IMG_DIR = BLOG_DIR / "public" / "images" / "wayback"
REPORT_DIR = BLOG_DIR / "content"

CDX_BASE = "https://web.archive.org/cdx/search/cdx"
WB_BASE = "https://web.archive.org/web"  # /<timestamp>id_/<url>

SLEEP_BETWEEN = 1.2  # seconds between Wayback requests

# URL patterns that are definitely NOT articles
SKIP_PATH_PREFIXES = [
    "/category/", "/tag/", "/tags/", "/author/",
    "/page/", "/archive/", "/archives/", "/2013/", "/2017/",
    "/feed", "/rss", "/atom", "/sitemap", "/robots",
    "/wp/", "/comments", "/my-account", "/cart/",
    "/about", "/copyright", "/disclaimer", "/privacy",
    "/shop/", "/service/", "/support/", "/messages/",
    "/books/", "/movies/", "/music/", "/comic/", "/teleplay/",
    "/type/", "/product/", "/product-category/",
]
SKIP_EXACT_PATHS = {"/", "/projects/", "/project-experience/",
                    "/tongdelove/", "/open-search-darft-info/"}

# Patterns for "work-show" sub-pages (image gallery items, not articles)
# These have a path segment like /1688290775-20230301_xxx/ (long numeric prefix)
GALLERY_SUBPAGE_RE = re.compile(r"/\d{9,}-[\w\u4e00-\u9fff_]+/?$")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("wayback-import")


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------

@dataclass
class Snapshot:
    timestamp: str        # Wayback timestamp like "20250808011214"
    original: str
    status: str
    mime: str

@dataclass
class ArticleMeta:
    url: str
    slug: str
    title: str
    date: str             # YYYY-MM-DD
    description: str = ""
    tags: list = field(default_factory=list)
    author: str = "WuWenbin"
    selected_ts: str = "" # Wayback timestamp used
    selected_status: str = ""

@dataclass
class ImportResult:
    url: str
    slug: str
    title: str
    date: str
    status: str           # "new" | "skipped" | "conflict" | "failed"
    reason: str = ""
    snapshot_ts: str = ""


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

def _get_json(url: str, params: Optional[dict] = None, retries: int = 3) -> Optional[any]:
    for attempt in range(retries):
        try:
            r = requests.get(url, params=params, timeout=30,
                             headers={"User-Agent": "Mozilla/5.0 (Macintosh; WaybackImporter/1.0)"},
                             verify=WAYBACK_VERIFY)
            if r.status_code == 200:
                return r.json()
            elif r.status_code in (429, 503):
                wait = 2 ** attempt + 1
                log.warning(f"Rate-limited or down ({r.status_code}), sleep {wait}s")
                time.sleep(wait)
            else:
                log.warning(f"HTTP {r.status_code} for {url}")
                return None
        except Exception as e:
            wait = 2 ** attempt + 1
            log.warning(f"Error fetching {url}: {e}, retry in {wait}s")
            time.sleep(wait)
    return None


def _get_raw(url: str, retries: int = 3) -> Optional[bytes]:
    for attempt in range(retries):
        try:
            r = requests.get(url, timeout=30, verify=WAYBACK_VERIFY,
                             headers={"User-Agent": "Mozilla/5.0 (Macintosh; WaybackImporter/1.0)"})
            if r.status_code == 200:
                return r.content
            elif r.status_code in (429, 503):
                wait = 2 ** attempt + 1
                log.warning(f"Rate-limited ({r.status_code}), sleep {wait}s")
                time.sleep(wait)
            elif r.status_code in (404, 410):
                log.warning(f"Gone ({r.status_code}): {url}")
                return None
            else:
                log.warning(f"HTTP {r.status_code} for {url}")
                return None
        except requests.exceptions.SSLError as e:
            log.warning(f"SSL error for {url}: {e} — giving up")
            return None
        except Exception as e:
            wait = 2 ** attempt + 1
            log.warning(f"Error fetching {url}: {e}, retry in {wait}s")
            time.sleep(wait)
    return None


# ---------------------------------------------------------------------------
# Step 1: CDX enumeration + URL classification
# ---------------------------------------------------------------------------

def fetch_cdx() -> list[Snapshot]:
    """Fetch all unique snapshots for blog.tongdelove.com (200 + text/html)."""
    log.info("Fetching CDX index...")
    params = {
        "url": "blog.tongdelove.com/*",
        "output": "json",
        "fl": "timestamp,original,statuscode,mimetype",
        "collapse": "urlkey",
        "filter": "statuscode:200",
        "filter": "mimetype:text/html",
        "limit": 2000,
    }
    data = _get_json(CDX_BASE, params)
    if not data or len(data) < 2:
        log.error("CDX returned nothing")
        return []
    header, rows = data[0], data[1:]
    snaps = []
    for r in rows:
        snaps.append(Snapshot(timestamp=r[0], original=r[1], status=r[2], mime=r[3]))
    log.info(f"CDX: {len(snaps)} unique URLs with snapshots")
    return snaps


def is_article_url(url: str) -> bool:
    """Decide whether a URL likely points to a blog article."""
    parsed = urlparse(url)
    path = parsed.path.rstrip("/") or "/"

    # Skip static assets by extension
    lower_path = path.lower()
    ASSET_EXTENSIONS = (
        ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tif", ".ico",
        ".css", ".js", ".pdf", ".zip", ".tar", ".gz", ".mp3", ".mp4", ".mov", ".flv",
        ".woff", ".woff2", ".ttf", ".otf", ".eot",
        ".xml", ".json", ".txt", ".rss", ".atom",
    )
    if lower_path.endswith(ASSET_EXTENSIONS):
        return False

    # Skip known non-article patterns
    for prefix in SKIP_PATH_PREFIXES:
        if path.startswith(prefix.rstrip("/")):
            return False
    if path in SKIP_EXACT_PATHS:
        return False

    # Skip pagination anywhere: /page/N/, /something/page/N/
    if re.search(r"/page/\d+/?$", path):
        return False

    # Gallery sub-pages: /work-show-name/1688290775-something/ etc.
    if GALLERY_SUBPAGE_RE.search(path):
        return False

    # Redirection style: /115-2/, /689-2/, /127-2/
    if re.match(r"^/\d+-\d+$", path):
        return False

    # Pure digits (old post IDs)
    if re.match(r"^/\d+$", path):
        return False

    return True


def group_by_url(snaps: list[Snapshot]) -> dict[str, list[Snapshot]]:
    groups: dict[str, list[Snapshot]] = {}
    for s in snaps:
        groups.setdefault(s.original.rstrip("/"), []).append(s)
    for v in groups.values():
        v.sort(key=lambda x: x.timestamp)
    return groups


# ---------------------------------------------------------------------------
# Step 2: Pick best snapshot + cache
# ---------------------------------------------------------------------------

def pick_best_snapshot(snaps: list[Snapshot]) -> Optional[Snapshot]:
    """Prefer latest (most recent complete content)."""
    # 200 status, latest timestamp is typically the best-cached
    good = [s for s in snaps if s.status == "200"]
    if not good:
        return snaps[0] if snaps else None
    return good[-1]


def cache_path(orig_url: str, ts: str) -> Path:
    # Use a stable hash of url+ts as filename
    key = hashlib.sha256((orig_url + ts).encode()).hexdigest()[:16]
    safe_name = urlparse(orig_url).path.strip("/").replace("/", "_") or "root"
    safe_name = safe_name[:60]
    return CACHE_DIR / f"{ts}_{key}_{safe_name}.html"


def fetch_and_cache(url: str, snaps: list[Snapshot]) -> tuple[Optional[Path], Optional[Snapshot]]:
    """Try multiple snapshots for a URL until one succeeds. Returns (path, snap_used)."""
    # Sort by timestamp DESC (try newest first), limit to 5 attempts
    sorted_snaps = sorted([s for s in snaps if s.status == "200"],
                          key=lambda x: x.timestamp, reverse=True)[:5]
    if not sorted_snaps:
        return None, None

    for snap in sorted_snaps:
        path = cache_path(url.rstrip("/"), snap.timestamp)
        if path.exists() and path.stat().st_size > 1000:
            log.debug(f"Cache hit: {path.name}")
            return path, snap

        wb_url = f"{WB_BASE}/{snap.timestamp}id_/{url}"
        log.info(f"Fetching [{snap.timestamp}] {url}")
        raw = _get_raw(wb_url)
        if raw and len(raw) > 1000:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(raw)
            time.sleep(SLEEP_BETWEEN)
            return path, snap
        time.sleep(SLEEP_BETWEEN * 0.5)

    return None, None


# ---------------------------------------------------------------------------
# Step 3: Parse HTML → extract metadata + body
# ---------------------------------------------------------------------------

def decode_html(raw: bytes) -> str:
    """Best-effort encoding detection."""
    # Try charset-normalizer first
    result = from_bytes(raw).best()
    if result:
        try:
            text = raw.decode(result.encoding or "utf-8")
        except (UnicodeDecodeError, LookupError):
            text = None
        if text and "<title" in text.lower():
            return text

    # Fallback: try UTF-8, then GBK
    for enc in ["utf-8", "gbk", "gb2312", "big5", "latin-1"]:
        try:
            text = raw.decode(enc)
            if "<title" in text.lower() and len(text) > 5000:
                return text
        except (UnicodeDecodeError, LookupError):
            continue

    # Last resort: utf-8 with errors='replace'
    return raw.decode("utf-8", errors="replace")


def extract_title(soup: BeautifulSoup) -> str:
    """Get clean article title."""
    # <title> – strip site suffix like ' – 吴文斌的博客' or ' | tongdelove'
    if soup.title and soup.title.string:
        t = soup.title.string.strip()
        for sep in [" – ", " — ", " | ", " - ", " › ", " &raquo; "]:
            if sep in t:
                t = t.split(sep)[0].strip()
        t = t.replace("&#8211;", "–").replace("&#8212;", "—")
        return html_unescape(t)

    # og:title
    og = soup.find("meta", property="og:title")
    if og and og.get("content"):
        return html_unescape(og["content"].strip())

    # h1 inside article
    h1 = soup.select_one("article h1, .entry-title, .post-title, .wp-block-post-title h1")
    if h1:
        return h1.get_text(strip=True)
    return ""


def extract_date(soup: BeautifulSoup) -> str:
    """Return YYYY-MM-DD or ''. Try multiple strategies."""
    # 1. <time datetime="...">
    for time_tag in soup.find_all("time"):
        dt = time_tag.get("datetime", "")
        if dt and any(c.isdigit() for c in dt):
            d = parse_iso_date(dt)
            if d:
                return d

    # 2. article:published_time meta
    for sel in [
        ('meta[property="article:published_time"]', "content"),
        ('meta[name="pubdate"]', "content"),
        ('meta[name="date"]', "content"),
    ]:
        el = soup.select_one(sel[0])
        if el and el.get(sel[1]):
            d = parse_iso_date(el[sel[1]])
            if d:
                return d

    # 3. wp JSON-LD
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
            pub = _walk_ld_json(data, "datePublished")
            if pub:
                d = parse_iso_date(pub)
                if d:
                    return d
        except Exception:
            continue

    # 4. Look for YYYY-MM-DD in common CSS classes' text
    for cls in ["entry-date", "published", "post-date", "date"]:
        el = soup.select_one(f".{cls}")
        if el:
            m = re.search(r"(\d{4}[-/]\d{1,2}[-/]\d{1,2})", el.get_text())
            if m:
                return m.group(1).replace("/", "-")

    # 5. HTML comment with date (old WP themes)
    for m in re.finditer(r"published[^>]*>\s*(\d{4}-\d{2}-\d{2})", str(soup)[:300000], re.I):
        return m.group(1)

    return ""


def _walk_ld_json(data, key):
    if isinstance(data, dict):
        if key in data:
            return data[key]
        for v in data.values():
            r = _walk_ld_json(v, key)
            if r:
                return r
    elif isinstance(data, list):
        for item in data:
            r = _walk_ld_json(item, key)
            if r:
                return r
    return None


def parse_iso_date(s: str) -> Optional[str]:
    s = s.strip()
    for fmt in [
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d",
    ]:
        try:
            dt = datetime.strptime(s, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    # fallback regex
    m = re.search(r"(\d{4}-\d{2}-\d{2})", s)
    return m.group(1) if m else None


def extract_tags(soup: BeautifulSoup) -> list[str]:
    """Extract post tags."""
    tags: set[str] = set()

    # meta keywords
    kw = soup.find("meta", attrs={"name": "keywords"})
    if kw and kw.get("content"):
        for t in kw["content"].split(","):
            t = t.strip()
            if t:
                tags.add(t)

    # JSON-LD keywords
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "")
            kw_json = _walk_ld_json(data, "keywords")
            if isinstance(kw_json, list):
                for t in kw_json:
                    tags.add(str(t).strip())
            elif isinstance(kw_json, str):
                for t in kw_json.split(","):
                    t = t.strip()
                    if t:
                        tags.add(t)
        except Exception:
            continue

    # Tags in links with /tag/ or /category/ — treat both as tags
    for a in soup.find_all("a", href=True):
        href = a["href"]
        m = re.search(r"/tag/([^/]+)/?", href)
        if m:
            tag_name = urllib.parse.unquote(m.group(1).replace("-", " "))
            txt = a.get_text(strip=True)
            if txt and len(txt) < 40:
                tags.add(txt)
        m = re.search(r"/category/([^/]+)/?", href)
        if m:
            txt = a.get_text(strip=True)
            if txt and len(txt) < 40:
                tags.add(txt)

    # Remove generic "tag" / "category" words
    tags = {t for t in tags if t and not re.fullmatch(r"(标签|分类|tag|category|tags|categories)", t.lower())}

    return sorted(tags)


def extract_description(soup: BeautifulSoup) -> str:
    d = soup.find("meta", attrs={"name": "description"})
    if d and d.get("content"):
        text = html_unescape(d["content"].strip())
        # Strip WP excerpt markers
        text = re.sub(r"\[&hellip;\]|\[&nbsp;\]", "…", text)
        text = re.sub(r"\[\u2026\]", "…", text)
        return text
    og = soup.find("meta", property="og:description")
    if og and og.get("content"):
        return html_unescape(og["content"].strip())
    return ""


def extract_body(soup: BeautifulSoup) -> Optional[Tag]:
    """Return the main content container as BeautifulSoup Tag."""
    # Primary selectors — WordPress Gutenberg + classic
    selectors = [
        "article .wp-block-post-content",
        "article .entry-content",
        "article .post-content",
        ".wp-block-post-content",
        ".entry-content",
        ".post-content",
        "article",
        ".single-content",
        ".content-area",
        ".post",
        ".entry",
        "#content",
        "main",
        ".main-content",
    ]
    for sel in selectors:
        node = soup.select_one(sel)
        if node and len(node.get_text(strip=True)) > 200:
            return node

    # Fallback heuristic: find the largest <div> by text length
    divs = soup.find_all("div")
    if divs:
        best = max(divs, key=lambda d: len(d.get_text(strip=True)))
        if len(best.get_text(strip=True)) > 300:
            return best

    return None


# ---------------------------------------------------------------------------
# Wayback cleanup — strip toolbar / injected stuff
# ---------------------------------------------------------------------------

WAYBACK_TOOLBAR_RE = re.compile(
    r"<script[^>]*>\s*(?:WABN|wb_).*?</script>", re.DOTALL | re.I
)
WAYBACK_BANNER_RE = re.compile(
    r'<div[^>]*id=["\']wm-ipp-base["\'][^>]*>.*?</div>', re.DOTALL | re.I
)
WB_PREFIX_RE = re.compile(r"/web/\d+[a-z_]*/", re.I)


def strip_wayback_injections(html: str) -> str:
    html = WAYBACK_TOOLBAR_RE.sub("", html)
    html = WAYBACK_BANNER_RE.sub("", html)
    # Remove any stray <script> tags that reference web.archive.org
    html = re.sub(r"<script[^>]*src=[\"'][^\"']*web\.archive\.org[^\"']*[\"'][^>]*>.*?</script>",
                  "", html, flags=re.DOTALL | re.I)
    return html


def rewrite_wb_links(body_html: str) -> str:
    """Strip Wayback timestamp prefix from URLs."""
    body_html = WB_PREFIX_RE.sub("/", body_html)
    return body_html


def html_unescape(s: str) -> str:
    """Minimal HTML entity unescape."""
    from html import unescape
    return unescape(s)


# ---------------------------------------------------------------------------
# HTML → Markdown conversion
# ---------------------------------------------------------------------------

def html_to_markdown(body_soup: Tag, img_map: dict[str, str]) -> str:
    """Convert the extracted article body to GitHub-flavored Markdown.

    img_map: {original_image_url: new_local_or_remote_url} — populated in-place.
    """
    # Remove script/style blocks
    for bad in body_soup.find_all(["script", "style", "noscript", "iframe"]):
        bad.decompose()
    # Remove comments
    for comment in body_soup.find_all(string=lambda s: isinstance(s, NavigableString) and False):
        pass  # bs4 uses special Comment type
    from bs4 import Comment
    for c in body_soup.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()

    # Rewrite image URLs
    for img in body_soup.find_all("img"):
        src = img.get("src") or img.get("data-src") or ""
        if not src:
            img.decompose()
            continue
        new_src = resolve_image_url(src, img_map)
        img["src"] = new_src
        # Remove lazy-load attrs that break rendering
        for attr in ["data-src", "data-original", "loading", "decoding"]:
            if img.has_attr(attr) and attr != "src":
                del img[attr]

    # Convert to string
    body_html = str(body_soup)

    # Convert to markdown with html2text
    h2t = html2text.HTML2Text()
    h2t.ignore_links = False
    h2t.ignore_images = False
    h2t.body_width = 0  # no wrapping
    h2t.protect_links = True
    h2t.inline_links = True
    h2t.wrap_links = False
    h2t.emphasis_mark = '*'
    h2t.strong_mark = '**'
    h2t.pad_tables = True
    h2t.skip_internal_links = True

    md = h2t.handle(body_html)

    # Cleanups
    md = re.sub(r"\n{3,}", "\n\n", md)
    md = re.sub(r"^\s*\n", "", md)
    md = md.strip() + "\n"
    return md


def resolve_image_url(src: str, img_map: dict[str, str]) -> str:
    """Map an image URL to either a local path or keep remote."""
    orig_src = src

    # Strip Wayback prefix
    src = WB_PREFIX_RE.sub("/", src)

    # Resolve protocol-relative URLs
    if src.startswith("//"):
        src = "https:" + src
    if src.startswith("/"):
        # Absolute path relative to blog.tongdelove.com
        src = "https://blog.tongdelove.com" + src

    # Track for download
    img_map[orig_src] = src
    return src  # Return remote for now; will replace after download


# ---------------------------------------------------------------------------
# Slug generation
# ---------------------------------------------------------------------------

def generate_slug(url: str, title: str) -> str:
    """Derive a URL-friendly slug."""
    path = urlparse(url).path.rstrip("/")
    # Prefer last path segment
    parts = [p for p in path.split("/") if p]
    if parts:
        last = urllib.parse.unquote(parts[-1])
        # If it's numeric-redirect style like "115-2", skip and fall back to title
        if not re.fullmatch(r"\d+(-\d+)?", last):
            # Replace non-slug chars
            slug = re.sub(r"[^\w\u4e00-\u9fff]+", "-", last, flags=re.UNICODE)
            slug = slug.strip("-").lower()
            if slug and len(slug) > 2:
                return slug[:80]

    # Fallback: generate from title (use Chinese chars as-is, plus latin)
    slug = re.sub(r"\s+", "-", title.strip().lower())
    slug = re.sub(r"[^\w\u4e00-\u9fff-]+", "", slug, flags=re.UNICODE)
    slug = slug.strip("-")
    if not slug:
        slug = hashlib.md5(url.encode()).hexdigest()[:8]
    return slug[:80]


def unique_slug(slug: str, existing_slugs: set[str]) -> str:
    if slug not in existing_slugs:
        return slug
    base = slug
    i = 2
    while f"{base}-{i}" in existing_slugs:
        i += 1
    return f"{base}-{i}"


# ---------------------------------------------------------------------------
# Frontmatter → write markdown
# ---------------------------------------------------------------------------

def frontmatter_str(meta: ArticleMeta) -> str:
    tags_str = "[" + ", ".join(f'"{t}"' for t in meta.tags) + "]" if meta.tags else "[]"
    desc = meta.description.replace('"', '\\"')[:200]
    return (
        f'---\n'
        f'title: "{meta.title.replace(chr(34), chr(92)+chr(34))}"\n'
        f'description: "{desc}"\n'
        f'date: "{meta.date}"\n'
        f'tags: {tags_str}\n'
        f'author: "{meta.author}"\n'
        f'---\n\n'
    )


def write_markdown(meta: ArticleMeta, markdown_body: str, out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    file_path = out_dir / f"{meta.slug}.md"
    file_path.write_text(frontmatter_str(meta) + markdown_body, encoding="utf-8")
    return file_path


# ---------------------------------------------------------------------------
# Image download
# ---------------------------------------------------------------------------

def download_images(img_map: dict[str, str], slug: str, limit: int = 20) -> dict[str, str]:
    """Download remote images and return {remote_url: local_path} for body replacement.

    Only downloads a few images per article to verify the chain.
    The rest keep remote URLs. Returns updated mapping.
    """
    downloaded: dict[str, str] = {}
    local_subdir = IMG_DIR / slug
    local_subdir.mkdir(parents=True, exist_ok=True)

    count = 0
    for orig_src, remote_url in list(img_map.items()):
        if count >= limit:
            break
        parsed = urlparse(remote_url)
        ext = Path(parsed.path).suffix.lower()
        if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tif"}:
            # No extension or unknown — try to guess from Content-Type after fetch
            pass

        safe_name = hashlib.sha256(remote_url.encode()).hexdigest()[:12]
        local_path = local_subdir / f"{safe_name}{ext}"

        if local_path.exists() and local_path.stat().st_size > 100:
            local_rel = f"/images/wayback/{slug}/{local_path.name}"
            downloaded[orig_src] = local_rel
            downloaded[remote_url] = local_rel
            count += 1
            continue

        log.info(f"  Downloading image: {parsed.path[-60:]}")
        raw = _get_raw(remote_url)
        time.sleep(SLEEP_BETWEEN * 0.5)
        if raw and len(raw) > 50:
            local_path.write_bytes(raw)
            local_rel = f"/images/wayback/{slug}/{local_path.name}"
            downloaded[orig_src] = local_rel
            downloaded[remote_url] = local_rel
            count += 1

    return downloaded


def replace_image_refs(md_body: str, downloaded: dict[str, str]) -> str:
    """Replace remote image refs with local paths in markdown body."""
    for remote, local in downloaded.items():
        md_body = md_body.replace(remote, local)
    return md_body


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Import blog.tongdelove.com from Wayback Machine")
    parser.add_argument("--dry-run", action="store_true", default=True,
                        help="Do not write any files (default ON)")
    parser.add_argument("--no-dry-run", dest="dry_run", action="store_false",
                        help="Actually write files")
    parser.add_argument("--limit", type=int, default=0,
                        help="Process at most N article URLs (0 = all)")
    parser.add_argument("--max-fetch", type=int, default=0,
                        help="Fetch at most N raw HTML snapshots (0 = unlimited)")
    parser.add_argument("--skip-images", action="store_true",
                        help="Don't download images")
    parser.add_argument("--force", action="store_true",
                        help="Overwrite existing markdown files")
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    log.info(f"Mode: {'DRY RUN (no files written)' if args.dry_run else 'REAL RUN (will write files)'}")
    log.info(f"Blog dir: {BLOG_DIR}")

    # Ensure cache dir exists
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    # 1) Fetch CDX
    snaps = fetch_cdx()
    groups = group_by_url(snaps)
    log.info(f"{len(groups)} unique URLs total")

    # 2) Classify as articles
    article_groups: list[tuple[str, list[Snapshot]]] = []
    non_article_count = 0
    for url, lst in groups.items():
        if is_article_url(url):
            article_groups.append((url, lst))
        else:
            non_article_count += 1

    article_groups.sort(key=lambda x: x[1][-1].timestamp)  # sort by latest snapshot time
    log.info(f"→ {len(article_groups)} likely article URLs, skipped {non_article_count} non-articles")

    if args.limit > 0:
        article_groups = article_groups[:args.limit]
        log.info(f"--limit: truncated to {len(article_groups)}")

    # 3) Process each article
    existing_slugs = {p.stem for p in POSTS_DIR.glob("*.md")} if POSTS_DIR.exists() else set()

    results: list[ImportResult] = []
    fetched_count = 0

    for idx, (url, snaps_list) in enumerate(article_groups, 1):
        slug = ""
        title = ""
        date_str = ""
        markdown_body = ""
        description = ""
        tags: list[str] = []
        img_map: dict[str, str] = {}
        local_img_map: dict[str, str] = {}
        snap_used_ts = ""

        try:
            # Fetch HTML — try up to 5 snapshots (newest first), respect cache
            if args.max_fetch > 0 and fetched_count >= args.max_fetch:
                results.append(ImportResult(url=url, slug="", title="", date="",
                                            status="skipped", reason="--max-fetch reached"))
                continue

            cp, snap_used = fetch_and_cache(url, snaps_list)
            if cp is None or snap_used is None:
                results.append(ImportResult(url=url, slug="", title="", date="",
                                            status="failed", reason="fetch failed (all snapshots)"))
                continue
            fetched_count += 1
            raw = cp.read_bytes()
            snap_used_ts = snap_used.timestamp

            # Decode
            text = decode_html(raw)
            text = strip_wayback_injections(text)
            text = rewrite_wb_links(text)

            soup = BeautifulSoup(text, "lxml")

            title = extract_title(soup)
            date_str = extract_date(soup)
            tags = extract_tags(soup)
            description = extract_description(soup)
            body_node = extract_body(soup)

            # Skip archive/category pages masquerading as articles
            NON_ARTICLE_TITLES = {
                "吴文斌的博客", "tongdelove", "Tongdelove",
                "首页", "Home", "home", "Blog", "博客",
            }
            if title in NON_ARTICLE_TITLES or not title:
                results.append(ImportResult(url=url, slug="", title=title, date=date_str,
                                            status="skipped", reason="looks like non-article page"))
                continue

            if not title and not date_str:
                results.append(ImportResult(url=url, slug="", title=title, date=date_str,
                                            status="failed", reason="could not parse title+date"))
                continue

            if not date_str:
                # Fall back to snapshot timestamp
                date_str = snap_used_ts[:4] + "-" + snap_used_ts[4:6] + "-" + snap_used_ts[6:8]
                log.warning(f"  No date found, using snapshot date {date_str}")

            if body_node is None:
                results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                            status="failed", reason="could not find body content"))
                continue

            # Generate base slug (before any dedup)
            base_slug = generate_slug(url, title)

            # Convert body → markdown
            markdown_body = html_to_markdown(body_node, img_map)
            markdown_body = replace_image_refs(markdown_body, local_img_map)

            # Write
            if args.dry_run:
                slug = unique_slug(base_slug, existing_slugs | {r.slug for r in results})
                if slug in existing_slugs:
                    results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                                status="skipped", reason="already exists",
                                                snapshot_ts=snap_used_ts))
                else:
                    results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                                status="new", reason="would create",
                                                snapshot_ts=snap_used_ts))
            else:
                # First check if base slug already exists → skip (idempotent)
                if base_slug in existing_slugs and not args.force:
                    results.append(ImportResult(url=url, slug=base_slug, title=title, date=date_str,
                                                status="skipped", reason="file exists",
                                                snapshot_ts=snap_used_ts))
                    continue
                # For new files, dedup within this batch
                slug = unique_slug(base_slug, existing_slugs | {r.slug for r in results})
                out_path = POSTS_DIR / f"{slug}.md"
                if out_path.exists() and not args.force:
                    results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                                status="skipped", reason="file exists",
                                                snapshot_ts=snap_used_ts))
                    continue

                meta = ArticleMeta(
                    url=url, slug=slug, title=title, date=date_str,
                    description=description, tags=tags,
                    selected_ts=snap_used_ts, selected_status="200",
                )

                # Download images for real runs
                if not args.skip_images:
                    local_img_map = download_images(img_map, slug)
                    markdown_body = replace_image_refs(markdown_body, local_img_map)

                write_markdown(meta, markdown_body, POSTS_DIR)
                results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                            status="new", reason="imported",
                                            snapshot_ts=snap_used_ts))

            log.info(f"[{idx}/{len(article_groups)}] ✅ {date_str} {slug} — {title[:50]}")

        except Exception as e:
            log.exception(f"[{idx}] Error processing {url}: {e}")
            results.append(ImportResult(url=url, slug=slug, title=title, date=date_str,
                                        status="failed", reason=str(e)))

    # 4) Summary report
    report_path = write_report(results, args)
    csv_path = write_csv(results)

    log.info("=" * 60)
    log.info(f"DONE. Processed {len(results)} articles.")
    summarize(results)
    log.info(f"Report: {report_path}")
    log.info(f"CSV:    {csv_path}")


def summarize(results: list[ImportResult]):
    counters: dict[str, int] = {}
    for r in results:
        counters[r.status] = counters.get(r.status, 0) + 1
    for status, count in sorted(counters.items()):
        log.info(f"  {status:10s} : {count}")


def write_report(results: list[ImportResult], args) -> Path:
    counters: dict[str, int] = {}
    reasons: dict[str, int] = {}
    dates: list[str] = []
    for r in results:
        counters[r.status] = counters.get(r.status, 0) + 1
        if r.reason:
            reasons[r.reason] = reasons.get(r.reason, 0) + 1
        if r.date:
            dates.append(r.date)

    dates.sort()
    date_range = f"{dates[0]} → {dates[-1]}" if dates else "N/A"

    lines = [
        "# Wayback Machine Import Report",
        "",
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"Mode: {'DRY RUN' if args.dry_run else 'REAL RUN'}",
        "",
        "## Summary",
        "",
        f"- Total article URLs processed: **{len(results)}**",
        f"- Time range of articles: **{date_range}**",
        "",
        "| Status | Count |",
        "|---|---|",
    ]
    for status in ["new", "skipped", "conflict", "failed"]:
        lines.append(f"| {status} | {counters.get(status, 0)} |")
    lines.append("")

    if reasons:
        lines.append("## Failure / Skip Reasons")
        lines.append("")
        lines.append("| Reason | Count |")
        lines.append("|---|---|")
        for reason, count in sorted(reasons.items(), key=lambda x: -x[1]):
            lines.append(f"| {reason} | {count} |")
        lines.append("")

    lines.append("## Per-article Detail")
    lines.append("")
    lines.append("| # | Slug | Title | Date | Status | Reason |")
    lines.append("|---|---|---|---|---|---|")
    for i, r in enumerate(results, 1):
        title = r.title.replace("|", "\\|")[:60]
        lines.append(f"| {i} | `{r.slug}` | {title} | {r.date} | **{r.status}** | {r.reason} |")

    report_path = REPORT_DIR / "wayback-import-report.md"
    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return report_path


def write_csv(results: list[ImportResult]) -> Path:
    csv_path = REPORT_DIR / "wayback-articles.csv"
    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["url", "snapshot_ts", "title", "date", "slug", "status", "reason"])
        for r in results:
            w.writerow([r.url, r.snapshot_ts, r.title, r.date, r.slug, r.status, r.reason])
    return csv_path


if __name__ == "__main__":
    main()
