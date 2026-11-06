---
title: "设置 debian 服务器虚拟内存"
description: "服务器虚拟内存只有 512M，安装 X 服务的时候提示虚拟内存太小了，搜了把，找到如下设置调整虚拟内存大小的方 …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

服务器虚拟内存只有 512M，安装 X 服务的时候提示虚拟内存太小了，搜了把，找到如下设置调整虚拟内存大小的方法：  
cd /var  
touch swap.img # 创建虚拟内存文件  
chmod 600 swap.img # 设置权限  
dd if=/dev/zero of=/var/swap.img bs=1024k count=1000  
mkswap /var/swap.img # 设置文件为虚拟内存  
swapon /var/swap.img # 启用虚拟内存  
free # 释放内存  
echo "/var/swap.img none swap sw 0 0" >> /etc/fstab # 设置启动自动加载

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
