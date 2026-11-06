---
title: "‘autorelease’ is unavailable报错修复"
description: "对着教程敲代码，可能教程有些老，教程里的代码跑起来报错， 报了个’autorelease̵ …"
date: "2024-05-12"
tags: ["OC", "autorelease", "code", "osx"]
author: "WuWenbin"
---

对着教程敲代码，可能教程有些老，教程里的代码跑起来报错，  
报了个’autorelease’ is unavailable: not available in automatic reference counting mode。  
下意识觉得是配置文件问题，看了下 build setting，果然后这个设置项，把 Automatic Reference Counting 设成 no 就好了。

### 相关文章

  * #### [使用 Automator 快速去除图片背景](<https://blog.tongdelove.com/use-automator-to-quick-remove-image-background/> "使用 Automator 快速去除图片背景")
  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [Homebrew安装老版本程序](<https://blog.tongdelove.com/use-homebrew-to-install-old-version-programs/> "Homebrew安装老版本程序")
  * #### [我使用的那些OSX效率软件](<https://blog.tongdelove.com/the-effect-software-i-used-in-osx/> "我使用的那些OSX效率软件")
  * #### [关闭 Mac OSX 开机声音](<https://blog.tongdelove.com/close-osx-startup-toner/> "关闭 Mac OSX 开机声音")
