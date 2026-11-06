---
title: "使用IDEA的external tools提高开发效率"
description: "一直觉得不管使用哪种开发工具，深入研究这个工具都是很值得的，这个投入产出比，性价比等都很高。 俺们公司那群人好 …"
date: "2024-05-12"
tags: ["IDE", "IDEA", "Intellij IDEA", "ant", "grunt", "效率"]
author: "WuWenbin"
---

一直觉得不管使用哪种开发工具，深入研究这个工具都是很值得的，这个投入产出比，性价比等都很高。  
俺们公司那群人好像一直都没发现这个问题。依旧使用那几个“常用”的快捷键，手动处理很多很多完全可以托付给机器来完成的东西。  
我觉得吧，当你决定使用一款IDE时候，至少把整个程序里的所有菜单按钮过一遍，然后揪出快捷键表打印出来背一背吧。  
我们公司大多数人使用 Myeclipse 作为 IDE, 但好像他们很多人连怎么添加插件，怎么设置文件保存后自动格式化代码，自动优化imports，自动添加注释等最基本的功能都不知道，更别说怎么进行性能调优了。(我这不使用Myeclipse的人都知道。。) 这样的话在这公司用这么些早该淘汰的电脑做开发的话还真是有点忧伤呐。  
好，打住。  
因为我基本都是写前端代码，所以使用了对前端比较友好的Intellij IDEA，也稍的学习了些功能。  
这里介绍了高级功能 external tools，就是可以调用外部工具。  
其实也没什么可说的，就是和你说有这么个功能，可以调用外部程序，比如调用 nodejs 执行 grunt 命令，可以更具情况设置参数，并在工具栏等地方生成对应的图标，想执行命令的时候点击一下就可以了。比如yuicompresser什么的都能通过这个方式集成进来。十分方便啊。  
当然要是什么时候 IDEA 也能像原生支持 ant，maven 等支持 grunt 那就好了。

### 相关文章

  * #### [在 IDEA 的 external tools 里面执行 grunt](<https://blog.tongdelove.com/%e5%9c%a8-idea-%e7%9a%84-external-tools-%e9%87%8c%e9%9d%a2%e6%89%a7%e8%a1%8c-grunt/> "在 IDEA 的 external tools 里面执行 grunt")
  * #### [使用 Automator 快速去除图片背景](<https://blog.tongdelove.com/use-automator-to-quick-remove-image-background/> "使用 Automator 快速去除图片背景")
  * #### [idea 无法在文件头部导入 java 包问题修复](<https://blog.tongdelove.com/idea-%e6%97%a0%e6%b3%95%e5%9c%a8%e6%96%87%e4%bb%b6%e5%a4%b4%e9%83%a8%e5%af%bc%e5%85%a5-java-%e5%8c%85%e9%97%ae%e9%a2%98%e4%bf%ae%e5%a4%8d/> "idea 无法在文件头部导入 java 包问题修复")
