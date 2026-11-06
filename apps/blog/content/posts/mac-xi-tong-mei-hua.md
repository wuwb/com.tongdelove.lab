---
title: "Mac系统美化"
description: "Mac的Dashboard，Mission Control和登录界面背景图看多了视觉疲劳，可以自己手动换换， …"
date: "2024-05-12"
tags: ["OSX", "apple", "background", "mac"]
author: "WuWenbin"
---

Mac的Dashboard，Mission Control和登录界面背景图看多了视觉疲劳，可以自己手动换换，  
用相同大小格式的图片替换掉系统里对应的图片就可以了，这几个图片位置如下：  
替换前注意一定要备份啊。  
登录界面的背景大图applelinen.png，及Retail屏幕的applelinen@2x.png  
/System/Library/PrivateFrameworks/LoginUIKit.framework/Versions/A/Frameworks/LoginUICore.framework/Versions/A/Resources/  
登录界面背景图上几个按钮需要自己手动画上去，注意位置别画偏了就好  
Dashboard背景文件位置pirelli.png，缩略图mini_pirelli.png，及Retail屏幕的pirelli@2x.png  
/System/Library/CoreServices/Dock.app/Contents/Resources/  
// 我一般将Dashboard设为鼠标触碰屏幕左下角时显示，这样就木有背景图，变成半透明的蒙版了。  
[![Screen Shot 2013-08-10 at 下午7.43.34](http://sites.com/wp-content/uploads/2013/08/Screen-Shot-2013-08-10-at-下午7.43.34-1024x640.png)](<http://sites.com/mac%e7%b3%bb%e7%bb%9f%e7%be%8e%e5%8c%96/screen-shot-2013-08-10-at-%e4%b8%8b%e5%8d%887-43-34/>)  
Mission Control的背景图片defaultdesktop.png  
/System/Library/CoreServices/Dock.app/Contents/Resources/  
替换后执行killall Dock命令就可以。

### 相关文章

  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [关闭 Mac OSX 开机声音](<https://blog.tongdelove.com/close-osx-startup-toner/> "关闭 Mac OSX 开机声音")
  * #### [拔掉耳机后自动暂停iTunes音乐的插件：Breakaway](<https://blog.tongdelove.com/%e6%8b%94%e6%8e%89%e8%80%b3%e6%9c%ba%e5%90%8e%e8%87%aa%e5%8a%a8%e6%9a%82%e5%81%9citunes%e9%9f%b3%e4%b9%90%e7%9a%84%e6%8f%92%e4%bb%b6%ef%bc%9abreakaway/> "拔掉耳机后自动暂停iTunes音乐的插件：Breakaway")
  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [美化系统，winodws下模拟Mac字体渲染效果](<https://blog.tongdelove.com/beautify-windows-system-mac-font-rendering-effect/> "美化系统，winodws下模拟Mac字体渲染效果")
