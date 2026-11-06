---
title: "小米手机 adb 调试无法识别问题解决"
description: "今天开发的一个页面在公司 App 安卓版本中测试发现有些问题。页面使用一种叫 xcore 的技术实现，在公司 …"
date: "2024-05-12"
tags: ["TBS_Studio", "adb", "usb", "x5", "xcore", "内核", "安卓", "小米", "小米手机", "开发", "浏览器"]
author: "WuWenbin"
---

今天开发的一个页面在公司 App 安卓版本中测试发现有些问题。页面使用一种叫 xcore 的技术实现，在公司 App 中使用公司定制的内核渲染。定制的内核基于腾讯的 x5 浏览器内核。本来公司有自己开发的一套真机页面测试软件，但是疏于维护，已经废弃停止使用了。App 团队的同学推荐使用腾讯的 TBS_Studio 来测试。调试工具有了，还缺少一台安卓机子，从测试团队借来一只超级大的小米手机，不记得什么型号了。  
1、需要在手机上调试，先要开启调试模式吧，手机上找系统版本号，点击 6 下开启开发者模式。  
2、开启开发者模式后还需要开启 USB 调试模式：“设置”-“其他高级设置”-“开发者选项”-“USB调试”  
一般情况下这样子就可以了，至少前几年是这样子，好几年没开发 H5 页面，没想到发生了这么多变化。  
设置完上面两步之后，发现 TBS_Studio 还是无法识别这个小米手机。继续往上查找解决方案。  
3、发现新的小米系统里，开启USB调试模式后还要开启调试端口：保持手机连接在电脑上，然后在拨号界面输入 *#* #717717#*#* ，输入完成之后会看到 “Diag USB port enable” 的弹出提示，表示端口已经成功开启。  
4、在电脑命令窗口中 adb kill-server，然后 adb start-server，重启 adb 服务，最后 adb devices，就可以看到设备啦  
TBS_Studio 底层的连接肯定也是使用 adb 啊，adb devices 里看到了设备，TBS_Studio 自然是成功的连上了

### 相关文章

  * #### [Moto defy Mac 上无法连接 adb 问题](<https://blog.tongdelove.com/moto-defy-mac-%e4%b8%8a%e6%97%a0%e6%b3%95%e8%bf%9e%e6%8e%a5-adb-%e9%97%ae%e9%a2%98/> "Moto defy Mac 上无法连接 adb 问题")
  * #### [小米电视去广告](<https://blog.tongdelove.com/xiaomi-tv-remove-ad/> "小米电视去广告")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
