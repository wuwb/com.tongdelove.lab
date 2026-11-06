---
title: "next-route-visualizer 包介绍"
description: "今天 github 上看到一个 next-route-visualizer 的包，可以用来绘制 next 站点路由图表。看了下代码，核心方法有三个。 getRoutes 获取所有路由节点信息 positionTree 确定路由节点的显示位置 createNodesAndEdges 绘制节点和边的信息 将计算号的节点和边信息传递给 reactflow，用 reactflow 包来绘制图表。 通过这个"
date: "2023-03-07"
tags: ["HackDesign", "Intellij IDEA", "System Optimization", "Uncategorized", "android", "apple", "applications", "css", "database", "html", "java", "javascript", "life", "mysql", "nextjs", "npm", "osx", "quote", "svn", "tools", "twitter", "wordpress", "命令行", "开发", "微信", "运营", "运营方法"]
author: "WuWenbin"
---

今天 github 上看到一个 next-route-visualizer 的包，可以用来绘制 next 站点路由图表。看了下代码，核心方法有三个。

  * getRoutes 获取所有路由节点信息
  * positionTree 确定路由节点的显示位置
  * createNodesAndEdges 绘制节点和边的信息

将计算号的节点和边信息传递给 `reactflow`，用 `reactflow` 包来绘制图表。

通过这个图表可以可视化的查看站点的结构，便于分析和构建出合理的网站信息架构，可以作为开发时候一个辅助决策的功能集成到系统中。

有兴趣的朋友可以学习了解一下。

## 参考

  * <https://github.com/DiiiaZoTe/next-route-visualizer>
