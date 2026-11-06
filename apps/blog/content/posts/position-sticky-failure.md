---
title: "position sticky 失效问题"
description: "写了个图墙组件，其中用到了 sticky 做滚动固定。测试发现部分使用情况下会失效。搜了下，看到下面情况会导致 …"
date: "2024-05-12"
tags: ["javascript", "position", "sticky", "定位", "开发"]
author: "WuWenbin"
---

写了个图墙组件，其中用到了 sticky 做滚动固定。测试发现部分使用情况下会失效。搜了下，看到下面情况会导致 sticky 失效：  
1、具有 sticky 属性的元素，其父级高度必须大于sticky元素的高度。  
2、sticky 元素的底部，不能和父级底部重叠。  
3、sticky 元素的父级不能含有 overflow:hidden 和 overflow:auto 属性。  
4、必须具有 top，或 bottom 属性。  
对应排查后，发现父元素上使用了 overflow:hidden，去除后问题修复了。

### 相关文章

  * #### [在 js 中使用 ts 的 module alias 功能](<https://blog.tongdelove.com/use-module-alias-function-in-js-like-typescript/> "在 js 中使用 ts 的 module alias 功能")
  * #### [next-route-visualizer 包介绍](<https://blog.tongdelove.com/next-route-visualizer-npm-package-introduce/> "next-route-visualizer 包介绍")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
