---
title: "zsh autosuggestions 插件引起黏贴变慢问题修复"
description: "zsh 开启 autosuggestions 插件的时候，在终端中的黏贴操作变的非常慢，在 .zshrc 配置 …"
date: "2024-05-12"
tags: ["Uncategorized", "iterm2", "zsh"]
author: "WuWenbin"
---

zsh 开启 autosuggestions 插件的时候，在终端中的黏贴操作变的非常慢，在 .zshrc 配置里加入下面的代码可以修复这个问题
    
    
    # This speeds up pasting w/ autosuggest
    # https://github.com/zsh-users/zsh-autosuggestions/issues/238
    pasteinit() {
      OLD_SELF_INSERT=${${(s.:.)widgets[self-insert]}[2,3]}
      zle -N self-insert url-quote-magic # I wonder if you'd need .url-quote-magic?
    }
    pastefinish() {
      zle -N self-insert $OLD_SELF_INSERT
    }
    zstyle :bracketed-paste-magic paste-init pasteinit
    zstyle :bracketed-paste-magic paste-finish pastefinish

参考：<https://github.com/zsh-users/zsh-autosuggestions/issues/238>

### 相关文章

  * #### [Optimistic UI](<https://blog.tongdelove.com/optimistic-ui/> "Optimistic UI")
