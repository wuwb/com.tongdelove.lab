---
title: "在 js 中使用 ts 的 module alias 功能"
description: "介绍 js 代码中引用依赖的时候默认是使用相对路径，项目复杂后相对路径可能会用到非常多的相对层级，非常不方便，在 typescript 中可以在 tsconfig.json 配置的 compilerOptions 中配置 paths，实现别名功能： { \"compilerOptions\": { paths: { \"@app/*\": [\"./src/*\"] } } } 在 js 中默认是"
date: "2023-03-12"
tags: ["HackDesign", "Intellij IDEA", "System Optimization", "Uncategorized", "android", "apple", "applications", "css", "database", "html", "java", "javascript", "life", "mysql", "node_module", "osx", "quote", "svn", "tools", "twitter", "typescript", "wordpress", "命令行", "开发", "微信", "运营", "运营方法"]
author: "WuWenbin"
---

## 介绍

js 代码中引用依赖的时候默认是使用相对路径，项目复杂后相对路径可能会用到非常多的相对层级，非常不方便，在 typescript 中可以在 tsconfig.json 配置的 compilerOptions 中配置 paths，实现别名功能：
    
    
    {
        "compilerOptions": {
            paths: {
                "@app/*": ["./src/*"]
            }
        }
    }

在 js 中默认是没有这样的功能，但是可以通过第三方的包实现一样的绝对引用。  
这里用到名为 [module-alias](<https://www.npmjs.com/package/module-alias>) 的包。

## 使用

首先在项目里安装这个依赖。
    
    
    npm i --save module-alias

然后在 package.json 中进行配置
    
    
    "_moduleAliases": {
      "@app"      : "./src", // Application's root
    }

最后在代码头部引入依赖
    
    
    require('module-alias/register')

## 原理

这个原理也比较简单，就是劫持 nodejs 原生的 module 模块。在模块初始化的时候，根据 package.json 中的配置将别名路径转换成相对路径存在数组中，然后通过改写内部的 `_nodeModulePaths ` 和 `_resolveFilename ` 两个方法，判断如果是别名开头的，就在前面的数组中找到别名对应的路径，再将路径进行拼合，还原出真实的引用路径。

## 参考

  * <https://www.npmjs.com/package/module-alias>
