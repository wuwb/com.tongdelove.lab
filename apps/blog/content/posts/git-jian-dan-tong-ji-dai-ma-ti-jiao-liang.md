---
title: "git 简单统计代码提交量"
description: "有时候几个人一起开发项目，想看下几个成员代码提交量，可以简单写个脚本处理。 当然在仓库后台，也可以看到这些数据 …"
date: "2024-05-12"
tags: ["命令行"]
author: "WuWenbin"
---

有时候几个人一起开发项目，想看下几个成员代码提交量，可以简单写个脚本处理。

当然在仓库后台，也可以看到这些数据。或者也有很多开源的命令行工具可以提供统计功能。对此类工具有了解到可以评论区提示一下。

下面的脚本也可以进一步优化，将 name 抽成命令行参数，逻辑包装成方法，放到 shell 配置文件中，这样在任何项目下都可以直接调用这个方法。更进一步可以把方法放到独立的文件中提交到 github, 然后在 zinit 配置中引用自动加载脚本，这样任何新装机器，只要安配置初始化 zinit, 就可以获得这个方法。
    
    
    for name in name1 name2 name3
    do
       echo $name 'commit lines: ';
       git log --author=$name --pretty=tformat: --numstat | awk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "added lines: %s removed lines : %s total lines: %s\n",add,subs,loc }' -
    done

输出
    
    
    name1 commit lines:
    added lines: 100803 removed lines : 84454 total lines: 16349
    name2 commit lines:
    added lines: 10268 removed lines : 4536 total lines: 5732
    name2 commit lines:
    added lines: 30800 removed lines : 19479 total lines: 11321

### 相关文章

  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [php 常用命令](<https://blog.tongdelove.com/php-command-line/> "php 常用命令")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * [![](https://blog.tongdelove.com/app/uploads/2021/12/82141247_p0-150x150.jpeg)网络命令 curl](<https://blog.tongdelove.com/command-curl/> "网络命令 curl")
  * [![](https://blog.tongdelove.com/app/uploads/2021/12/78533060_p0-150x150.jpeg)文件查找命令 find](<https://blog.tongdelove.com/command-find/> "文件查找命令 find")
