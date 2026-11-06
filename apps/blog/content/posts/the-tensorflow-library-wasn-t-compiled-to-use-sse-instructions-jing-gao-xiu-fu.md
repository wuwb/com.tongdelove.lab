---
title: "The TensorFlow library wasn’t compiled to use SSE instructions 警告修复"
description: "2017-10-16 11:51:53.826232: W tensorflow/core/platform/ …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

2017-10-16 11:51:53.826232: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn’t compiled to use SSE4.2 instructions, but these are available on your machine and could speed up CPU computations.  
2017-10-16 11:51:53.826259: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn’t compiled to use AVX instructions, but these are available on your machine and could speed up CPU computations.  
2017-10-16 11:51:53.826267: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn’t compiled to use AVX2 instructions, but these are available on your machine and could speed up CPU computations.  
2017-10-16 11:51:53.826273: W tensorflow/core/platform/cpu_feature_guard.cc:45] The TensorFlow library wasn’t compiled to use FMA instructions, but these are available on your machine and could speed up CPU computations.  
安装好 tensorflow 后，执行 tensorflow 官方文档的代码，报了上面的错误。  
这是一个提醒，提示通过源码安装可以提高 tensorflow 的效率，但不影响使用。  
这个提醒默认是开启的，需要禁用的话可以在代码头部加入下面的代码。  
import os  
os.environ[‘TF_CPP_MIN_LOG_LEVEL’]=’2′

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
