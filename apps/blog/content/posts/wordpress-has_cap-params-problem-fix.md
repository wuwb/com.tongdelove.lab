---
title: "wordpress 不建议给has_cap传入一个参数问题修复"
description: "装了几个插件发现 wordpress 后台报了下面的错误： 不建议给has_cap传入一个参数！用户级别已被废 …"
date: "2024-05-12"
tags: ["baidu", "sitemap", "wordpress", "开发", "插件"]
author: "WuWenbin"
---

装了几个插件发现 wordpress 后台报了下面的错误：  
不建议给has_cap传入一个参数！用户级别已被废弃，请改用能力。 in /usr/share/wordpress/wp-includes/functions.php on line 4031  
检查发现是 baidu sitemap 插件引起的，将  
add_options_page("Baidu-Sitemap","Baidu-Sitemap", 8, **FILE** , ‘baidu_sitemap_optionpage’);  
里的 8 改成 ‘manage_options’ 就可以修复问题  
add_options_page("Baidu-Sitemap","Baidu-Sitemap", ‘manage_options’, **FILE** , ‘baidu_sitemap_optionpage’);

### 相关文章

  * #### [[翻译] wordpress reference/hooks/login_title](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_title/> "\[翻译\] wordpress reference/hooks/login_title")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
