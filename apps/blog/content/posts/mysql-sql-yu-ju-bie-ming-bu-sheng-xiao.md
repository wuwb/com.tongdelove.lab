---
title: "mysql sql语句别名不生效"
description: "sql语句用到了别名，在oracle、db2,sqlservice数据库中正常，在mysql中不正常 因为在m …"
date: "2024-05-12"
tags: ["database", "djbc", "mysql", "sql"]
author: "WuWenbin"
---

sql语句用到了别名，在oracle、db2,sqlservice数据库中正常，在mysql中不正常  
因为在mysql下的useOldAliasMetadataBehavior默认为false，字段别名默认不生效，配置文件里将其改为true就可以了。  
jdbc:mysql://127.0.0.1:3306/DATABASE?characterEncoding=utf-8&useOldAliasMetadataBehavior=true  
参考链接：  
[](<http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html> "http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html")<http://dev.mysql.com/doc/refman/5.0/en/connector-j-reference-configuration-properties.html>

### 相关文章

  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [Mac 下安装和配置 mysql 记录](<https://blog.tongdelove.com/mac-%e4%b8%8b%e5%ae%89%e8%a3%85%e5%92%8c%e9%85%8d%e7%bd%ae-mysql-%e8%ae%b0%e5%bd%95/> "Mac 下安装和配置 mysql 记录")
  * #### [MySql server startup error ‘The server quit without updating PID file ‘](<https://blog.tongdelove.com/mysql-server-startup-error-the-server-quit-without-updating-pid-file/> "MySql server startup error ‘The server quit without updating PID file ‘")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
