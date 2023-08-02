import { useRouter } from 'next/navigation';
import ErrorPage from 'next/error'
import { DefaultLayout } from "@/components/layouts";
import { Breadcrumbs, Container, Grid, Link, Typography } from "@mui/material";
import Article from './Article';
import Sidebar from './Sidebar';

const PostIdPage = (props) => {
    const router = useRouter();
    const { asPath } = router;
    const slug = (router.query.slug as string[]) || []

    if (!router.isFallback && !props.post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const links = [{
        link: 'https://animate.style/',
        title: 'animate.style',
    }, {
        link: 'https://elrumordelaluz.github.io/csshake/',
        title: 'csshake',
    }, {
        link: 'https://larsjung.de/jquery-qrcode/',
        title: 'qrcode'
    }];

    // https://github.com/grz/cpujs

    // 动画
    // http://tinyjs.net/guide/start.html

    return (
        <div id="main" className="main pt-4" role="main">
            <div>
                <p>Hello, I'm the {asPath} page</p>
                <h1>Slug: {slug.join('/')}</h1>
            </div>
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <div className="bg-white">

                            <Article />

                            {links.map(item => {
                                return (
                                    <div key={item.title}>
                                        <a href={item.link}>{item.title}</a>
                                    </div>
                                )
                            })}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

PostIdPage.getLayout = function getLayout(page: JSX.Element) {
    return <DefaultLayout>{page}</DefaultLayout>;
}

// export const getStaticProps = async ({ params }) => {
//     const { page } = params || {};
//     try {
//         const { data } = { data: {} }; // await API.get('');
//         return {
//             props: { postsData: data },
//             revalidate: 60 * 10,
//         };
//     } catch (error) {
//         return { props: { postsData: null } };
//     }
// };

export default PostIdPage;
