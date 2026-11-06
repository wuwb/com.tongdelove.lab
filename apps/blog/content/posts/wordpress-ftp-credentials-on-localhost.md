---
title: "wordpress FTP credentials on localhost"
description: "本地安装的测试用的wordpress升级的时候提示要输入ftp用户名和密码。 想想应该是权限的问题。 两条命令 …"
date: "2024-05-12"
tags: ["wordpress"]
author: "WuWenbin"
---

本地安装的测试用的wordpress升级的时候提示要输入ftp用户名和密码。  
想想应该是权限的问题。  
两条命令搞定
    
    
    $ sudo chown -R _www wordpress
    $ sudo chmod -R g+w wordpress
    

reference:  
<http://wordpress.org/support/topic/wordpress-localhost-ftp-computer-security>  
<http://codex.wordpress.org/Changing_File_Permissions>  
<http://wordpress.stackexchange.com/questions/57166/ftp-credentials-on-localhost>

### 相关文章

  * #### [wordpress 不建议给has_cap传入一个参数问题修复](<https://blog.tongdelove.com/wordpress-has_cap-params-problem-fix/> "wordpress 不建议给has_cap传入一个参数问题修复")
  * #### [[翻译] wordpress reference/hooks/login_title](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_title/> "\[翻译\] wordpress reference/hooks/login_title")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [自定义wordpress后台底部版权和版本信息](<https://blog.tongdelove.com/%e8%87%aa%e5%ae%9a%e4%b9%89wordpress%e5%90%8e%e5%8f%b0%e5%ba%95%e9%83%a8%e7%89%88%e6%9d%83%e5%92%8c%e7%89%88%e6%9c%ac%e4%bf%a1%e6%81%af/> "自定义wordpress后台底部版权和版本信息")
  * #### [wordpress 禁止 ip 访问](<https://blog.tongdelove.com/wordpress-ip-ban-block-visit/> "wordpress 禁止 ip 访问")
