---
title: "idea 无法在文件头部导入 java 包问题修复"
description: "idea 修改了一些配置后发现导入包的时候变成只能在行内导入，而不是原来的在文件头部导入 用 cmd+opti …"
date: "2024-05-12"
tags: ["IDEA", "java", "开发"]
author: "WuWenbin"
---

idea 修改了一些配置后发现导入包的时候变成只能在行内导入，而不是原来的在文件头部导入  
用 cmd+option+o 和 option+return 都不行  
找了好久才发现取消
    
    
    code style -> java -> imports-> Use fully qualified class names
    

配置项，问题就好了

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [在 IDEA 的 external tools 里面执行 grunt](<https://blog.tongdelove.com/%e5%9c%a8-idea-%e7%9a%84-external-tools-%e9%87%8c%e9%9d%a2%e6%89%a7%e8%a1%8c-grunt/> "在 IDEA 的 external tools 里面执行 grunt")
  * #### [maven 编译 NoSuchMethodError 错误解决方法](<https://blog.tongdelove.com/maven-%e7%bc%96%e8%af%91-nosuchmethoderror-%e9%94%99%e8%af%af%e8%a7%a3%e5%86%b3%e6%96%b9%e6%b3%95/> "maven 编译 NoSuchMethodError 错误解决方法")
