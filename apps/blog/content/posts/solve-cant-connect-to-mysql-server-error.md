---
title: "Solve Can’t connect to MySQL server Error"
description: "启动数据库时，报了以下这个错误： ERROR 2003 (HY000): Can’t connec …"
date: "2024-05-12"
tags: ["error", "mysql", "server", "数据库"]
author: "WuWenbin"
---

启动数据库时，报了以下这个错误：  
ERROR 2003 (HY000): Can’t connect to MySQL server on ‘localhost’ (10061)  
到mysql安装目录的bin目录下执行：mysqld –install  
再通过net start mysql来启动数据库，就能正常访问了

### 相关文章

  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [Mac 下安装和配置 mysql 记录](<https://blog.tongdelove.com/mac-%e4%b8%8b%e5%ae%89%e8%a3%85%e5%92%8c%e9%85%8d%e7%bd%ae-mysql-%e8%ae%b0%e5%bd%95/> "Mac 下安装和配置 mysql 记录")
  * #### [MySql server startup error ‘The server quit without updating PID file ‘](<https://blog.tongdelove.com/mysql-server-startup-error-the-server-quit-without-updating-pid-file/> "MySql server startup error ‘The server quit without updating PID file ‘")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * #### [maven 编译 NoSuchMethodError 错误解决方法](<https://blog.tongdelove.com/maven-%e7%bc%96%e8%af%91-nosuchmethoderror-%e9%94%99%e8%af%af%e8%a7%a3%e5%86%b3%e6%96%b9%e6%b3%95/> "maven 编译 NoSuchMethodError 错误解决方法")
