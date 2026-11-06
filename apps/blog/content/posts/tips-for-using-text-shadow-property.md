---
title: "使用text-shadow 属性的时候注意点"
description: "text-shadow这样的css 属性已经很常用了，但是使用这个属性的时候有一点常常被人忽略的事情。 就是使 …"
date: "2024-05-12"
tags: ["css", "css3", "字体", "阴影", "颜色"]
author: "WuWenbin"
---

text-shadow这样的css 属性已经很常用了，但是使用这个属性的时候有一点常常被人忽略的事情。  
就是使用text-shadow 后文字反选的时候也会显示阴影，这时很阴影很容易和反选的字体颜色冲突，影响视觉效果。  
推荐如果使用了text-shadow 的时候在::selection 中把阴影去掉  
::selection {  
text-shadow: 0px 0px #fff;  
}  
或者更具情况给阴影和字体重新配置颜色。

### 相关文章

  * #### [一个来自一淘的简单面试题](<https://blog.tongdelove.com/a-easy-question-form-etao-interview/> "一个来自一淘的简单面试题")
  * #### [美化系统，winodws下模拟Mac字体渲染效果](<https://blog.tongdelove.com/beautify-windows-system-mac-font-rendering-effect/> "美化系统，winodws下模拟Mac字体渲染效果")
