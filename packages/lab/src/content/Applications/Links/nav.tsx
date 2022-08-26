import develop from './develop';

let navs = [
  {
    name: '前端资讯',
    children: [
      {
        name: 'javascript weekly',
        path: 'https://javascriptweekly.com/',
        desc: '',
      },
      {
        name: 'node weekly',
        path: 'https://nodeweekly.com/',
        desc: '',
      },
    ],
  },
  {
    name: '前端开发',
    children: [
      {
        name: '蔡海斌',
        desc: '天道酬勤,知足常乐',
        path: 'http://haibin.info/',
      },
      {
        name: '蔡中剑',
        desc: "Just Sword wang's Blog",
        path: 'https://swordair.com/',
        work: '携程',
        color: '',
        icon: '',
      },
      {
        name: 'Laylib',
        desc: '回归纯与真',
        path: 'http://www.laylib.com/',
      },
      {
        name: 'jjgod / blog',
        desc: 'Random notes & thoughts.',
        path: 'http://blog.jjgod.org/',
        social: {
          weibo: 'http://weibo.com/c7210',
        },
      },
      {
        name: '梦想天空',
        desc: '专注前端开发技术',
        path: 'https://www.cnblogs.com/lhb25/',
      },
      {
        name: 'Be For Web',
        desc: '为网而生 - 关注互联网及移动端产品的用户体验设计',
        path: 'http://beforweb.com/',
      },
      {
        name: 'typeof.net',
        path: 'https://typeof.net/',
      },
      {
        name: '小蝴蝶',
        path: 'http://xiaohudie.net/',
        school: '中国科学技术大学',
        work: '微软亚洲研究院',
        social: {
          email: 'admin@xiaohudie.net',
          github: 'https://github.com/falla',
          twitter: 'https://twitter.com/smallbtf',
          weibo: 'https://weibo.com/smallbutterfly',
        },
      },
      {
        name: 'MUFENG',
        path: 'https://mufeng.me/',
        social: {
          github: 'https://github.com/iMuFeng',
          twitter: 'https://twitter.com/mufeng_me',
        },
      },
      {
        name: 'Hiheng',
        desc: '生活是件有趣的事情',
        path: 'http://hiheng.com/',
        social: {
          douban: 'https://www.douban.com/people/hiheng/',
        },
      },
      {
        name: '无主题博客',
        path: 'https://wuzhuti.cn/',
      },
      {
        name: '吕大豹',
        path: 'https://www.cnblogs.com/lvdabao/',
      },
      {
        name: '谦行',
        path: 'https://www.cnblogs.com/dolphinX/',
      },
      {
        name: '测试狗',
        desc: '老陈',
        path: 'https://thinkerchan.com/',
      },
      {
        name: 'justjavac(迷渡)',
        desc: '专注最时髦的web开发技术',
        path: 'https://justjavac.com/',
      },
      {
        name: '轩枫阁',
        desc: 'My FE Word',
        path: 'https://xuanfengge.com/',
        work: '腾讯',
      },
      {
        name: '吕神的自我修养',
        desc: '不积跬步无以至千里',
        path: 'http://www.lrxin.com/',
      },
      {
        name: '前端小武的博客',
        path: 'https://xuexb.com/',
        work: '百度、火币',
        social: {
          github: 'https://github.com/xuexb/',
          linkedin: 'http://www.linkedin.com/in/xieyaowu/',
        },
      },
      {
        name: 'CSS探索之旅',
        path: 'http://blog.doyoe.com/',
        work: '去哪儿',
        social: {
          weibo: 'https://weibo.com/doyoe',
        },
      },
      {
        name: 'Wenzi',
        path: 'https://www.xiabingbao.com/',
        social: {
          wechat: '前端小茶馆',
        },
      },
      {
        name: '颜海镜',
        desc: '专注Web前端',
        path: 'https://yanhaijing.com/',
        work: '金山、百度、美团',
        social: {
          github: 'https://github.com/yanhaijing',
          wechat: '颜海镜',
        },
      },
      {
        name: '小胡子哥的个人网站',
        desc: "Barret Lee's personal website",
        path: 'https://barretlee.com/',
        work: '阿里',
        social: {
          github: 'https://github.com/barretlee',
          weibo: 'http://weibo.com/173248656',
          twitter: 'https://twitter.com/barret_china',
          zhihu: 'http://www.zhihu.com/people/barretlee',
          email: 'barret.china@gmail.com',
          wechat: 'barretlee_com',
        },
      },
    ],
  },
  {
    name: '英文前端开发',
    children: [
      {
        name: 'Stephen Burgess',
        path: 'https://minimalmonkey.com/',
      },
    ],
  },
  {
    name: 'Github团队',
    children: [
      {
        name: 'Umijs',
        path: 'https://github.com/umijs',
      },
      {
        name: 'midwayjs',
        path: 'https://github.com/midwayjs',
      },
      {
        name: 'Serverless Devs Registry',
        path: 'https://github.com/devsapp',
        desc: '阿里云Serverless Devs HUB',
      },
    ],
  },
  {
    name: 'Github项目',
    children: [
      {
        name: 'midway',
        path: 'https://github.com/midwayjs/midway',
      },
    ],
  },
  {
    name: '专栏',
    children: [
      {
        name: 'Sulajs',
        path: 'https://zhuanlan.zhihu.com/sulajs',
        type: '知乎',
      },
      {
        name: '前端之路',
        path: 'https://www.zhihu.com/column/ascoders',
        type: '知乎',
      },
      {
        name: '',
        path: 'https://www.zhihu.com/org/a-li-ba-ba-tao-xi-ji-zhu',
        type: '知乎',
      },
      {
        name: '前端成长之路',
        path: 'https://www.zhihu.com/column/yinchengnuo',
        type: '知乎',
      },
      {
        name: 'ascoders weekly',
        path: 'https://github.com/ascoders/weekly',
        type: 'Github',
      },
      {
        name: '闲鱼技术',
        path: 'https://juejin.cn/user/1257497031878408/activities',
        type: '掘金',
      },
    ],
  },
  {
    name: '社区网站',
    children: [
      {
        name: '前端里',
        desc: '专注 Web 开发技术',
        path: 'http://www.yyyweb.com/',
      },
      {
        name: 'nomadlist',
        desc: '远程办公社区',
        path: 'https://nomadlist.com/',
      },
    ],
  },
  {
    name: '小程序开发',
    children: [
      {
        name: 'remaxjs',
        path: 'https://remaxjs.org/',
      },
    ],
  },
  {
    name: '组件',
    children: [
      {
        name: 'rebass',
        path: 'https://github.com/rebassjs/rebass',
      },
    ],
  },
  {
    name: '样式库',
    children: [
      {
        name: 'css in js 汇总',
        path: 'https://github.com/MicheleBertoli/css-in-js',
      },
      {
        name: 'less',
        path: 'https://lesscss.org/',
      },
      {
        name: 'sass/scss',
        path: 'https://sass-lang.com/',
        desc: '世界级强大的专业CSS扩展语言',
      },
      {
        name: 'postcss',
        path: 'https://postcss.org/',
      },
      {
        name: 'css-modules',
        path: 'https://github.com/css-modules/css-modules',
      },
      {
        name: 'jss',
        path: 'https://cssinjs.org/',
      },
      {
        name: 'styled-components',
        path: 'https://styled-components.com/',
        comment:
          '曾经最被认可和接受的 CSS-in-JS 库，使用 ECMAScript 6 的标签模板字符串（Tagged template literals）提供的解析函数功能来实现兼容 CSS 的书写语法，学习曲线较为平滑。',
      },
      {
        name: 'emotion',
        path: 'https://emotion.sh/',
      },
      {
        name: 'tailwindcss',
        path: 'https://tailwindcss.com/',
      },
      {
        name: 'styletron',
        path: 'https://www.styletron.org/',
      },
      {
        name: 'aphrodite',
        path: 'https://github.com/Khan/aphrodite',
      },
      {
        name: 'styled-jsx',
        path: 'https://github.com/vercel/styled-jsx',
      },
      {
        name: 'react-css-modules',
        path: 'https://github.com/gajus/react-css-modules',
        ecosystem: [
          {
            name: 'postcss-modules',
            path: 'https://github.com/madyankin/postcss-modules',
          },
        ],
      },
      {
        name: 'glamor',
        path: 'https://github.com/threepointone/glamor',
        status: 'unmaintained',
      },
      {
        name: 'glamorous',
        path: 'https://glamorous.rocks/',
        status: 'unmaintained',
      },
      {
        name: 'radium',
        path: 'https://formidable.com/open-source/radium/',
        status: 'unmaintained',
        comment:
          '最早的 CSS-in-JS 方案之一，实现原理是把 CSS 动态转换为标签内联样式（Inline Styles），即通过 Style 属性传入内联样式，完全规避选择器全局作用域的问题。',
      },
    ],
  },
  {
    name: '测试库',
    children: [
      {
        name: 'jestjs',
        path: 'https://jestjs.io/zh-Hans/',
      },
    ],
  },
  {
    name: '工具',
    children: [
      {
        name: '专利搜索',
        path: 'http://www.soopat.com/',
      },
    ],
  },
];

navs = navs.concat(develop);

export default navs;
