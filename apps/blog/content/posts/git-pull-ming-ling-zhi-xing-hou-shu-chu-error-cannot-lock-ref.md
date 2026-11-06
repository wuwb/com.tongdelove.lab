---
title: "git pull 命令执行后输出 error: cannot lock ref"
description: "error: cannot lock ref ‘refs/remotes/origin/relea …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

error: cannot lock ref ‘refs/remotes/origin/release/1.0.2’: ‘refs/remotes/origin/release’ exists; cannot create ‘refs/remotes/origin/release/1.0.2’  
From <http://gitlab.mogujie.org/wxa/mgj-outfit>  
! [new branch] release/1.0.2 -> origin/release/1.0.2 (unable to update local ref)  
原因是远程删除了 release 分支，并新建了 release/1.0.2 分支，导致本地仓库中分支信息和远程的冲突  
解决方案如下：  
1.运行git remote show origin，会展示出所有的信息，包括了远端删除，但是本地保留的分支。  
2.在运行 git remote prune origin 即可删除本地分支release  
3.运行git fetch获取新分支release/sprint12

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
