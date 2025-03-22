import RightContent, { Question, SelectLang } from '@/components/RightContent'
import { queryCurrentUser } from '@/services/base/user'
import { QuestionOutlined } from '@ant-design/icons'
import type {
  Settings as LayoutSettings,
  MenuDataItem,
} from '@ant-design/pro-components'
import { SettingDrawer } from '@ant-design/pro-components'
import type {
  RequestConfig,
  RunTimeLayoutConfig,
  RuntimeAntdConfig,
} from '@umijs/max'
import { Link, getLocale, history } from '@umijs/max'
import { message, theme } from 'antd'
import { createLogger } from 'redux-logger'
import { defaultSettings } from '../config/defaultSettings'
import {
  AvatarDropdown,
  AvatarName,
} from './components/RightContent/AvatarDropdown'
import { errorConfig } from './requestErrorConfig'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/**
 * 用户名、头像信息可以通过配置全局初始化信息来提供数据。
 * 权限信息也在这里设置
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  loading?: boolean
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
  currentMenu?: MenuDataItem[]
  fetchMenu?: () => Promise<MenuDataItem[] | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      })
      return msg.data
    } catch (error) {
      console.log('err: ', error)
      // history.push(loginPath);
    }
    return undefined
  }
  const fetchMenu = async () => {
    try {
      const currentMenu = await queryCurrentMenu()
      return currentMenu
    } catch (error) {
      // message.error('Get menu data failed.', 10);
      return []
    }
  }
  // 如果是登录页面，不执行
  const { location } = history

  if (location.pathname !== loginPath && location.pathname !== '/api') {
    const currentUser = await fetchUserInfo()
    const currentMenu: any = []
    // try {
    //   currentMenu = await fetchMenu();
    // } catch (err) {
    // }

    return {
      fetchUserInfo,
      currentUser,
      // fetchMenu,
      currentMenu,
      settings: defaultSettings as Partial<LayoutSettings>,
    }
  }
  return {
    fetchUserInfo,
    // fetchMenu,
    settings: defaultSettings as Partial<LayoutSettings>,
  }
}

// export const layoutActionRef = createRef<{ reload: () => void }>();

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// 退出登陆的逻辑也可以通过配置来自定义。
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: {
  initialState: any
  setInitialState: any
}) => {
  const location = '' // useLocation();

  return {
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      },
    },
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
      fontSize: 13,
    },
    // 页脚信息
    footerRender: () => null, // <Footer />
    onPageChange: (route) => {
      const { location } = history

      // 如果没有登录，重定向到 login
      if (
        !initialState?.currentUser &&
        location.pathname !== loginPath &&
        location.pathname !== '/user/register' &&
        location.pathname !== '/api'
      ) {
        // history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          // <Link to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // <Link to="/~docs">
          //   <BookOutlined />
          //   <span>业务组件文档</span>
          // </Link>,
          // <Link
          //   target="_blank"
          //   to="https://pro.ant.design/docs/getting-started"
          //   rel="noopener noreferrer"
          // >
          //   <QuestionOutlined />
          //   <span>使用文档</span>
          // </Link>,
        ]
      : [
          <Link
            target="_blank"
            to="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            key="help"
          >
            <QuestionOutlined />
            <span>使用文档</span>
          </Link>,
        ],
    menuHeaderRender: undefined, // () => <div>menu</div>, undefined, false

    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }))
              }}
            />
          )}
        </>
      )
    },
    ...initialState?.settings,

    // siderWidth: 208,
    // disableContentMargin: false,

    // menuHeaderRender: (logoDom, titleDom) => (
    //   <Link to="/">
    //     {logoDom}
    //     {titleDom}
    //   </Link>
    // ),
    // 页面头部面包屑
    breadcrumbRender: (routers = []) => {
      return [
        {
          path: '/',
          breadcrumbName: getLocale() === 'zh-CN' ? '主页' : 'Home',
        },
        ...routers,
      ]
    },
    // hash 路由跳转
    // itemRender: (route, params, routes, paths) => {
    //   const last = routes.indexOf(route) === routes.length - 1;
    //   const { path, breadcrumbName } = route;
    //   if (last) {
    //     return <span>{breadcrumbName}</span>;
    //   }
    //   return <Link to={path}>{breadcrumbName}</Link>;
    // },
    // 退出逻辑
    // logout: () => {
    //   alert('退出登录成功');
    // },
    // 渲染右上角信息
    // rightRender: (initialState, setInitialState) => {
    //   return 'xxx';
    // },

    // menuDataRender: () => {
    //   return initialState?.currentMenu || [];
    // },
    // pageTitleRender: true,

    // 动态修改
    logo: (
      <svg width="14" height="12" viewBox="0 0 75 65" fill="#ffffff">
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
    ),
    // title: initialState.serverName,
    // actionRef: layoutActionRef,
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        // const menuData = await fetchMenuData();
        // return menuData;
        return initialState?.menuData
      },
    },
  }
}

type CodeMsg = {
  [key: number]: string
}

export const antd: RuntimeAntdConfig = (memo: any) => {
  memo.theme ||= {}
  memo.theme.algorithm = theme.compactAlgorithm
  return memo
}

const codeMessage: CodeMsg = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/**
 * @name request 配置，可以配置错误处理,运行时配置
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * https://umijs.org/zh-CN/plugins/plugin-request
 */
export const request: RequestConfig = {
  timeout: 3000, // ms, 请求超时

  // 当后端接口不满足该规范的时候你需要通过该配置把后端接口数据转换为该格式
  ...errorConfig,
}

// export const ssr = {
//   modifyGetInitialPropsCtx: async (ctx) => {
//     ctx.title = 'params';
//     return ctx;
//   },
//   beforeRenderServer: async ({
//     env,
//     location,
//     history,
//     mode,
//     context,
//   }) => {
//     // global 为 Node.js 下的全局变量
//     // 避免直接 mock location，这样会造成一些环境判断失效
//     global.mockLocation = location;
//     // 国际化
//     if (location.pathname.indexOf('zh-CN') > -1) {
//       global.locale = 'zh-CN'
//     }
//   }
// }
