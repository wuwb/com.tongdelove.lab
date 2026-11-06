---
title: "IOS 模拟器命令行使用方法"
description: "背景 在公司写完页面之后要先自己测试页面的兼容性，作为非测试的同学，手头没有那么多的测试机可以用，所以很多情况 …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

背景  
在公司写完页面之后要先自己测试页面的兼容性，作为非测试的同学，手头没有那么多的测试机可以用，所以很多情况下需要使用模拟器进行测试。  
默认情况下使用 IOS 模拟器比较麻烦，在使用模拟器之前  
1、首先需要安装 Xcode 编辑器，模拟器是作为 xcode 的一个子组件出现的。  
2、装好后，打开 Xcode，在首选项里选择安装模拟器。  
安装好模拟器后，通过下面的命令进行启动调试  
1、查看设备列表 simctl list devices 命令  
2、启动模拟器， open -a Simulator –args -CurrentDeviceUDID $设备ID  
3、安装程序包 simctl install booted $程序安装包绝对路径  
4、启动程序 simctl launch booted $程序包名  
5、打开需要调试的页面， simctl openurl booted $唤起短链  
6、电脑上打开 safari 浏览器，点击开发目中的模拟器，选择模拟器中的运行的页面  
7、关闭模拟器，killall Simulator 命令  
下面是模拟器中一些常用的快捷：  
1、回到桌面：⌘+⇧+H  
2、模拟器缩放：⌘+1、⌘+2、⌘+3、⌘+4、⌘+5，对应缩放100%、75%、50%、33%、25% 大小  
3、锁屏&解锁屏：⌘+L  
另外一个注意的要点是，模拟器中的代理与 mac 系统的代理是同步的。  
代码溜的同学，可以对这些命令做一个封装，比如用前端常用的 nodejs 来处理。  
写起来也比较简单，主要使用 commander 和 prompt 包，实现命令行和交互功能。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
