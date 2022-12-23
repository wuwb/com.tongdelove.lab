export const menuData = [
    {
        title: "首页",
        url: '/',
    },
    {
        title: "找任务",
        submenu: [
            {
                title: "外包任务",
                url: '/freelancer/tasks',
            },
            {
                title: "订阅任务",
                url: '/freelancer/subscribe',
            },
            {
                title: '接单网站导航',
                url: '/freelancer/websites',
            }
        ],
    },
    {
        title: "看产品",
        submenu: [
            {
                title: "产品",
                url: '/freelancer/products',
            },
            {
                title: "按区域查询",
                url: '/freelancer/products/regions',
            },
            {
                title: '按领域查询',
                url: '/freelancer/products/markets',
            }
        ],
    },
    {
        title: "社区",
        url: '/discussions',
        submenu: [
            {
                title: "讨论",
                description: '提问，寻找支持，连接用户',
                url: '/discussions',
            },
            {
                title: "论坛",
                url: '/forum',
            },
        ]
    },
    {
        title: '开发服务',
        url: '/services',
        submenu: [
            {
                title: '功能展示',
                url: '/services/development/functions',
            },
            {
                title: '小程序案例',
                url: '/services/development/cases',
            },
            {
                title: '解决方案',
                url: '/services/development/solutions'
            },
            {
                title: '客户',
                url: '/services/development/case-studies',
            },
        ],
    },
    {
        title: '工具',
        url: '/tool',
        submenu: [
            {
                title: 'ETF 网格',
                url: '/etf-grid'
            }
        ]
    },
    {
        title: '价格',
        url: '/pricing',
    },

    {
        title: '导航',
        url: '/links',
    },
    {
        title: "关于",
        url: '/about',
        submenu: [
            {
                title: '联系我们',
                url: '/contact',
            },
            {
                title: '意见反馈',
                // feedback
                url: 'https://support.qq.com/product/430271',
            }
        ]
    }
];
