---
title: "[译]roots where it all begins"
description: "今天干什么来着，偶然看到一个静态网站项目生成器，给大家介绍一下。 roots 是一个用来创建简洁、漂亮、高效的 …"
date: "2024-05-12"
tags: ["compiler", "js", "toolbox", "tools"]
author: "WuWenbin"
---

今天干什么来着，偶然看到一个静态网站项目生成器，给大家介绍一下。 

roots 是一个用来创建简洁、漂亮、高效的互联网产品的工具盒。 

###  概要  

    
    
    Roots是一个工具箱，是网站前端开发的一种最佳实践。它有去多的特性，我会试着把这些特性列在下面供乃们参考。
    
    默认情况下Roots是一个静态网站生成器，但是它也含有模板和各种插件用来方便地和express.js、rails等集成。当然也少不了RailwayJS和Sinatra的插件。
    
      
    
    
      
    

  * 非常简单的安装方法
  * 干净和最小化的默认项目模板
  * 默认使用jade, stylus, coffeescript
  * 非常快的实时编译执行速度
  * 不会破坏工作流的，漂亮的编译错误提示
  * 内置稳定的、模块化的、强大的css帮助库
  * 干净直观的应用配置文件
  * 部署的时候智能压缩html, css 和js 代码
  * 通过tower 和require.js 高效地管理客户端js 脚本
  * 有简单完整的插件文档，方便对应用进行扩展

    
    
      
    
    
    上面的描述比较模糊，下面提供几个快速教程视频来展示下上面的特性。视频不多，之后我还会添加更多的视频。
    
    刚放出来的视频比较少，先说声对不起。
    
      
    

###  安装  

    
    
    安装非常简单，只依赖于node.js，而node.js有一个维护地很好的安装器。如果你想用稍微快一点的方式安装，可以直接在命令行里执行curl roots.cx/get |sh 命令。或者你可以直接用npm 命令安装 npm install roots -g
    
      
    

###  命令  

    
    
    安装好后，roots提供了几个有用的命令用来建立项目。在使用toots之前你至少先要熟悉一下这些命令。
    
      
    
    
    
    $roots new name - 在当前目录建立名为name 的项目
    
    $roots compile - 把项目编译压缩到public 文件夹
    
    $roots watch - 开启一个本地服务，用来编译项目，并监听文件改动
    
    $roots update - 更新roots
    
    $roots js - wrapper for bower （这怎么翻译-_-!!!）
    
      
    
    
    如果你忘了上面的命令或者需要其版主，输入roots help 来显示可用命令
    
      
    

###  客户端 js  

    
    
    在客户端使用js类库的话十分方便，但是为每个项目下载这些库，并保持更新是件令人头疼的事。幸好牛逼的twitter的工程师开发了bower来解决这些问题。在roots项目中，你可以直接通过执行roots install 后面跟包名来把这些库安装进js/components 文件夹。还可以试试下面的命令：
    
      
    
    
    roots js list - 列出已安装的包
    
    roots js search name - 查找名为name 的包
    
    roots js update name - 更新名为name 的包到最新版
    
    roots js uninstall name - 删除名为name 的包
    
    roots js info name - 获取名为name 的包的描述信息
    
      
    
    
    bower 里有很多很棒的开源包，可以点[这里](<http://sindresorhus.com/bower-components/>)查看。另外require 默认被添加进新项目，用来方便管理客户端js 的加载。
    
      
    

##  插件  

    
    
    Roots 提供了几个针速度和工作效率优化过的核心编译器。但是每个人都有自己喜欢的工具，如果你想用其他的开发语言，你可以通过插件接口来实现。
    
      
    
    
    只要一个js 文件就能构成插件，而且一般这个文件小于10行代码（很多编译器都是这样的）。要创建插件的话，在/plugins 文件夹下创建一个js 或者coffeescript 文件。这个模块只要提供两个方法，setting和compile. 为了方便起见，你可以直接执行 roots plugin generate 命令，它会自动帮你创建插件所需要的的基础模板文件。
    
      
    
    
    西面有几个插件的列子，注意插件是在roots 的环境下执行的，如果你需要依赖其他文件，用module.require() 代替require(), 不然roots 会检索不到那些依赖的文件。
    
      
    
    
    [sass compiler](<https://github.com/jenius/roots/blob/master/test/big-project/plugins/sass.coffee>)
    
    [ejs compiler](<https://github.com/jenius/roots/blob/master/lib/compilers/core/jade.js>)
    
    [stylus compiler](<https://github.com/jenius/roots/blob/master/lib/compilers/core/styl.js>)
    
      
    
    
    你可能会注意到有一个叫Helper 的类完成了很多工作。 这个类管理了一些重要的路径和文件信息，它使让我盟能简单方便地管理编译器。下面是Helper 类的文档。
    
      
    
    
    好吧，文档和faq就不翻译了。
    
    同学们有兴趣的话可以自行查阅：
    
    <http://roots.cx/>

### 相关文章

  * #### [分享一个精简版Win10镜像](<https://blog.tongdelove.com/%e5%88%86%e4%ba%ab%e4%b8%80%e4%b8%aa%e7%b2%be%e7%ae%80%e7%89%88win10%e9%95%9c%e5%83%8f/> "分享一个精简版Win10镜像")
  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [临摹 javascript web 富应用开发书封面上的猫头鹰](<https://blog.tongdelove.com/%e4%b8%b4%e6%91%b9-javascript-web-%e5%af%8c%e5%ba%94%e7%94%a8%e5%bc%80%e5%8f%91%e4%b9%a6%e5%b0%81%e9%9d%a2%e4%b8%8a%e7%9a%84%e7%8c%ab%e5%a4%b4%e9%b9%b0/> "临摹 javascript web 富应用开发书封面上的猫头鹰")
