---
title: "文件查找命令 find"
description: "find 命令用来查找文件。常用参数有 name / size / mtime, 这几个参数可以重复和一起使用 …"
date: "2024-05-12"
tags: ["命令行", "工具", "查找"]
author: "WuWenbin"
---

find 命令用来查找文件。常用参数有 name / size / mtime, 这几个参数可以重复和一起使用。

name 用来过滤文件名。

如：find . -name “*.rb”

size 用过过滤文件大小。

如：find . -size +100k -size -200k

mtime 过滤文件修改时间，-mtime 0 表示 24 小时内修改的文件。

如：find . -mtime 0

### 相关文章

  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [php 常用命令](<https://blog.tongdelove.com/php-command-line/> "php 常用命令")
  * #### [git 简单统计代码提交量](<https://blog.tongdelove.com/git-%e7%ae%80%e5%8d%95%e7%bb%9f%e8%ae%a1%e4%bb%a3%e7%a0%81%e6%8f%90%e4%ba%a4%e9%87%8f/> "git 简单统计代码提交量")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * [![](https://blog.tongdelove.com/app/uploads/2021/12/82141247_p0-150x150.jpeg)网络命令 curl](<https://blog.tongdelove.com/command-curl/> "网络命令 curl")
