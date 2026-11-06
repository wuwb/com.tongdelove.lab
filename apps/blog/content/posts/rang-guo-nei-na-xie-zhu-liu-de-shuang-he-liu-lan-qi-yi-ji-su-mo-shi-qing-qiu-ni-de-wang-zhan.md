---
title: "让国内那些主流的双核浏览器以急速模式请求你的网站"
description: "今天收到封网站页面在360浏览器下轻微变形的bug邮件。 嘿，网站在 webkit 下一点问题都没有，双核下出 …"
date: "2024-05-12"
tags: ["IE", "html", "兼容模式", "急速模式", "浏览器", "渲染"]
author: "WuWenbin"
---

今天收到封网站页面在360浏览器下轻微变形的bug邮件。  
嘿，网站在 webkit 下一点问题都没有，双核下出了问题，肯定是以 IE 的渲染模式运行了啊。  
赶紧查了下，看看是不是有方法可以让自己的网站默认能以急速的方式运行。  
看了下还是有很多人有同样地疑问的，从浏览器厂商的论坛上了解到，浏览器选择以哪种模式渲染网页基本是靠查询一个含有域名库的文件来实现的。  
域名库由厂商人员手动维护。  
这不坑爹啊，继续查。终于还是找到了个方法。  
是360提供的：  
在网页的head标签中添加下面这行一行代码：
    
    
        
    

content的取值为webkit, ie-comp, ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。  
如果页面需默认用极速核，增加标签：  
如果页面需默认用ie兼容内核，增加标签：  
如果页面需默认用ie标准内核，增加标签：  
360 还希望这个 meta 标签能成为国内双核浏览器渲染模式选择的行内标准。  
不管怎样，页面的问题解决啦。  
等待设计师重新设计界面后再把出问题的地方重构一下。  
reference:  
<http://se.360.cn/v6/help/meta.html>

### 相关文章

  * #### [使用 gzip 压缩 js， css 等静态文件，优化网页加载速度](<https://blog.tongdelove.com/use-gzip-to-compress-js-css-files/> "使用 gzip 压缩 js， css 等静态文件，优化网页加载速度")
  * #### [使用favicon小图标需要注意的地方](<https://blog.tongdelove.com/tips-for-use-favicon-icon-in-your-website/> "使用favicon小图标需要注意的地方")
  * #### [小米手机 adb 调试无法识别问题解决](<https://blog.tongdelove.com/xiaomi-phone-adb-debug-can-not-recognition-problem-fix/> "小米手机 adb 调试无法识别问题解决")
  * #### [开放搜索草案简介](<https://blog.tongdelove.com/open-search-darft-info/> "开放搜索草案简介")
  * #### [一个来自一淘的简单面试题](<https://blog.tongdelove.com/a-easy-question-form-etao-interview/> "一个来自一淘的简单面试题")
