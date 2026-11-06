---
title: "批量替换 github 的 https 连接为 ssh 连接"
description: "要把 git repo 的 https 连接方式改成 ssh 的一般有两种方法： 一、修改 repo 下 .g …"
date: "2024-05-12"
tags: ["git", "github", "mac", "osx", "shell", "ssh"]
author: "WuWenbin"
---

要把 git repo 的 https 连接方式改成 ssh 的一般有两种方法：  
一、修改 repo 下 .git 文件夹里的 config 文件，将 [remote "origin"] 里的 <https://github.com/> 改成 git@github.com:  
二、使用 git 提供的命令来修改 git remote set-url origin git@github.com:user/repo.git  
两种方法不做修改的话都没法实现批量处理，对整个 workspace 内那么多 repo 没个批量处理的方法那还不疯了。  
其实批量处理也很简单啦，一条命令的事情，就是对上面的方法一作一些小修改,用了三个比较常用的命令 find, grep, sed  
$ find ~/workspace -exec grep "<https://github.com/>" ‘{}’ ; -exec sed -i "" "s^<https://github.com/^git@github.com:^g>" {} ;  
查找文件夹下所有文件，找到其中的 <https://github.com/> 替换成 git@github.com:

### 相关文章

  * #### [关闭 Mac OSX 开机声音](<https://blog.tongdelove.com/close-osx-startup-toner/> "关闭 Mac OSX 开机声音")
  * #### [服务器 git 命令免输密码配置](<https://blog.tongdelove.com/linux-centos-git-command-credential-no-password-setting/> "服务器 git 命令免输密码配置")
  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [使用 Automator 快速去除图片背景](<https://blog.tongdelove.com/use-automator-to-quick-remove-image-background/> "使用 Automator 快速去除图片背景")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
