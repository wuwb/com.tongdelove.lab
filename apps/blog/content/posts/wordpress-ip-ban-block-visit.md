---
title: "wordpress 禁止 ip 访问"
description: "后台统计插件，记录到下面6个 ip 每天固定访问网站24000次左右，查了下可能是和温州 phpddos 攻击 …"
date: "2024-05-12"
tags: ["wordpress"]
author: "WuWenbin"
---

后台统计插件，记录到下面6个 ip 每天固定访问网站24000次左右，查了下可能是和温州 phpddos 攻击相关的 ip，  
手动到 nginx 里禁止 ip 比较麻烦，找了个 wordpress 插件来解决，虽然没有 nginx 配置的方案好，但是方便快捷。  
1 4117 Unknown Unknown 124.14.16.204 MSIE Windows 10.0  
2 4117 Unknown Unknown 222.186.129.155 MSIE Windows 10.0  
3 4114 Unknown Unknown 61.130.28.141 MSIE Windows 10.0  
4 4112 Unknown Unknown 122.228.199.114 MSIE Windows 10.0  
5 4110 Unknown Unknown 113.31.27.249 MSIE Windows 10.0  
6 4107 Unknown Unknown 222.88.91.50 MSIE Windows 10.0  
后台安装 wp-ban 插件，填写上面的 ip 搞定。

### 相关文章

  * #### [wordpress 不建议给has_cap传入一个参数问题修复](<https://blog.tongdelove.com/wordpress-has_cap-params-problem-fix/> "wordpress 不建议给has_cap传入一个参数问题修复")
  * #### [[翻译] wordpress reference/hooks/login_title](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_title/> "\[翻译\] wordpress reference/hooks/login_title")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [自定义wordpress后台底部版权和版本信息](<https://blog.tongdelove.com/%e8%87%aa%e5%ae%9a%e4%b9%89wordpress%e5%90%8e%e5%8f%b0%e5%ba%95%e9%83%a8%e7%89%88%e6%9d%83%e5%92%8c%e7%89%88%e6%9c%ac%e4%bf%a1%e6%81%af/> "自定义wordpress后台底部版权和版本信息")
  * #### [wordpress FTP credentials on localhost](<https://blog.tongdelove.com/wordpress-ftp-credentials-on-localhost/> "wordpress FTP credentials on localhost")
