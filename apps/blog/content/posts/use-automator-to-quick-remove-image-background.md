---
title: "使用 Automator 快速去除图片背景"
description: "看到说最新的 macOS Ventura 系统自带图片右键菜单去除图片背景的功能。macOS Ventura …"
date: "2022-10-25"
tags: ["automator", "osx", "效率", "自动化", "设计"]
author: "WuWenbin"
---

看到说最新的 macOS Ventura 系统自带图片右键菜单去除图片背景的功能。macOS Ventura 尚在 beta 阶段，不建议贸然升级。想立即体验这样的功能实际上也很简单，只要写两行代码就可以实现。

我们打开 macOS 自带的 Automator 程序。在启动页选择新建一个 Quick Action 项目。

在项目文档顶部，进行简单的配置。将 Workflow receives current 选择 files or folders in Finder.app.

在左边拖取 Get Selected Finder Items 项目到右边的配置面板里。这个项目不需要配置。

再拖一个 Run Shell Script 的项目到右边面板。配置 Shell 为 /bin/bash 或者你喜欢的其他可以运行 shell 脚本的终端命令。再配置 Pass input 为 as arguments。这样我们可以从前一个获取选中文件的模块里获取到图片路径作为 shell 脚本的参数。

最后我们在 shell 脚本处加入关键的两行代码。
    
    
    ImageFile=$1
    curl -H 'X-API-Key: XXXXXXXXXXXXX' \
    -F 'image_file=@'$1 \
    -F 'size=auto' -f https://api.remove.bg/v1.0/removebg \
    -o ${ImageFile%/*}/${ImageFile##*/}-no-bg.png

其中 XXXXXXXXXXXXX 需要改成 <https://remove.bg> 网站上生成的 API Key。

到此开发完毕。我们按 `ctrl + S` 保存，保存文件名可以为**移除背景** 或者习惯使用英文的话 **Removebg** 。保存后，我们选一个需要移除背景的图片文件，鼠标右击菜单里，选择**移除背景** ，文件旁边就自动生成移除背景的文件啦，是不是很方便呀。

### 相关文章

  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
  * #### [Homebrew安装老版本程序](<https://blog.tongdelove.com/use-homebrew-to-install-old-version-programs/> "Homebrew安装老版本程序")
  * #### [我使用的那些OSX效率软件](<https://blog.tongdelove.com/the-effect-software-i-used-in-osx/> "我使用的那些OSX效率软件")
  * #### [关闭 Mac OSX 开机声音](<https://blog.tongdelove.com/close-osx-startup-toner/> "关闭 Mac OSX 开机声音")
  * #### [‘autorelease’ is unavailable报错修复](<https://blog.tongdelove.com/autorelease-is-unavailable-error/> "‘autorelease’ is unavailable报错修复")
