import { DefaultLayout as Layout } from '@/components/Layout/DefaultLayout';
import { createStyles } from 'antd-style';

{
  /* <script src="https://cdn.jsdelivr.net/gh/iMuFeng/bmdb@3.0.0/dist/bmdb.js" /> */
}
// 4zS6dOl96FSuAMJZIkLnQgWeQycA0l27zBgC2amJHkGA88wIBiPIfU6puDN8eq5j
{
  /* <div class="container"></div> */
}
// new Bmdb({
//     type: 'movie',
//     selector: '.container',
//     secret: '7bf4205a0a62d00409f3cd70b0736e1a11a9a6a60f7231567f056819787b8096',
//     noMoreDataTips: '没有更多数据了'
//   })

const useStyles = createStyles(({ token, css }) => ({
  item: css`
    width: 200px;
    height: 100px;
    border: 1px solid #ddd;
  `,
}));

const Page = () => {
  const { styles, cx, theme } = useStyles();

  const data = [
    {
      cate: '服务',
      data: [
        {
          name: 'heroku',
          link: 'https://www.heroku.com',
        },
      ],
    },
    {
      cate: '知识管理',
      data: [
        {
          name: 'PPT分享',
          link: 'https://speakerdeck.com/',
        },
        // <p>代码分享 https://codepen.io/</p>
        // <p>代码分享 https://jsfiddle.net/</p>
      ],
    },
  ];
  const renderItem = function (data) {
    return (
      <div>
        {data.map((item) => {
          return (
            <div key={item.name}>
              <p>{item.name}</p>
              <p>{item.link}</p>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <Layout title="Daohang">
      {data.map((item) => {
        return (
          <div key={item.cate}>
            <h3>{item.cate}</h3>
            {renderItem(item.data)}
          </div>
        );
      })}
      {/*
            <div>
                <h3>前端资讯</h3>
                <div>
                    <p>https://www.w3ctech.com/</p>
                    <p>https://www.w3cplus.com/</p>
                    <p>https://www.qianduan.net/</p>
                    <p>https://css-tricks.com/</p>
                </div>
            </div>
            <div>
                <h3>大厂前端开发</h3>
                <div>
                    <p>http://jayli.github.io/</p>
                    <p>http://blog.doyoe.com/</p>
                </div>
            </div>
            <div>
                <h3>大厂前端</h3>
                <div>
                    <p>https://feclub.cn/</p>
                </div>
            </div>
            <div>
                <h3>大厂掘金</h3>
                <div>
                    <p>https://juejin.im/user/3456520257288974</p>
                </div>
            </div>
            <div>
                <h3>标准资讯</h3>
                <div>
                    <p>W3C 标准 https://www.w3.org/</p>
                    <p>谷歌浏览器开发状态 https://www.chromestatus.com/</p>
                    <p>https://whatwg.org/</p>
                    <p>http://w3help.org/</p>
                </div>
            </div>
            <div>
                <h3>前端大牛</h3>
                <div>
                    <p>https://www.crockford.com/ascii.html</p>
                    <p>ppk https://quirksmode.org/</p>
                </div>
            </div>
            <div>
                <h3>博客</h3>
                <div>
                    <p>21andy博客 http://www.21andy.com/</p>
                </div>
            </div>
            <div>
                <h3>人工智能</h3>
                <div>
                    <p>http://abloz.com/</p>
                </div>
            </div>
            <div>
                <h3>工具</h3>
                <p>微 PE http://www.wepe.com.cn/</p>
                <p>processon https://www.processon.com/</p>
            </div>
            */}
    </Layout>
  );
};

export default Page;
