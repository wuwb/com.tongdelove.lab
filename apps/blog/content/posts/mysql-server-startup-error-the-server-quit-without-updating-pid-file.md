---
title: "MySql server startup error ‘The server quit without updating PID file ‘"
description: "有些天没有开 mysql, 期间升级了 OSX 10.9 系统。 今天打开 mysql 爆了个 MySql s …"
date: "2024-05-12"
tags: ["mysql"]
author: "WuWenbin"
---

有些天没有开 mysql, 期间升级了 OSX 10.9 系统。  
今天打开 mysql 爆了个 MySql server startup error ‘The server quit without updating PID file ‘ 错。  
通过以下命令修复了：
    
    
    sudo chown -R _mysql /usr/local/var/mysql
    

reference:  
<http://stackoverflow.com/questions/4963171/mysql-server-startup-error-the-server-quit-without-updating-pid-file>

### 相关文章

  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [Mac 下安装和配置 mysql 记录](<https://blog.tongdelove.com/mac-%e4%b8%8b%e5%ae%89%e8%a3%85%e5%92%8c%e9%85%8d%e7%bd%ae-mysql-%e8%ae%b0%e5%bd%95/> "Mac 下安装和配置 mysql 记录")
  * #### [mysql sql语句别名不生效](<https://blog.tongdelove.com/mysql-sql%e8%af%ad%e5%8f%a5%e5%88%ab%e5%90%8d%e4%b8%8d%e7%94%9f%e6%95%88/> "mysql sql语句别名不生效")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
