export const siteConfig = {
  name: "同得实验室",
  title: "同得实验室 Blog",
  description:
    "记录产品开发、工程实践与一些零散想法的技术博客，聊 Next.js、Monorepo、Tailwind 与部署。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.tongdelove.com",
  locale: "zh-CN",
  author: {
    name: "WuWenbin",
    bio: "产品与工程都写一点，喜欢把复杂的东西拆成能跑起来的小步骤。",
  },
  nav: [
    { title: "首页", href: "/" },
    { title: "文章", href: "/posts" },
    { title: "标签", href: "/tags" },
    { title: "关于", href: "/about" },
  ],
  links: {
    github: "https://github.com/wuwb",
    rss: "/rss.xml",
  },
} as const;
