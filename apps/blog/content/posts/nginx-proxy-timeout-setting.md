---
title: "nginx 代理超时时间设置"
description: "在公司维护的一个系统内部有提供接口代理转发功能。今天有使用方找过来说自己有个接口，由于依赖的服务有问题，且暂时 …"
date: "2024-05-12"
tags: ["nginx", "nodejs", "proxy", "timeout", "开发", "超时", "超时时间", "转发", "默认时间"]
author: "WuWenbin"
---

在公司维护的一个系统内部有提供接口代理转发功能。今天有使用方找过来说自己有个接口，由于依赖的服务有问题，且暂时性的无法修复，返回数据非常慢，要一两分钟才能返回。现在这个接口在我的系统里做转发，每次请求超过一分钟就会提示接口超时。  
首先先了下转发逻辑，转发逻辑底层使用 Nodejs 的 http.request，默认没有超时时间。  
再看了下 Nodejs Server 的默认超时时间是 120 秒。  
加断点看了下，服务内部已经拿到了转发数据，但是在拿到转发数据之前，浏览器中就显示了超时。这样子看起来不是应用逻辑的问题。  
上网搜了下 nginx 的默认超时，发现 nignx 好多不同的超时设置，并且默认都是 1 分钟。  
看起来问题就在这里。找公司运维重新配置了下超时时间。在对应 nginx 代理设置中加入  
`  
proxy_connect_timeout 120s;  
proxy_read_timeout 120s;  
proxy_send_timeout 120s;`  
问题完美解决。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
