---
title: "vuejs 异步渲染问题"
description: "Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，改变缓冲在同一事件循环中发生的所有 …"
date: "2024-05-12"
tags: ["javascript"]
author: "WuWenbin"
---

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，改变缓冲在同一事件循环中发生的所有数据。如果同一个 watcher 被多次触发，只会一次推入到队列中。这个思想类似于 react, 用来减少 重绘性能消耗，譬如 :
    
    
    <div v-if="data">
      <com ref="com"></com>
    </div>
    

data 最初为null,那么当我们在一个method 中调用
    
    
    this.data ={};
    console.log(this.$refs.com)
    

时因为 vue 异步更新dom 的关系，data 并没有马上生效到dom 的渲染上，com 组件未完成渲染，所以 this.$refs.com 会为 undefined，此时需要使用 this.$nextTick 解决问题

### 相关文章

  * #### [在 js 中使用 ts 的 module alias 功能](<https://blog.tongdelove.com/use-module-alias-function-in-js-like-typescript/> "在 js 中使用 ts 的 module alias 功能")
  * #### [next-route-visualizer 包介绍](<https://blog.tongdelove.com/next-route-visualizer-npm-package-introduce/> "next-route-visualizer 包介绍")
  * #### [position sticky 失效问题](<https://blog.tongdelove.com/position-sticky-failure/> "position sticky 失效问题")
  * #### [vue for 循环中使用 input 无法连续输入问题](<https://blog.tongdelove.com/vue-v-for-input-break/> "vue for 循环中使用 input 无法连续输入问题")
  * #### [Base64转Blob格式](<https://blog.tongdelove.com/base64%e8%bd%acblob%e6%a0%bc%e5%bc%8f/> "Base64转Blob格式")
