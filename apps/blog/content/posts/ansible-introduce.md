---
title: "Ansible 简单介绍"
description: "最近迁移一个公益网站 http://www.tongdelove.com 到一台新的 VPS 上。原来安装 n …"
date: "2024-05-12"
tags: ["ansible", "开发", "运维"]
author: "WuWenbin"
---

最近迁移一个公益网站 <http://www.tongdelove.com> 到一台新的 VPS 上。原来安装 nignx，php，mysql 等繁琐的操作已经被 docker 取代了，但是麻烦的还是需要手动连上服务器，安装 docker 服务，rsync 项目到服务器上，还是麻烦。所以查询了下有没有什么解决方案。  
了解到现在比较常用的是 Ansible 工具。Ansible是—基于 Python paramiko 开发，分布式，无需客户端，轻量级，配置语法使用 YMAL 及 Jinja2模板语言，更强的远程命令执行操作。在了解 Ansible 之前，我也听过 Puppet 、fabric等工具，但看起来像是比较专业的运维管理工具，也比较复杂，没有深入去研究。但是 Ansible 一看非常简单，几行命令就跑了环境。  
Ansible 直接基于 ssh 协议 和 python，不需要在服务器上安装特定的客户端。一般开发者个人用的 VPS 已经和开发机配置有 ssh 密钥自动登录，直接在开发机上安装个 ansible 就可以了。如果是苹果电脑，执行下 brew install ansible 就完成了。  
Ansible 有 3 个配置文件 /etc/ansible/hosts、/etc/ansible/roles、/etc/ansible/ansible.cfg  
有command、cron、user、group、file、ping、service、shell、script、yum、setup等几个常用模块。  
执行 ansible <host-pattern> [-f forks] [-m module_name] [-a args] 传入 module_name 模块名就可以调用到服务器上对应的各个功能，非常方便。host-pattern 还可以按分组或者单台服务器去执行命令。  
当然初次尝试也不是一帆风顺的，我把遇到的一些问题记录在语雀上了，遇到问题的话，可以参考下看有没有相同的问题：<https://www.yuque.com/wuwb/ops/ansible>  
具体如何使用，本文就不展开讲了，官方文档，或者社区有很多教程，ansible 比较简单，看下就差不多了。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
