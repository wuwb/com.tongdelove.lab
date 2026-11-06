---
title: "前端用户行为打点方案"
description: "背景 网站访问量大了以后，运营希望收集部分用户行为记录，用来分析预测用户偏好，进行针对性的优化。 方案 1、先 …"
date: "2024-05-12"
tags: ["action", "behavior", "log", "trace", "开发"]
author: "WuWenbin"
---

背景  
网站访问量大了以后，运营希望收集部分用户行为记录，用来分析预测用户偏好，进行针对性的优化。  
方案  
1、先要确定要收集哪些行为  
根据我们公司的情况，这里确定了要收集用户鼠标点击，手指移动起始位置，和表单获取焦点的行为。除此之外，还有用户键盘输入等行为可以记录，可以选择性的增加。  
2、确定上报的方式  
上报是通过将行为数据提交到一个后端接口进行记录。为了避免实时的提交数据，造成无必要的性能损耗，可以将行为数据存储到一个列表中，每隔一段时间，从列表中获取一定数量的数据进行提交。  
用户行为数据可能会比较多，选择间隔时间提交固定数量的行为数据后，可能会有部分数据在用户离开页面之前，无法有效的提交到后端。这时候，需要在用户离开页面之前，将剩下未提交的数据全部都一起提交了。但是有个问题，用户离开页面的时候，如果再触发 ajax 去提交数据，ajax 很大概率会被中断，导致数据提交失败。所以这里采用的方案是，在 window 的 unload 事件里把剩下的行为数据存储到 localStorage 之中。然后再访问下一个页面，或者下次访问同域的页面的时候，在用户第一次触发点击行为的时候合并 localStorage 里的数据一次性提交到后端。  
不过存放到 localStorage 的方式也无法保障能提交所有的数据。在用户关闭浏览器 tab，或者浏览器 crash 的时候，window 的 unload 是不会触发的。并且不是所有浏览器都支持 window unload 事件。支持请见 <http://w3help.org/zh-cn/causes/SD9026>  
为了通用性，提交数据可以使用跨域支持的 new Image() 方式  
3、确定数据存储格式  
前面提到要将数据存储到列表中，所以需要确定下数据存储格式。  
点击和移动需要记录点击事件的 screenX, screenY, pageX, pageY 还有时间和事件名。  
基本是这样的，逻辑确定好后，实现也比较简单了，实际写下来 200 行左右的代码。

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
