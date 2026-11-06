---
title: "开放搜索草案简介"
description: "晚上小逛了下淘宝，犯了点职业病，按了 option + command + i 看了下代码，看到有条新的没见过 …"
date: "2024-05-12"
tags: ["html", "opensearch", "开放搜索", "微格式", "搜索", "草案"]
author: "WuWenbin"
---

晚上小逛了下淘宝，犯了点职业病，按了 option + command + i  
看了下代码，看到有条新的没见过的代码：
    
    
    
    

查了下资料，发现是一种微格式。  
通过添加这段代码，可以让支持这种微格式的高级浏览器将网站的自定义的搜索方式加入到浏览器的搜索引擎列表中，如火狐浏览器是右上角的搜索框，  
谷歌浏览器是添加进地址栏。  
再来看看provider.xml里有什么：
    
    
    
    
        GB2312
        淘宝购物
        淘宝购物搜索 - 只有你想不到，没有你淘不到
        http://pics.taobao.com/favicon.ico
        
    
    

第一行为文旦类型和编码格式。这个不用说大家都懂的。  
第二行包含了一个OpenSerarchDescription的开放搜索描述的标签，和一个命名空间  
在有些网站里还看到有添加另外的 xmlns:moz="<http://www.mozilla.org/2006/browser/search/>" 命名空间，还没考证过这几个命名空间的具体用法  
下面还定义了搜索字段的编码格式  
短名称（别名？缩略名?）  
描述及favicon和最重要的一条  
搜索方式对应的Url  
这里简单说下这个Url的用处，举个栗子吧：  
你在自己的网站中添加好开放搜索的微格式，其中 url 部分如下：
    
    
    http://www.google.com/search?q={searchTerms}+site%3example.com&hl=en"
    

那么如果有人用了你的网站给浏览器添加的搜索引擎搜索关键词，那么搜索界面页面将会是谷歌页面，搜索词为  
关键词 site:example.com  
也就是用谷歌搜索你站内对应的关键词。  
基础的就这样，具体内容，有兴趣的同学可以自己看文档啦。  
reference:  
<http://en.wikipedia.org/wiki/OpenSearch>  
<http://www.opensearch.org/Home>  
<http://www.opensearch.org/Specifications/OpenSearch/1.1/Draft_5>  
<http://opensearchdescription-xml.mime-application.com/>  
<http://www.xml.com/lpt/a/1708>  
<http://stackoverflow.com/questions/10302629/suggest-add-the-search-engine-to-firefox-when-user-is-in-site>  
<http://aaronparecki.com/articles/2011/07/11/1/how-to-let-google-power-opensearch-on-your-website>

### 相关文章

  * #### [使用 gzip 压缩 js， css 等静态文件，优化网页加载速度](<https://blog.tongdelove.com/use-gzip-to-compress-js-css-files/> "使用 gzip 压缩 js， css 等静态文件，优化网页加载速度")
  * #### [使用favicon小图标需要注意的地方](<https://blog.tongdelove.com/tips-for-use-favicon-icon-in-your-website/> "使用favicon小图标需要注意的地方")
  * #### [让国内那些主流的双核浏览器以急速模式请求你的网站](<https://blog.tongdelove.com/%e8%ae%a9%e5%9b%bd%e5%86%85%e9%82%a3%e4%ba%9b%e4%b8%bb%e6%b5%81%e7%9a%84%e5%8f%8c%e6%a0%b8%e6%b5%8f%e8%a7%88%e5%99%a8%e4%bb%a5%e6%80%a5%e9%80%9f%e6%a8%a1%e5%bc%8f%e8%af%b7%e6%b1%82%e4%bd%a0%e7%9a%84/> "让国内那些主流的双核浏览器以急速模式请求你的网站")
  * #### [一个来自一淘的简单面试题](<https://blog.tongdelove.com/a-easy-question-form-etao-interview/> "一个来自一淘的简单面试题")
