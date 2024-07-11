import Head from 'next/head';
import MoreStories from '@/components/components/more-stories';
import HeroPost from '@/components/components/hero-post';
import { Layout } from '@/components/common';
import { CMS_NAME } from '@/config/constant';

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <div>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
      </Layout>
    </>
  );
}

// export async function getStaticProps({ preview = false }) {
//   const allPosts = await getAllPostsForHome(preview)
//   return {
//     props: { allPosts, preview },
//   }
// }
