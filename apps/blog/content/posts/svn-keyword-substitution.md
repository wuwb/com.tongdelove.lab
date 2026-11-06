---
title: "svn的关键词替换"
description: "公司里这些东西都没什么人研究，svn很是纯粹的作为了代码的插入抽出工具，一点快感都没有。 最近看某书里提到wo …"
date: "2024-05-12"
tags: ["subversion", "svn", "vcs"]
author: "WuWenbin"
---

公司里这些东西都没什么人研究，svn很是纯粹的作为了代码的插入抽出工具，一点快感都没有。  
最近看某书里提到workflow相关东西，也提到svn的一些高级功能，那就多作一些了解吧。  
通过svn可以给提交的文件动态地添加一些信息，比如文件最后的修改时间，文件的版本号，作者等。  
1.通过命令行执行命令，具体查看命令： svn help propset  
2.直接通过修改svn的配置文件，开启关键字功能enable-auto-props = yes  
（OSX下配置文件在~/.subversion）  
3.还有就是通过GUI工具设置，平时使用IDEA，自带了svn工具，可以直接在IDE里更新提交代码。当然也可以设置这些关键词了。  
喜欢命令行的话可以用第一种方式，8过我还是推荐GUI，比较直观快捷。  
第二种方法没试过，猜测是无法将配置同步到svn上的，这就就没法在干净的系统里checkout代码准备构建项目时就能实现关键词替换功能，还要去修改配置文件，虽然可以通过构建脚本完成但是赶脚不好。svn提供了同步这样的配置到服务器的功能别浪费了。  
关键词替换的功能除了能节省点自己添加注释，保持注释一致等常规用途外，还可以为css,js等会被浏览器缓存的文件添加版本信息，以便在版本更新的时候浏览器能马上读取最新的文件。具体方法大家自己研究吧，没什么难度。  
还有一些注释格式等具体的细节请参考文档，这文章只是抛砖引玉一下。  
参考链接：  
[](<http://svnbook.red-bean.com/en/1.4/svn.advanced.props.special.keywords.html>)<http://svnbook.red-bean.com/en/1.4/svn.advanced.props.special.keywords.html>  
[](<http://subversion.apache.org/faq.zh.html>)<http://subversion.apache.org/faq.zh.html>

### 相关文章

  * #### [Homebrew安装老版本程序](<https://blog.tongdelove.com/use-homebrew-to-install-old-version-programs/> "Homebrew安装老版本程序")
