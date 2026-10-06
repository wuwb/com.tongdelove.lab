import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  author: string;
  draft: boolean;
  readingTime: number;
  wordCount: number;
};

export type Post = PostMeta & {
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
  })
  .use(rehypeHighlight, { detect: false })
  .use(rehypeStringify);

function countWords(markdown: string) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ");
  const cjk = plain.match(/[一-龥]/g)?.length ?? 0;
  const latin = plain.replace(/[一-龥]/g, " ").match(/[A-Za-z0-9]+/g)?.length ?? 0;
  return { cjk, latin, total: cjk + latin };
}

function calcReadingTime(markdown: string) {
  const { cjk, latin } = countWords(markdown);
  return Math.max(1, Math.round(cjk / 400 + latin / 220));
}

function readPostFile(fileName: string): PostMeta | null {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const slug = typeof data.slug === "string" && data.slug ? data.slug : fileName.replace(/\.mdx?$/, "");
  const date = data.date instanceof Date ? data.date.toISOString() : String(data.date ?? "");

  if (!data.title || !date) return null;

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date,
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    author: String(data.author ?? "WuWenbin"),
    draft: Boolean(data.draft ?? false),
    readingTime: calcReadingTime(content),
    wordCount: countWords(content).total,
  };
}

function listPostMetas(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const includeDrafts = process.env.NODE_ENV !== "production";

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPostFile)
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return listPostMetas();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const meta = listPostMetas().find((post) => post.slug === slug);
  if (!meta) return null;

  const fileName = fs
    .readdirSync(POSTS_DIR)
    .find((file) => file.replace(/\.mdx?$/, "") === slug || file === `${slug}.md`);
  if (!fileName) return null;

  const { content } = matter(fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8"));
  const file = await processor.process(content);

  return { ...meta, html: String(file) };
}

export function getAllTags(): { tag: string; count: number }[] {
  const counter = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((item) => item.post);
}
