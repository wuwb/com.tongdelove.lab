---
title: "安装 python virtualenv 虚拟环境"
description: "先通过 easy_install 安装 pip sudo easy_install pip 再通过 pip 安 …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

先通过 **easy_install 安装 pip**  
**sudo easy_install pip**  
再通过 pip 安装 **virtualenv**  
**sudo pip install –upgrade virtualenv**  
然后就可以用 virtualenv 命令创建虚拟环境了  
**virtualenv –system-site-packages** *targetDirectory* # for Python 2.7  
**virtualenv –system-site-packages -p python3** *targetDirectory* # for Python 3.n****  
创建好虚拟环境后，通过 source 命令激活环境  
**source ~/tensorflow/bin/activate**  
激活后就可以在环境在运行自己的脚本啦。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
