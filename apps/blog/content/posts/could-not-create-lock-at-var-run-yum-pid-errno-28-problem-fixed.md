---
title: "Could not create lock at /var/run/yum.pid: [Errno 28] 问题修复"
description: "环境： Linux VM_185_189_centos 3.10.0-514.21.1.el7.x86_64 …"
date: "2024-05-12"
tags: ["centos", "grep", "yum", "开发"]
author: "WuWenbin"
---

环境：  
Linux VM_185_189_centos 3.10.0-514.21.1.el7.x86_64 #1 SMP Thu May 25 17:04:51 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux  
执行 yum update -y ，发生报错  
Could not create lock at /var/run/yum.pid: [Errno 28]  
执行 ps aux | grep yum 查看是否有进程冲突，发现没有。  
查 google 发现是 centos 的 bug ，需要重启修复问题。  
reference：  
<https://www.davidvandertuijn.nl/could-not-create-lock-at-varrunyumpid-errno-28-no-space-left-on-device>  
<https://bugs.centos.org/view.php?id=14278>

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
