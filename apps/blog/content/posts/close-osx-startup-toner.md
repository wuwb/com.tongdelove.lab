---
title: "关闭 Mac OSX 开机声音"
description: "Mac 的开机声音还是有些烦人的，虽然不怎么开机。 用什么系统都喜欢把所有系统提示音设成静音，Mac 当然也不 …"
date: "2024-05-12"
tags: ["mac", "osx"]
author: "WuWenbin"
---

Mac 的开机声音还是有些烦人的，虽然不怎么开机。  
用什么系统都喜欢把所有系统提示音设成静音，Mac 当然也不例外。  
下面介绍几种关闭系统开机声音的方法：  
1、软件：StartupSound.prefPane：<http://www5e.biglobe.ne.jp/~arcana/StartupSound/index.en.html>  
2、执行静音：sudo nvram SystemAudioVolume=%80。执行恢复：sudo nvram -d SystemAudioVolume  
3、重启或关机前将系统设为静音  
4、开机迅速按静音键F10

### 相关文章

  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [使用 Automator 快速去除图片背景](<https://blog.tongdelove.com/use-automator-to-quick-remove-image-background/> "使用 Automator 快速去除图片背景")
  * #### [Homebrew安装老版本程序](<https://blog.tongdelove.com/use-homebrew-to-install-old-version-programs/> "Homebrew安装老版本程序")
  * #### [我使用的那些OSX效率软件](<https://blog.tongdelove.com/the-effect-software-i-used-in-osx/> "我使用的那些OSX效率软件")
  * #### [Mac系统美化](<https://blog.tongdelove.com/mac%e7%b3%bb%e7%bb%9f%e7%be%8e%e5%8c%96/> "Mac系统美化")
