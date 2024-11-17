import { env } from '@/env/client'

export async function getPosts() {
  const response = await fetch(
      `${env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`
  );
  const posts = await response.json();
  return posts;
}

export async function getSinglePost(postId) {
  const response = await fetch(
      `${env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/${postId}`
  );
  const post = await response.json();
  return post;
}
