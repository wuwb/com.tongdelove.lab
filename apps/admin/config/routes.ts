// umi routes: https://umijs.org/docs/routing

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
const route = [
  // 首页，跳转到 welcome 页面
  {
    path: '/',
    redirect: '/dashboard/welcome',
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/welcome',
  },

  // 控制面板
  {
    name: 'welcome',
    path: '/dashboard/welcome',
    icon: 'smile', // 图标
    component: './Dashboard/main',
  },

  {
    path: '/products',
    layout: false,
    component: './Web/product',
  },
  {
    path: '/products/:path',
    layout: false,
    component: './Web/productDetail',
  },

  // 报价
  {
    name: '报价',
    path: '/quotation',
    icon: 'crown',
    routes: [
      {
        name: '单页',
        path: '/quotation/broadsheet',
        routes: [
          {
            name: '普通单页',
            path: '/quotation/broadsheet/normal',
            component: './Quotation/broadsheet/normal',
          },
        ],
      },
      {
        name: '不干胶',
        path: '/quotation/sticker',
        routes: [
          {
            name: '普通单页',
            path: '/quotation/sticker/normal',
            component: './Quotation/sticker/normal',
          },
        ],
      },
      {
        name: '名片',
        path: '/quotation/business-card',
        routes: [
          {
            name: '普通单页',
            path: '/quotation/business-card/normal',
            component: './Quotation/business-card/normal',
          },
        ],
      },
      {
        name: '纸盒',
        path: '/quotation/paperbox',
        routes: [
          {
            name: '普通单页',
            path: '/quotation/paperbox/normal',
            component: './Quotation/paperbox/normal',
          },
        ],
      },
      {
        name: '自热餐盒',
        path: '/quotation/self-heating-boxes',
        component: './Quotation/SelfHeatingBox/Box',
      },
      {
        name: '自热餐盒包装',
        path: '/quotation/self-heating-box',
        routes: [
          {
            name: '不干胶',
            path: '/quotation/self-heating-box/sticker',
            component: './Quotation/SelfHeatingBox/sticker',
          },
          {
            name: '单页',
            path: '/quotation/self-heating-box/broadsheet',
            component: './Quotation/SelfHeatingBox/broadsheet',
          },
          {
            name: '腰封',
            path: '/quotation/self-heating-box/paper-sleeve',
            component: './Quotation/SelfHeatingBox/paper-sleeve',
          },
          {
            name: '纸套',
            path: '/quotation/self-heating-box/paper-tapes',
            component: './Quotation/SelfHeatingBox/paper-tapes',
          },
        ],
      },
      {
        name: '年货',
        path: '/quotation/stocking',
        routes: [
          {
            name: '对联',
            path: '/quotation/stocking/normal',
            component: './Quotation/broadsheet/normal',
          },
        ],
      },
      {
        name: '手提袋',
        path: '/quotation/reticule',
        routes: [
          {
            name: '牛皮纸袋',
            path: '/quotation/reticule/normal',
            component: './Quotation/broadsheet/normal',
          },
        ],
      },
      {
        name: '纸罐',
        path: '/quotation/paper-can',
        routes: [
          {
            name: '牛皮纸袋',
            path: '/quotation/paper-can/normal',
            component: './Quotation/broadsheet/normal',
          },
        ],
      },
    ],
  },

  // web
  {
    name: 'web',
    path: '/web',
    icon: 'crown',
    routes: [
      {
        name: 'products',
        path: '/web/products',
        redirect: '/products',
      },
      // 查询表格
      {
        name: 'list.table-list',
        icon: 'table',
        path: '/web/list',
        component: './Welcome',
      },
      // 项目
      {
        name: 'items',
        icon: 'smile',
        path: '/web/items',
        component: './Welcome',
      },
      // 订单
      {
        name: 'orders',
        icon: 'smile',
        path: '/web/orders',
        component: './Welcome',
      },
      // 物流
      {
        name: 'shipments',
        icon: 'smile',
        path: '/web/shipments',
        component: './Welcome',
      },
      // 报价
      {
        name: 'billing',
        icon: 'smile',
        path: '/web/billing',
        component: './Welcome',
      },
      // 店铺
      {
        name: 'shop',
        icon: 'smile',
        path: '/web/shop',
        component: './Welcome',
      },
      // 分类
      {
        name: 'catalog',
        icon: 'smile',
        path: '/web/catalog',
        component: './Welcome',
      },
      // 购物车
      {
        name: 'cart',
        icon: 'smile',
        path: '/web/cart',
        component: './Welcome',
      },
    ],
  },

  // 项目
  {
    name: 'dashboard',
    path: '/dashboard',
    icon: 'crown',
    routes: [
      // 项目
      {
        name: 'items',
        icon: 'smile',
        path: '/dashboard/items',
        component: './Welcome',
      },
      // 订单
      {
        name: 'orders',
        icon: 'smile',
        path: '/dashboard/orders',
        component: './Welcome',
      },
      // 物流
      {
        name: 'shipments',
        icon: 'smile',
        path: '/dashboard/shipments',
        component: './Welcome',
      },
      // 报价
      {
        name: 'billing',
        icon: 'smile',
        path: '/dashboard/billing',
        component: './Welcome',
      },
    ],
  },

  // 工具
  {
    name: 'tools',
    path: '/tools',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        name: 'transform',
        path: '/tools/transform',
        routes: [
          {
            name: 'book-thickness',
            path: '/tools/transform/book-thickness',
            component: './Tool/BookThickness',
          },
        ],
      },
      {
        name: 'printed-size',
        path: '/tools/printed-size',
        component: './Tool/PrintedSize',
      },
      {
        name: 'jian-la-ji',
        path: '/tools/jian-la-ji',
        component: './Tool/JianLaJi',
      },
    ],
  },

  // 设置
  {
    name: 'setting',
    path: '/settings',
    icon: 'table',
    routes: [
      {
        name: 'import-taobao-csv',
        icon: 'smile',
        path: '/settings/import-taobao-csv',
        component: './Resource/TaobaoOrderRaw/ImportTaobaoCsv',
      },
    ],
  },

  // 资源
  {
    name: 'resource',
    path: '/resource',
    icon: 'crown',
    routes: [
      {
        name: 'product-list',
        path: '/resource/product-list',
        // component: './Resource/product/list',
        component: './Resource/customOrder',
      },
      {
        name: 'post',
        path: '/resource/post',
        component: './Resource/post',
        routes: [
          {
            name: 'create',
            path: '/resource/post/create',
            component: './Resource/post/create',
          },
          {
            name: 'edit',
            path: '/resource/post/edit/:id',
            component: './Resource/post/edit',
          },
          {
            name: 'list',
            path: '/resource/post/list',
            component: './Resource/post/list',
          },
        ],
      },
      {
        name: 'product',
        path: '/resource/product',
        routes: [
          {
            name: 'list',
            path: '/resource/product/list',
            // component: './Resource/product/list',
            component: './Resource/customOrder',
          },
          {
            name: 'category',
            path: '/resource/product/category',
            component: './Resource/product/category',
          },
          {
            name: 'property',
            path: '/resource/product/property',
            component: './Resource/product/property',
          },
        ],
      },
      {
        name: 'inquiry',
        path: '/resource/inquiry',
        component: './Resource/inquiry',
        routes: [
          {
            name: 'list',
            path: '/resource/inquiry/list',
            component: './Resource/inquiry/list',
          },
          {
            name: 'dustbin',
            path: '/resource/inquiry/dustbin',
            component: './Resource/inquiry/dustbin',
          },
          {
            name: 'setting',
            path: '/resource/inquiry/setting',
            component: './Resource/inquiry/setting',
          },
        ],
      },
      {
        name: 'client',
        path: '/resource/client',
      },
      {
        name: 'clientCompany',
        path: '/resource/client-company',
        component: './Resource/clientCompany',
      },
      {
        name: 'experts',
        path: '/resource/experts',
        component: './Resource/experts',
      },
      {
        name: 'agencyCompany',
        path: '/resource/agency-company',
        component: './Resource/agencyCompany',
      },
      {
        name: 'supplyCompany',
        path: '/resource/supply-company',
        component: './Resource/supplyCompany',
      },
      {
        name: 'customOrder',
        path: '/resource/custom-order',
        component: './Resource/customOrder',
      },
      {
        name: 'taobaoOrderRaw',
        path: '/resource/taobao-order-raw',
        component: './Resource/TaobaoOrderRaw',
      },
    ],
  },

  // 系统
  {
    path: '/system',
    name: 'system',
    icon: 'crown',
    // access: 'canAdmin',
    routes: [
      {
        path: '/system/user',
        name: 'user',
        icon: 'TeamOutlined',
        component: './System/User',
        // access: 'canAdmin',
      },
      {
        path: '/system/role',
        name: 'role',
        icon: 'UserOutlined',
        component: './System/Role',
        // access: 'canAdmin',
      },
      {
        path: '/system/permission',
        name: 'permission',
        icon: 'StopOutlined',
        component: './System/Permission',
        // access: 'canAdmin',
      },
      {
        path: '/system/menu',
        name: 'menu',
        icon: 'MenuOutlined',
        component: './System/Menu',
        // access: 'canAdmin',
      },
      {
        path: '/system/auth',
        name: 'auth',
        icon: 'MenuOutlined',
        component: './System/Auth',
        // access: 'canAdmin',
      },
      {
        path: '/system/plugin',
        name: 'plugin',
        icon: 'HistoryOutlined',
        component: './System/Plugin',
        // access: 'canAdmin',
      },
      {
        path: '/system/task',
        name: 'task',
        icon: 'HistoryOutlined',
        component: './System/Task',
        // access: 'canAdmin',
      },
      {
        path: '/system/log',
        name: 'log',
        icon: 'HistoryOutlined',
        component: './System/Log',
        // access: 'canAdmin',
      },
    ],
  },

  // 账号设置
  {
    name: 'account',
    icon: 'crown',
    path: '/account/settings',
    component: './AccountSetting',
  },

  // user
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },

  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        name: '首页',
        path: '/',
        component: '@/pages/Admin',
        // exact: true,
      },

      // tools
      {
        name: '工具',
        path: '/tools',
        routes: [
          {
            name: '时间工具',
            path: '/tools/timestamp',
            component: '@/pages/Tool/timestamp/timestamp',
          },
          {
            name: '血缘关系',
            path: '/tools/blood',
            component: '@/pages/Tool/blood',
          },
        ],
      },
      // 经济
      {
        exact: false,
        path: '/finance/materials',
        routes: [
          {
            exact: true,
            path: '/finance/materials',
            component: '@/pages/Finance/materials',
          },
        ],
      },
    ],
  },

  // 404
  {
    path: '*',
    layout: false,
    component: './Exception/404',
  },
]

export default route
