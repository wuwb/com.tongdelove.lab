---
title: "NAS 篇一：威联通设置默认 shell 为 zsh"
description: "一、开启 ssh 功能 安装好威联通系统后，我们在设置里开启 ssh。 通过 ssh 登录到 nas 看下。查看下默认的 shell， echo $SHELL，默认的 shell 是 /bin/sh，看下版本号 /bin/sh --version GNU bash, version 3.2.57(1)-release (x86_64-QNAP-linux-gnu) Copyright (C) 20"
date: "2022-10-09"
tags: ["HackDesign", "Intellij IDEA", "System Optimization", "Uncategorized", "android", "apple", "applications", "css", "database", "html", "java", "javascript", "life", "mysql", "osx", "quote", "svn", "tools", "twitter", "wordpress", "命令行", "开发", "微信", "运营", "运营方法"]
author: "WuWenbin"
---

## 一、开启 ssh 功能

安装好威联通系统后，我们在设置里开启 ssh。

通过 ssh 登录到 nas 看下。查看下默认的 shell， echo $SHELL，默认的 shell 是 /bin/sh，看下版本号 `/bin/sh --version`
    
    
    GNU bash, version 3.2.57(1)-release (x86_64-QNAP-linux-gnu)
    Copyright (C) 2007 Free Software Foundation, Inc.

是个比较老的版本。

## 二、安装第三方仓库

首先添加第三方仓库。我们需要在第三方应用仓库中安装要用到的 opkg 包管理器。

打开应用中心，右上角设置里，点程序来源，添加链接，输入链接名称 qnapclub，链接地址 <https://www.qnapclub.eu/en/repo.xml> , 点击添加。

威联通设置默认 shell 为 zsh

![](https://blog.tongdelove.com/app/uploads/2022/12/1672150560-616191dc9c6076942.png_e1080.png)

添加后应用商店侧边栏多了qnapclub 的图标。

点击后可以看到很多三方的应用。

## 三、安装包管理器

在 qnapclub 应用仓库中找到 opkg 包管理器 Entware-std，点击安装。安装后，我们重新通过 ssh 链接到 nas。

在 nas 中执行 opkg –version，确认包管理器安装成功。

## 四、安装 zsh

执行 opkg update 更新包资源信息。更新好后执行 opkg install zsh 安装 zsh。再执行 zsh –version 确认安装成功。

## 五、配置 zsh

添加配置文件 /opt/root/.zshrc
    
    
    export ZINIT[HOME_DIR]=/opt/root/.zinit
    export ZINIT[PLUGINS_DIR]=/opt/root/.zinit/plugins
    export ZINIT[COMPLETIONS_DIR]=/opt/root/.zinit/completions
    export ZINIT[SNIPPETS_DIR]=/opt/root/.zinit/snippets
    export ZINIT[ZCOMPDUMP_PATH]=/opt/root/.zsh/.zcompdump
    export ZPFX=/opt/root/.zinit/polaris
    
    if [[ ! -f /opt/root/.zinit/bin/zinit.zsh ]]; then
        print -P "%F{33}▓▒░ %F{220}Installing %F{33}DHARMA%F{220} Initiative Plugin Manager (%F{33}zdharma/zinit%F{220})…%f"
        command mkdir -p "/opt/root/.zinit" && command chmod g-rwX "/opt/root/.zinit"
        command git clone https://github.com/zdharma/zinit "/opt/root/.zinit/bin" && 
            print -P "%F{33}▓▒░ %F{34}Installation successful.%f%b" || 
            print -P "%F{160}▓▒░ The clone has failed.%f%b"
    fi
    source "/opt/root/.zinit/bin/zinit.zsh"
    autoload -Uz _zinit
    (( ${+_comps} )) && _comps[zinit]=_zinit
    zinit ice pick"async.zsh" src"pure.zsh" # with zsh-async library that's bundled with it.
    zinit light sindresorhus/pure

## 六、再次尝试切换到 zsh

退出 ssh，重新ssh 连上 nas，发现默认还是 bash。执行 chsh zsh，发现 chsh 命令不存在。执行 zsh，切换到 zsh，添加的配置也没生效。因为系统读取的是 /root/.zshrc。这里我们建个软链接到先前添加的配置上。
    
    
    ln -s /opt/root/.zshrc /root/.zshrc

再 source /root/.zshrc 更新配置。这次配置生效了。

但是，nas 重启后，/root/.zshrc 被重置，文件消失。另外前面 chsh zsh 执行不了，每次 ssh 连上后，还需要再次执行 zsh 切换。比较麻烦。

## 七、自动设置 zsh 配置

先下载安装启动脚本管理器

链接: <https://pan.baidu.com/s/1ZqEkmsOaRrhVBytFSykHaA> 提取码: hbdd 复制这段内容后打开百度网盘手机App，操作更方便哦，

下载安装包后，在应用中心右上角，添加应用

安装后在 Download 目录自动生成 StartUp 文件夹 和里面的配置文件 custom.sh。打开配置文件，在 sleep 3 后面添加设置软链接的命令 。
    
    
    [[ -f /opt/root/.zshrc ]] && ln -s /opt/root/.zshrc /root/.zshrc

## 八、设置默认 zsh

修改配置文件 /etc/passwd，把对应账户最后的 /bin/sh 换成 /opt/bin/zsh。注意这个操作比较危险，如果 zsh 文件丢失，会导致 ssh 无法登陆。
