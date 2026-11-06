---
title: "在 IDEA 的 external tools 里面执行 grunt"
description: "项目里使用到 grunt, 但是又不希望每次使用 grunt 的时候要打开 项目文件夹，再打开命令行窗口，那么 …"
date: "2024-05-12"
tags: ["IDEA", "Intellij IDEA", "grunt"]
author: "WuWenbin"
---

项目里使用到 grunt, 但是又不希望每次使用 grunt 的时候要打开 项目文件夹，再打开命令行窗口，那么可以使用 IDEA 提供的一个在其内部执行外部命令的小工具 external tools  
其实很简单，只要进行一点点配置就可以了。  
我的工作环境是 WIN7  
在 IDEA 下按 Ctrl＋ALT +S 调出来配置管理器，在右上角搜索框搜索 external tools  
点击添加配置，在配置里修改相关配置，主要是下面 3 点  
Program: C:Program Filesnodejsnode.exe  
Parameters: ~AppDataRoamingnpmnode_modulesgrunt-clibingrunt  
Working directory:$ProjectFileDir$  
如图：  
[![QQ截图20131121105030](http://ilili.me/wp-content/uploads/2013/11/QQ截图20131121105030.jpg)](<http://ilili.me/wp-content/uploads/2013/11/QQ截图20131121105030.jpg>)  
over.  
配置好后就可以在Tools菜单看到响应的选项了，你可以通过配置将其图标放到菜单下的图标栏中方便点击。同理其他相关任务都可以通过这样的方式添加进来，十分方便。  
reference: <http://stackoverflow.com/questions/18894270/how-can-i-run-grunt-as-a-external-tool-from-intellij>

### 相关文章

  * #### [使用IDEA的external tools提高开发效率](<https://blog.tongdelove.com/use-ideas-external-tools-to-improve-develop-efficiency/> "使用IDEA的external tools提高开发效率")
  * #### [idea 无法在文件头部导入 java 包问题修复](<https://blog.tongdelove.com/idea-%e6%97%a0%e6%b3%95%e5%9c%a8%e6%96%87%e4%bb%b6%e5%a4%b4%e9%83%a8%e5%af%bc%e5%85%a5-java-%e5%8c%85%e9%97%ae%e9%a2%98%e4%bf%ae%e5%a4%8d/> "idea 无法在文件头部导入 java 包问题修复")
