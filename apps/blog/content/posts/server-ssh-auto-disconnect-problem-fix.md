---
title: "服务器 ssh 自动断开问题"
description: "有好几种解决方案 1、最不好的一种，设置终端超时自动输入字符。对 iTerm 而言 Profile 的 Ses …"
date: "2024-05-12"
tags: ["iTerm", "interval", "session", "ssh", "保持连接", "开发", "服务器"]
author: "WuWenbin"
---

有好几种解决方案  
1、最不好的一种，设置终端超时自动输入字符。对 iTerm 而言 Profile 的 Session tab 里面可以设置。缺点很明显，超时时会自动输入字符影响使用。  
2、客户端 ssh 配置定时保持连接，方法是修改 ~/.ssh/config 文件，加入  
Host *  
ServerAliveInterval=60  
这样每 60 秒给服务器发送一个 no-op 包用来保持连接。  
3、对单次连接可以使用 ssh -o ServerAliveInterval=30 user@host 命令来传递 ServerAliveInterval 参数  
4、服务端 ssh 配置，方法是修改 /etc/ssh/sshd_config 文件，取消  
TCPKeepAlive yes  
ClientAliveInterval 30  
ClientAliveCountMax 3  
5、行代码的注释开启定时发包保持连接的功能。记得重启 ssh 服务激活配置。  
6、当然还有更高级的技术。可以试试 mosh，除了保持连接外，还可以实现自动连接。需要分别在服务器和客户端安装软件。  
2018-03-08 15:31:14  
既然讲到了 mosh，讲下怎么安装吧。三行命令，以 debian 服务器，mac 客户机为例：  
1、服务端安装 apt-get install mosh  
2、配置语言 vim ~/.bashrc 添加 export LC_ALL="en_US.UTF-8"，source ~/.bashrc  
3、客户端 brew install mosh  
下面就可以使用了  
mosh user@host

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
