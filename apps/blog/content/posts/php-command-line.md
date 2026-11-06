---
title: "php 常用命令"
description: "查看已安装扩展 php -m 查看扩展信息 php -ri memcached # 返回信息 memcache …"
date: "2024-05-12"
tags: ["php", "命令行"]
author: "WuWenbin"
---

查看已安装扩展
    
    
    php -m

查看扩展信息
    
    
    php -ri memcached
    
    
    # 返回信息
    memcached
    
    memcached support => enabled
    Version => 3.1.5
    libmemcached version => 1.0.18
    SASL support => yes
    Session support => yes
    igbinary support => yes
    json support => yes
    msgpack support => yes
    
    Directive => Local Value => Master Value
    memcached.sess_locking => On => On
    memcached.sess_lock_wait_min => 150 => 150
    memcached.sess_lock_wait_max => 150 => 150
    memcached.sess_lock_retries => 5 => 5
    memcached.sess_lock_expire => 0 => 0
    memcached.sess_binary_protocol => On => On
    memcached.sess_consistent_hash => On => On
    memcached.sess_consistent_hash_type => ketama => ketama
    memcached.sess_number_of_replicas => 0 => 0
    memcached.sess_randomize_replica_read => Off => Off
    memcached.sess_remove_failed_servers => Off => Off
    memcached.sess_server_failure_limit => 0 => 0
    memcached.sess_connect_timeout => 0 => 0
    memcached.sess_sasl_username => no value => no value
    memcached.sess_sasl_password => no value => no value
    memcached.sess_persistent => Off => Off
    memcached.sess_prefix => memc.sess.key. => memc.sess.key.
    memcached.sess_lock_wait => not set => not set
    memcached.sess_lock_max_wait => not set => not set
    memcached.compression_type => fastlz => fastlz
    memcached.compression_factor => 1.3 => 1.3
    memcached.compression_threshold => 2000 => 2000
    memcached.serializer => php => php
    memcached.store_retry_count => 2 => 2
    memcached.default_consistent_hash => Off => Off
    memcached.default_binary_protocol => Off => Off
    memcached.default_connect_timeout => 0 => 0

### 相关文章

  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [git 简单统计代码提交量](<https://blog.tongdelove.com/git-%e7%ae%80%e5%8d%95%e7%bb%9f%e8%ae%a1%e4%bb%a3%e7%a0%81%e6%8f%90%e4%ba%a4%e9%87%8f/> "git 简单统计代码提交量")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * [![](https://blog.tongdelove.com/app/uploads/2021/12/82141247_p0-150x150.jpeg)网络命令 curl](<https://blog.tongdelove.com/command-curl/> "网络命令 curl")
