---
title: "webpack 3 脚手架 tapable 依赖错误问题修复"
description: "负责公司 vue 项目脚手架维护，有段时间没改过脚手架，最近对脚手架进行依赖升级，防止依赖腐化导致后面升级维护 …"
date: "2024-05-12"
tags: ["webpack", "开发"]
author: "WuWenbin"
---

负责公司 vue 项目脚手架维护，有段时间没改过脚手架，最近对脚手架进行依赖升级，防止依赖腐化导致后面升级维护困难。  
结果发现项目直接跑不起来了。排查后发现遇到了 webpack 升级 4 后升级了依赖的 tapable 组件的版本，并且和老版本不兼容，而 webpack 3 中依赖 tapable 没有指定版本号，导致依赖 webpack 3 的很多项目都跪了的问题。强制指定 tapable 版本号到 0.2.5 后问题修复。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
