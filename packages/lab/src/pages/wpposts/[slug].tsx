import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Container from '../wpnews/components/container';
import PostBody from '../wpnews/components/post-body';
import MoreStories from '../wpnews/components/more-stories';
import Header from '../wpnews/components/header';
import PostHeader from '../wpnews/components/post-header';
import SectionSeparator from '../wpnews/components/section-separator';
import Layout from '../wpnews/components/layout';
import PostTitle from '../wpnews/components/post-title';
import Tags from '../wpnews/components/tags';
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/wordpress/api';

export default function Post({ post, posts, preview }) {
    const router = useRouter();
    const morePosts = posts?.edges;

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
                            <Head>
                                <meta
                                    property="og:image"
                                    content={post.featuredImage?.sourceUrl}
                                />
                            </Head>
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

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    previewData,
}) => {
    const data = await getPostAndMorePosts(params?.slug, preview, previewData)

    return {
        props: {
            preview,
            post: data.post,
            posts: data.posts,
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    // const allPosts = await getAllPostsWithSlug()

    return {
        paths: [], //allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
        fallback: true,
    }
}
