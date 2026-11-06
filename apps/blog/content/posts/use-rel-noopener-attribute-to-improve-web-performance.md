---
title: "通过 rel=noopener 属性进行性能优化"
description: "当你通过打开新标签的方式跳转页面时，最好给 a 标签加上 rel=\"noopener\" 属 …"
date: "2024-05-12"
tags: ["performance", "安全", "开发", "性能", "性能优化"]
author: "WuWenbin"
---

当你通过打开新标签的方式跳转页面时，最好给 a 标签加上 rel="noopener" 属性，特别是在调往其他域的页面的时候。  
代码如下：  
<a href="<http://example.com>" target="_blank" rel="noopener">  
Example site  
</a>  
从安全上看：  
如果没有添加这个属性，那么新页面可以通过 window.opener 变量访问原来的页面，虽然受限于跨域安全机制，新页面不能读取老页面信息，但是新页面可以通过 window.opener.location = newURL 来修改老页面连接，让其跳转到其他页面。  
从性能上看：  
另外一个重要的问题是，如果仅仅通过 target="_blank" 标签从新标签打开页面。新老页面将运行在同一个进程上，如果新老页面上有运行大量计算任务的脚本时，新老页面的性能都会受到影响。  
还有要注意的点，在老的浏览器中，rel=noreferrer 除了禁用 window.opener 外，还一并禁用了 HTTP 头部 的 Referer 属性，会对页面打点等功能造成影响，可以通过
    
    
    var otherWindow = window.open();
    otherWindow.opener = null;
    otherWindow.location = url;

的方式进行规避。但是这样的话又会引入新的问题。这个方法在 safari 下会因为弹出机制被拦截。  
参考文章：  
<https://developers.google.com/web/tools/lighthouse/audits/noopener?hl=zh-cn>  
<https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/>  
<https://mathiasbynens.github.io/rel-noopener/#hax>  
<http://lists.w3.org/Archives/Public/public-whatwg-archive/2015Jan/0002.html>  
<http://www.jdon.com/idea/target-blank.html>  
<https://my.oschina.net/dawd/blog/816023>

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
