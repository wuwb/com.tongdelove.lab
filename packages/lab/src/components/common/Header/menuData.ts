export const menuData = [
    {
        title: "首页",
        url: '/',
    },
    {
        title: "外包任务",
        url: '/freelancer/tasks',
        submenu: [
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
        title: '工具',
        url: '/tools',
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
        title: '客户',
        url: '/case-studies',
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
                title: '意见反馈',
                url: 'https://support.qq.com/product/430271',
            }
        ]
    }
];
