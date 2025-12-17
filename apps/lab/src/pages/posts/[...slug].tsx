import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Article from './Article'
import Sidebar from './Sidebar'
import { useSearchParams } from 'next/navigation'

const PostIdPage = (props) => {
  const router = useRouter()
  const { asPath } = router
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug')

  if (!router.isFallback && !props.post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const links = [
    {
      link: 'https://animate.style/',
      title: 'animate.style',
    },
    {
      link: 'https://elrumordelaluz.github.io/csshake/',
      title: 'csshake',
    },
    {
      link: 'https://larsjung.de/jquery-qrcode/',
      title: 'qrcode',
    },
  ]

  // https://github.com/grz/cpujs

  // 动画
  // http://tinyjs.net/guide/start.html

  return (
    <div id="main" className="main pt-4" role="main">
      <div>
        <p>Hello, I'm the {asPath} page</p>
        <h1>Slug: {slug}</h1>
      </div>
      <div>
        <div>
          <div>
            <div className="bg-white">
              <Article />

              {links.map((item) => {
                return (
                  <div key={item.title}>
                    <a href={item.link}>{item.title}</a>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
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

export default PostIdPage
