---
title: "使用 gzip 压缩 js， css 等静态文件，优化网页加载速度"
description: "一般情况下，开发一个项目，部署上线前需要对css，js等文件进行压缩合并。这样可以使文件大小变小很多，用户就能 …"
date: "2024-05-12"
tags: ["compress", "gzip", "html", "压缩", "性能调优"]
author: "WuWenbin"
---

一般情况下，开发一个项目，部署上线前需要对css，js等文件进行压缩合并。这样可以使文件大小变小很多，用户就能更快地获取到文件，加快网页加载速度。  
其实除了使用yuicompresser等合并压缩外，还有一个很凶残的东西，gzip。这是 GUN zip 的缩写，通过这个压缩往往能使文件减少40%以上。当然这不绝对，有些情况使文件变大也是有可能的，这另行讨论。  
那怎么使用 gzip 呢？一般有3种方式：  
1.通过apache等静态服务器提供的功能，只要通过修改服务器配置文件里的设置就可以开启 gzip 压缩。  
2.通过jboss，tomcat，php等容器来开启gzip压缩，方法也是修改配置文件啦。  
3.通过一些压缩工具直接对文件进行 gzip 压缩。  
前两种方式都是在用户访问网站发起请求时，服务器动态地对请求的文件进行压缩，每次请求都会这样重新压缩，非常消耗cpu处理时间，虽然可以进行缓存。  
但按照众所周知的预处理原理，我们最好还是提前将文件压缩好。就像less等能预编的绝对不要放到客户端去处理啊。  
所以还是推荐第三种方式。这样用户请求 css js 时就能直接返回 gzip 压缩好的文件，当然写点代码设置请求头为 Content-Encoding:gzip 什么的也是必要的。  
大多数情况下只要开启对 html(包括动态生成的页面), css 和 js 的压缩就可以了，因为想 jps, png, pdf 等二进制文件 gzip 基本是不起作用的，反倒压缩需要消耗很多的cpu，得不偿失。  
再说说前面提到的gzip压缩可能会使文件变大的问题。其实这个问题也不用怎么考虑，知道下原理就可以了。我们知道 gzip 压缩是根据文件内容的冗余度来处理的，当一个文件内存在很多相似的代码片段或者字符串的话就能得到很好的压缩，而文件内容很少重复的话，压缩可能就没什么效果。  
基于这点里有，我们写代码的时候就要注意一些问题，比如引入css文件的写法： 注意几个属性书写的前后位置顺序提交冗余度，这样可以得到更好的压缩率，同样其他多属性的标签也应该保持这种书写的一致性，如input等。有兴趣的可以看看下面google的参考链接，里面做了点介绍，当然要想深入的话RTFM  
以上提到的具体的配置方法和 gzip 算法等内容参阅相关文档哈。  
写这篇文章主要是因为前些日子给一个网站做性能调优，发现坑爹的根本没有开启 gzip 压缩，有点郁闷，我嚼得好歹 gzip 应该是标配吧。因为也没有什么服务器控制的权限，所以报告了项目经理，让他处理处理，但是没想到啊，办公室里的两个项目经理都说不知道 gzip 这东西，都说之前没听说过。。  
纳尼，这不是计算机网络课程里最基本的东西咩。结果一问办公室里的其他人，没有一个人知道。。  
好吧不纠结有没有人知道这问题了。  
reference:  
[](<https://developers.google.com/speed/articles/gzip> "https://developers.google.com/speed/articles/gzip")<https://developers.google.com/speed/articles/gzip>  
[](<http://badqiu.iteye.com/blog/37176> "http://badqiu.iteye.com/blog/37176")<http://badqiu.iteye.com/blog/37176>  
[](<http://laodaobazi.iteye.com/blog/1404694> "http://laodaobazi.iteye.com/blog/1404694")<http://laodaobazi.iteye.com/blog/1404694>  
[](<http://www.hiadmin.org/blog-seo/wordpress-gzip-css-js> "http://www.hiadmin.org/blog-seo/wordpress-gzip-css-js")<http://www.hiadmin.org/blog-seo/wordpress-gzip-css-js>  
[](<http://www.dboy365.com/archives/707> "http://www.dboy365.com/archives/707")<http://www.dboy365.com/archives/707>

### 相关文章

  * #### [使用favicon小图标需要注意的地方](<https://blog.tongdelove.com/tips-for-use-favicon-icon-in-your-website/> "使用favicon小图标需要注意的地方")
  * #### [开放搜索草案简介](<https://blog.tongdelove.com/open-search-darft-info/> "开放搜索草案简介")
  * #### [让国内那些主流的双核浏览器以急速模式请求你的网站](<https://blog.tongdelove.com/%e8%ae%a9%e5%9b%bd%e5%86%85%e9%82%a3%e4%ba%9b%e4%b8%bb%e6%b5%81%e7%9a%84%e5%8f%8c%e6%a0%b8%e6%b5%8f%e8%a7%88%e5%99%a8%e4%bb%a5%e6%80%a5%e9%80%9f%e6%a8%a1%e5%bc%8f%e8%af%b7%e6%b1%82%e4%bd%a0%e7%9a%84/> "让国内那些主流的双核浏览器以急速模式请求你的网站")
  * #### [一个来自一淘的简单面试题](<https://blog.tongdelove.com/a-easy-question-form-etao-interview/> "一个来自一淘的简单面试题")
