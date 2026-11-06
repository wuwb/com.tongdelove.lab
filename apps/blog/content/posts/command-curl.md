---
title: "网络命令 curl"
description: "curl 是 UNIX 里经典的命令行程序。它支持众多的网络协议。可以用来做简单 HTTP 请求测试。 发送 …"
date: "2024-05-12"
tags: ["UNIX", "命令行", "网络", "请求"]
author: "WuWenbin"
---

curl 是 UNIX 里经典的命令行程序。它支持众多的网络协议。可以用来做简单 HTTP 请求测试。

发送 HTTP 请求
    
    
    curl https://blog.tongdelove.com
    <!doctype html>
    <html lang="zh-CN" class="respect-color-scheme-preference">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>吴文斌的博客 – Just another WordPress site</title>
        ...

获取返回头信息
    
    
    curl https://blog.tongdelove.com -I

获取返回头详细信息
    
    
    curl https://blog.tongdelove.com -I -v

发送 POST 请求
    
    
    curl -X POST https://blog.tongdelove.com -d "{\"name\": \"wenbin\"}"

设置请求头
    
    
    curl -H "User-Agent: custom" https://blog.tongdelove.com

通过 cookies 连续请求， -c cookie-file 可以保存网站返回的 cookie 信息到文件中， -b cookies 可以读取存储的 cookie
    
    
    curl -L -c cookies https://blog.tongdelove.com
    curl -L -b cookies https://blog.tongdelove.com

### 相关文章

  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [php 常用命令](<https://blog.tongdelove.com/php-command-line/> "php 常用命令")
  * #### [git 简单统计代码提交量](<https://blog.tongdelove.com/git-%e7%ae%80%e5%8d%95%e7%bb%9f%e8%ae%a1%e4%bb%a3%e7%a0%81%e6%8f%90%e4%ba%a4%e9%87%8f/> "git 简单统计代码提交量")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * [![](https://blog.tongdelove.com/app/uploads/2021/12/78533060_p0-150x150.jpeg)文件查找命令 find](<https://blog.tongdelove.com/command-find/> "文件查找命令 find")
