'use client'

import { getPostAndMorePosts } from '@/lib/wordpress/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import ErrorPage from 'next/error'
import { useRouter } from '@/lib/compat/router'
import { Container } from '@/components/wpnews/components/container'
import { Header } from '@/components/wpnews/components/header'
import { Layout } from '@/components/wpnews/components/layout'
import { MoreStories } from '@/components/wpnews/components/more-stories'
import { PostBody } from '@/components/wpnews/components/post-body'
import { PostHeader } from '@/components/wpnews/components/post-header'
import { PostTitle } from '@/components/wpnews/components/post-title'
import { SectionSeparator } from '@/components/wpnews/components/section-separator'
import { Tags } from '@/components/wpnews/components/tags'

export default function Post({
  post,
  posts,
  preview,
}: {
  post: {
    slug: string
    featuredImage: {
      sourceUrl: string
    }
    author: string
    title: string
    date: string
    categories: string
    content: string
    tags: {
      edges: {
        morePosts: any[]
      }
    }
  }
  posts: {
    edges: boolean
  }
  preview: boolean
}) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}


