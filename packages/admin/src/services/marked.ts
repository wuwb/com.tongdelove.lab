import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  // console.log('\ngetAllPosts: ')
  // console.log('  slugs: ', slugs)
  const posts = slugs
    .map((slug) => {
      const data = getPostBySlug(slug, fields);
      // console.log('data: ', data)
      return data;
    })
    // sort posts by date in descending order
    .sort((post1: any, post2: any) => {
      // console.log('\npost1: ', post1)
      // console.log('post2: ', post2)
      post1.date = new Date(post1.date);
      post2.date = new Date(post2.date);
      return post1.date > post2.date ? -1 : 1;
    });
  return posts;
}
