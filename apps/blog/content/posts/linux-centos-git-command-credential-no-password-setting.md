---
title: "服务器 git 命令免输密码配置"
description: "背景： 在公司负责一个前端服务化项目，底层使用一个特权 git 账户进行项目的创建和发布等工作。最开始的时候服 …"
date: "2024-05-12"
tags: ["credential", "git", "gitconfig", "github", "gitlab", "password", "免密", "存储", "密码", "开发", "解决方案", "解决问题", "认证", "账号", "账号认证"]
author: "WuWenbin"
---

背景：  
在公司负责一个前端服务化项目，底层使用一个特权 git 账户进行项目的创建和发布等工作。最开始的时候服务器上 git 相关的配置是另外一个同事配的。  
最近公司公司服务器机房迁移，因为不是标准化的项目，需要自己手动进行迁移。这就需要完全重新配置服务器环境。  
一切迁移妥当后，测试发现 git 相关的脚本都无法跑通。打 log 发现是因为 git 命令无法免密执行，被交互的账号密码输入逻辑拦截了。

下面来解决这个问题：  
首先执行 git config –global credential.helper store ，告诉 git 使用本地存储中的账号密码进行账号认证。  
执行命令之后，可以通过 cat ~/.gitconfig 看到文件中多了如下的配置
    
    
    [credential]
            helper = store
    

完成以上配置后，使用想要存储的账号进行一次 git clone 或者 git pull 等需要验证账号密码的操作。  
操作之后可以在 .git-credentials 看到存储的账号和密码，下次进行操作就不需要重新输入账号和密码了。  
另外直接手动在 .git-credentials 添加配置也可以，但要注意配置格式，格式不匹配的话也是无法通过验证的。  
参考：  
<https://git-scm.com/docs/gitcredentials>

### 相关文章

  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
