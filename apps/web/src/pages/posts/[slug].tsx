import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CMS_NAME } from '@/config/constant'
import { Layout } from '@/components/common'
import WPAPI from 'wpapi'
import { PostService } from '@/services'

const PostsPage = () => {
  const router = useRouter()
  // console.log('router: ', router);

  const { slug } = router.query
  const [post, setPost] = useState<any | null>(null)

  const wp = new WPAPI({ endpoint: 'http://blog.tongdelove.com/wp-json' })
  let apiMethod = wp.posts()

  useEffect(() => {
    PostService.post(slug).then((data) => {
      setPost(data)
    })
    return () => {
      // Your cleanup code, including removeEventListeners
    }
  }, [slug])

  if (!post) {
    return <div>Loading…</div>
  }

  const heroUrl =
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0] &&
    post._embedded['wp:featuredmedia'][0].source_url
      ? post._embedded['wp:featuredmedia'][0].source_url
      : false

  return (
    <div>
      <Head>
        <title>
          {post.postTitle} | {CMS_NAME}
        </title>
      </Head>
      <article className="mb-32">
        {heroUrl ? (
          <div className={`hero flex items-center post-type-${post.post_type}`}>
            <Image
              alt=""
              width={100}
              height={100}
              className="w-100"
              src={heroUrl}
            />
          </div>
        ) : (
          ''
        )}
        <div
          className={`content mh4 mv4 w-two-thirds-l center-l post-${post.id} post-type-${post.post_type}`}
        >
          <h1>{post.postTitle}</h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.postContent,
            }}
          />
        </div>
      </article>
    </div>
  )
}

PostsPage.Layout = Layout

export default PostsPage

// // get date from marked
// export async function getStaticProps({
//   params,
//   preview = false,
//   previewData,
// }: any) {
//   const post: any = getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'content',
//   ])
//   // console.log('post: ', post)
//   const content = await markdownToHtml(post.content || '')

//   return {
//     props: {
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }

// // path from marked
// export async function getStaticPaths() {
//   const posts = getAllPosts(['slug'])

//   return {
//     paths: posts.map((posts: any) => {
//       return {
//         params: {
//           slug: posts.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }

// // get date from wordpress
// export async function getStaticProps({ params, preview = false, previewData }) {
//   const data = await getPostAndMorePosts(params.slug, preview, previewData)

//   return {
//     props: {
//       preview,
//       post: data.post,
//       posts: data.posts,
//     },
//   }
// }

// // path from wordpress
// export async function getStaticPaths() {
//   const allPosts = await getAllPostsWithSlug()

//   return {
//     paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
//     fallback: true,
//   }
// }
