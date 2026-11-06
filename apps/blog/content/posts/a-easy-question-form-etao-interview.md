---
title: "一个来自一淘的简单面试题"
description: "很久前的yisi在微博上发的一淘面试题，整理文件的时候挖出来的。 比较简单的一道题目，考察点主要有负边距，po …"
date: "2024-05-12"
tags: ["css", "etao", "html", "interview"]
author: "WuWenbin"
---

[![interview etao](http://sites.com/wp-content/uploads/2013/09/C1AB94BC-1DC4-452D-B6EE-01E15478D9D6.jpg)](<http://sites.com/wp-content/uploads/2013/09/C1AB94BC-1DC4-452D-B6EE-01E15478D9D6.jpg>)一个简单的面试题  
很久前的yisi在微博上发的一淘面试题，整理文件的时候挖出来的。

比较简单的一道题目，考察点主要有负边距，position定位，z-index层级，layout等。  
看代码：  
dom结构：
    
    
        

  * 1
  * 2
  * 3
  * 4
  * 5
  * 6
  * 7
  * 8
  * 9

考虑性能的话还要加上类名，通过tags来解析样式速度慢，因为这里不涉及到具体的业务，就不做处理了。  
关于类名命名方式之类的，虽然也很重要，但这里也不说，非要说点什么的话，那就是和公司或者社区的尽量保持一致性。

css：
    
    
        ul {
          width: 150px;
          list-style-type: none;
        }
        ul li {
          float: left;
        }
        ul a {
          position: relative;
          float: left;
          margin: 0 -5px -5px 0;
          border: 5px solid blue;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
        }
        ul a:hover {
          border-color: red;
          z-index: 99;
        }
    

虽然效果写出来了，但是代码中其实还是有两处不清楚的地方，有人知道的话麻烦告知一下： 
  * 1.用 list-style-type: none; 好，还是用 list-style: none; 好，都能达到效果，但是 list-style 里还包括了除type外的其他属性。不知道哪个性能好，或者有其他优势。这就像用 background 时一样，有人直接用background加个颜色，而有人用 background-color, 虽然写的时候没什么问题，但是重构的时候可能因为用了 background 而把其他叠加的 background 其他样式覆盖掉。但是这里的属性值是 none, 就不存在覆盖不覆盖的问题了。个人倾向于使用具体一点的list-style-type.
  * 2.list-style-type 或者 list-style 写在 ul 中还是写在 li 中好，在支付宝的前端 ui 框架爱丽丝中知道 ul 的list-style-type 是可以继承的，写在两个地方都能实现相同的效果。不知道哪种好。爱丽丝中是写在 ul，我个人也倾向于写在 ul 中，我喜欢能写在模块外层上的样式尽量写在外层。

这题目中还有很多可以写的地方，就不展开来讲了。  
[题目效果](<http://sites.com/wp-content/library/demo/test-etao-interview.html> "一淘面试题")  
update:  
吃个饭回来，想到为毛这里用 ul 是语义化，于是改成用div了，dom结构瞬间简单了很多。  
例子见：  
[题目效果2](<http://sites.com/wp-content/library/demo/test-etao-interview2.html> "一淘面试题")

### 相关文章

  * #### [使用text-shadow 属性的时候注意点](<https://blog.tongdelove.com/tips-for-using-text-shadow-property/> "使用text-shadow 属性的时候注意点")
  * #### [使用 gzip 压缩 js， css 等静态文件，优化网页加载速度](<https://blog.tongdelove.com/use-gzip-to-compress-js-css-files/> "使用 gzip 压缩 js， css 等静态文件，优化网页加载速度")
  * #### [使用favicon小图标需要注意的地方](<https://blog.tongdelove.com/tips-for-use-favicon-icon-in-your-website/> "使用favicon小图标需要注意的地方")
  * #### [开放搜索草案简介](<https://blog.tongdelove.com/open-search-darft-info/> "开放搜索草案简介")
  * #### [让国内那些主流的双核浏览器以急速模式请求你的网站](<https://blog.tongdelove.com/%e8%ae%a9%e5%9b%bd%e5%86%85%e9%82%a3%e4%ba%9b%e4%b8%bb%e6%b5%81%e7%9a%84%e5%8f%8c%e6%a0%b8%e6%b5%8f%e8%a7%88%e5%99%a8%e4%bb%a5%e6%80%a5%e9%80%9f%e6%a8%a1%e5%bc%8f%e8%af%b7%e6%b1%82%e4%bd%a0%e7%9a%84/> "让国内那些主流的双核浏览器以急速模式请求你的网站")
