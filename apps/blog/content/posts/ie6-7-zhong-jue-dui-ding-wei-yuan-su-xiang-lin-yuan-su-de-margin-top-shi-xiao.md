---
title: "IE6/7中绝对定位元素相邻元素的margin-top失效"
description: "问题描述： 当某块级元素设置了 margin-top ，并且之前存在着可被渲染的绝对定位元素时，其 margi …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

问题描述：  
当某块级元素设置了 margin-top ，并且之前存在着可被渲染的绝对定位元素时，其 margin-top 在 IE6 IE7会失效。  
造成的影响：  
导致元素间基于 margin-top 产生的间隙不被渲染。  
受影响的浏览器：  
IE6 IE7  
问题分析：  
元素被设置为块元素（display:block/list-item/table）；  
该元素触发了 IE 的 hasLayout；  
该节点之前存在一个可被渲染的绝对定位或固定定位元素；  
该元素设置了不等于 0 的 margin-top 值（正负 margin-top 值均可）。  
解决方案：  
相邻元素可以采用padding-top来替代margin-top；  
在他们中间插入一个空标签实现占位；  
调换这两个元素的位置（考虑到内容主次关系，所以不太推荐）；

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
  * #### [Ansible 简单介绍](<https://blog.tongdelove.com/ansible-introduce/> "Ansible 简单介绍")
