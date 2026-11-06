---
title: "自定义wordpress后台底部版权和版本信息"
description: "自定义左边信息 function admin_footer_text ($text) { _e($text.& …"
date: "2024-05-12"
tags: ["wordpress"]
author: "WuWenbin"
---

自定义左边信息  
function admin_footer_text ($text) {  
_e($text.’Developed by [Wuwb.me](<https://wuwb.me>).’, ‘bonestheme’ );  
}  
add_filter( ‘admin_footer_text’, ‘App\Theme\Setup\admin_footer_text’ );  
自定义右边信息  
function update_footer($text){  
_e($text.’ [WuWenbin](<https://wuwb.me>)‘, ‘bonestheme’ );  
}  
add_filter(‘update_footer’, ‘App\Theme\Setup\update_footer’, 11);

### 相关文章

  * #### [wordpress 不建议给has_cap传入一个参数问题修复](<https://blog.tongdelove.com/wordpress-has_cap-params-problem-fix/> "wordpress 不建议给has_cap传入一个参数问题修复")
  * #### [[翻译] wordpress reference/hooks/login_title](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_title/> "\[翻译\] wordpress reference/hooks/login_title")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [wordpress 禁止 ip 访问](<https://blog.tongdelove.com/wordpress-ip-ban-block-visit/> "wordpress 禁止 ip 访问")
  * #### [wordpress FTP credentials on localhost](<https://blog.tongdelove.com/wordpress-ftp-credentials-on-localhost/> "wordpress FTP credentials on localhost")
