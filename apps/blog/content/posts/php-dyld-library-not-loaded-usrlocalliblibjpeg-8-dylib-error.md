---
title: "php dyld: Library not loaded: /usr/local/lib/libjpeg.8.dylib 错误"
description: "通过 brew 升级了一下 mac 上安装的包，php 开始报 dyld: Library not loade …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

通过 brew 升级了一下 mac 上安装的包，php 开始报 dyld: Library not loaded: /usr/local/lib/libjpeg.8.dylib 的错误。  
比较明显的看出是依赖出了问题，上 stackoverflow 查一下，已经有解决的方法了。  
排行第一的答案的方法是手动下载 jpeg 包的源码，本地编译安装。我这样有点洁癖的不太喜欢本地编译安装的方式，管理起来太麻烦了。既然是brew 升级造成的问题，我更倾向于直接降级。  
其他答案里也提供了降级的方案：
    
    
    brew switch jpeg 8d
    

如果这个命令提示jpeg does not have a version "8d" in the Cellar.brew 仓库里不存在8d 的版本  
需要手动回滚 brew 仓库版本进行安装
    
    
    cd $(brew --prefix)/Homebrew/Library/Taps/homebrew/homebrew-core
    git checkout b231469
    HOMEBREW_NO_AUTO_UPDATE=1 brew install jpeg
    git checkout master
    

最后重新执行上面第一步的命令，就修复好了。  
参考：  
<https://stackoverflow.com/questions/32703296/dyld-library-not-loaded-usr-local-lib-libjpeg-8-dylib-homebrew-php>

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
