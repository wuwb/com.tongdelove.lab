---
title: "用 bare rope 管理 dotfiles"
description: "现在 bash 配置文件里添加 dotfiles 装用的 git alias 配置。 CONFIG_PATH=$HOME/.dfh alias dfh=\"/usr/bin/git --git-dir $CONFIG_PATH --work-tree=$HOME\" 添加完后，source 一下进行加载。 然后到 home 目录下执行命令，设置git 不显示不追踪的文件。 dfh config -"
date: "2022-11-17"
tags: ["HackDesign", "Intellij IDEA", "System Optimization", "Uncategorized", "android", "apple", "applications", "css", "database", "dotfiles", "git", "html", "java", "javascript", "life", "mysql", "osx", "quote", "svn", "tools", "twitter", "wordpress", "命令行", "开发", "微信", "运营", "运营方法"]
author: "WuWenbin"
---

现在 bash 配置文件里添加 dotfiles 装用的 git alias 配置。
    
    
    CONFIG_PATH=$HOME/.dfh
    alias dfh="/usr/bin/git --git-dir $CONFIG_PATH --work-tree=$HOME"

添加完后，source 一下进行加载。

然后到 home 目录下执行命令，设置git 不显示不追踪的文件。
    
    
    dfh config --local status.showUntrackedFiles no

设置完成后，对仓库进行初始化
    
    
    git clone --bare <git_url> $HOME/.dfh

初始化好后，就可以像管理普通 git 仓库一下管理配置文件了。将需要管理的配置文件添加到仓库里 `dth add`。只是将 `git` 命令换成设置的别名 `dth`，其他都是一样的。

还可以在 bash 配置里添加一个备份配置文件的方法。
    
    
    backup_dfh() {
      mkdir -p ~/dotfiles_backup && \
      dfh checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | \
      xargs -I{} mv {} ~/dotfiles_backup/{}
    }

在修改和管理配置文件前进行备份，做到万无一失。

更新 2022-12-16

这种方式已经不推荐，推荐使用社区的 dotbot 方案，后面我也会放出自己的 dotbot 方案的配置供大家参考。
