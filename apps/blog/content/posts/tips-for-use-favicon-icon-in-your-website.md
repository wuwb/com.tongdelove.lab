---
title: "使用favicon小图标需要注意的地方"
description: "看一些第三方的网页模板的时候经常可以看到对favicon调用使用下面的方式： 当然这对于最终的效果没有什么影响 …"
date: "2024-05-12"
tags: ["favicon", "html", "ico", "icon"]
author: "WuWenbin"
---

看一些第三方的网页模板的时候经常可以看到对favicon调用使用下面的方式：
    
    
       
        
    

当然这对于最终的效果没有什么影响，按GTD的准则来讲，这样就可以了。  
但完成事之后我们还可以考虑考虑怎么去 do it better.  
先来看一下Favicon 的wiki：<http://zh.wikipedia.org/wiki/Favicon>  
可以看到shortcut 主要是用于不遵守标准的IE的解析，对于多数遵守标准的现代浏览器而言会忽略这个关键字。  
所以wiki上推荐含rel="shortcut icon" 的语句写在上面，而只有在当希望为新浏览器提供另一种备用图像如png 等时，才使用rel="icon" 的格式。  
另外还要注意type 属性的书写格式，wiki上只说明了出于兼容性原因使用image/x-icon，然而又说最好使用IANA注册的MIME类型。  
这样的说辞实在无法让人确定哪种方式比较合理。要深究的话还是要挖挖标准文档啊。  
鉴于比较晚了，WP的富文本剪辑器貌似也出了点问题，先将就这样吧。  
有兴趣的朋友可以再研究研究。

### 相关文章

  * #### [使用 gzip 压缩 js， css 等静态文件，优化网页加载速度](<https://blog.tongdelove.com/use-gzip-to-compress-js-css-files/> "使用 gzip 压缩 js， css 等静态文件，优化网页加载速度")
  * #### [开放搜索草案简介](<https://blog.tongdelove.com/open-search-darft-info/> "开放搜索草案简介")
  * #### [让国内那些主流的双核浏览器以急速模式请求你的网站](<https://blog.tongdelove.com/%e8%ae%a9%e5%9b%bd%e5%86%85%e9%82%a3%e4%ba%9b%e4%b8%bb%e6%b5%81%e7%9a%84%e5%8f%8c%e6%a0%b8%e6%b5%8f%e8%a7%88%e5%99%a8%e4%bb%a5%e6%80%a5%e9%80%9f%e6%a8%a1%e5%bc%8f%e8%af%b7%e6%b1%82%e4%bd%a0%e7%9a%84/> "让国内那些主流的双核浏览器以急速模式请求你的网站")
  * #### [一个来自一淘的简单面试题](<https://blog.tongdelove.com/a-easy-question-form-etao-interview/> "一个来自一淘的简单面试题")
