---
title: "Homebrew安装老版本程序"
description: "Homebrew是OSX下最好的包管理工具了吧。可以很方便地查找和安装软件。 软件默认安装的基本都是最新版的软 …"
date: "2024-05-12"
tags: ["brew", "homebrew", "osx", "svn"]
author: "WuWenbin"
---

[Homebrew](<http://brew.sh/index_zh-cn.html> "homebrew")是OSX下最好的包管理工具了吧。可以很方便地查找和安装软件。  
软件默认安装的基本都是最新版的软件，怎么安装老版本的软件呢。  
很简单，以安装老版本svn为例：  
1执行下面命令得到 svn 各版本对应的 git 命令
    
    
    brew versions svn
    1.8.3    git checkout 89853fa /usr/local/Library/Formula/subversion.rb
    1.8.0    git checkout f56b641 /usr/local/Library/Formula/subversion.rb
    1.8.1    git checkout 55577bb /usr/local/Library/Formula/subversion.rb
    1.7.10   git checkout 0060dc3 /usr/local/Library/Formula/subversion.rb
    1.7.9    git checkout b0e6223 /usr/local/Library/Formula/subversion.rb
    1.7.8    git checkout f7a42d2 /usr/local/Library/Formula/subversion.rb
    1.7.7    git checkout a6dcc41 /usr/local/Library/Formula/subversion.rb
    1.7.6    git checkout 6b8d25f /usr/local/Library/Formula/subversion.rb
    1.7.5    git checkout 5d5cd70 /usr/local/Library/Formula/subversion.rb
    1.7.4    git checkout dc4245c /usr/local/Library/Formula/subversion.rb
    1.7.3    git checkout eb97154 /usr/local/Library/Formula/subversion.rb
    1.7.2    git checkout d89bf83 /usr/local/Library/Formula/subversion.rb
    1.6.17   git checkout 6e2d550 /usr/local/Library/Formula/subversion.rb
    1.6.16   git checkout 83ed494 /usr/local/Library/Formula/subversion.rb
    1.6.15   git checkout 809a18a /usr/local/Library/Formula/subversion.rb
    1.6.13   git checkout 7871a99 /usr/local/Library/Formula/subversion.rb
    1.6.12   git checkout c99b3ac /usr/local/Library/Formula/subversion.rb
    1.6.6    git checkout 8774131 /usr/local/Library/Formula/subversion.rb

2如果已经安装有新版svn程序，执行
    
    
    brew unlink svn

没有的话跳过这步。  
3执行1中得到的所需要版本 svn 对应的 git 命令，如要安装1.7.8版的svn
    
    
    git checkout f7a42d2 /usr/local/Library/Formula/subversion.rb

4安装svn
    
    
    brew install svn

就这样。

### 相关文章

  * #### [svn的关键词替换](<https://blog.tongdelove.com/svn-keyword-substitution/> "svn的关键词替换")
  * #### [使用 Automator 快速去除图片背景](<https://blog.tongdelove.com/use-automator-to-quick-remove-image-background/> "使用 Automator 快速去除图片背景")
  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [我使用的那些OSX效率软件](<https://blog.tongdelove.com/the-effect-software-i-used-in-osx/> "我使用的那些OSX效率软件")
  * #### [关闭 Mac OSX 开机声音](<https://blog.tongdelove.com/close-osx-startup-toner/> "关闭 Mac OSX 开机声音")
