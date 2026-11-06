---
title: "vue for 循环中使用 input 无法连续输入问题"
description: "vue 的 for 循环中如果使用了 input，input 的值又为循环对象中的值，那么修改 input 的 …"
date: "2024-05-12"
tags: ["javascript"]
author: "WuWenbin"
---

vue 的 for 循环中如果使用了 input，input 的值又为循环对象中的值，那么修改 input 的值的时候，会重新刷新 for 循环节点，导致 input 输入框失去焦点。处理方法也比较简单，在 input 的 change 事件里，添加 vue.$nextTick 注册下次刷新的时候重新获取 input 焦点即可。

### 相关文章

  * #### [在 js 中使用 ts 的 module alias 功能](<https://blog.tongdelove.com/use-module-alias-function-in-js-like-typescript/> "在 js 中使用 ts 的 module alias 功能")
  * #### [next-route-visualizer 包介绍](<https://blog.tongdelove.com/next-route-visualizer-npm-package-introduce/> "next-route-visualizer 包介绍")
  * #### [position sticky 失效问题](<https://blog.tongdelove.com/position-sticky-failure/> "position sticky 失效问题")
  * #### [Base64转Blob格式](<https://blog.tongdelove.com/base64%e8%bd%acblob%e6%a0%bc%e5%bc%8f/> "Base64转Blob格式")
  * #### [vuejs 异步渲染问题](<https://blog.tongdelove.com/vuejs-%e5%bc%82%e6%ad%a5%e6%b8%b2%e6%9f%93%e9%97%ae%e9%a2%98/> "vuejs 异步渲染问题")
