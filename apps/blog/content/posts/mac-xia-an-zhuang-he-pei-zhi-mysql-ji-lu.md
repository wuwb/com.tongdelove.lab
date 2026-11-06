---
title: "Mac 下安装和配置 mysql 记录"
description: "安装其实很简单，就一条命令： $brew install mysql 主要是安装好后需要注意做一些安全方面的设 …"
date: "2024-05-12"
tags: ["brew", "mysql", "secure"]
author: "WuWenbin"
---

安装其实很简单，就一条命令：
    
    
    $brew install mysql
    

主要是安装好后需要注意做一些安全方面的设置，以前都没有意识去做，这里记录一下。  
安装好后主要做三件事：  
第一，要给 root 用户设置密码。
    
    
    $mysqladmin -u root password 'password'
    

第二，默认情况下mysql可以不用密码就连接，我们要设置一些登录密码的安全访问限制，删除匿名用户访问，删除root用户通过网络访问，删除test测试数据库等。
    
    
    $mysql_secure_installation
    

最后，更具需要配置 my.cnf 文件。

### 相关文章

  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [MySql server startup error ‘The server quit without updating PID file ‘](<https://blog.tongdelove.com/mysql-server-startup-error-the-server-quit-without-updating-pid-file/> "MySql server startup error ‘The server quit without updating PID file ‘")
  * #### [Homebrew安装老版本程序](<https://blog.tongdelove.com/use-homebrew-to-install-old-version-programs/> "Homebrew安装老版本程序")
  * #### [mysql sql语句别名不生效](<https://blog.tongdelove.com/mysql-sql%e8%af%ad%e5%8f%a5%e5%88%ab%e5%90%8d%e4%b8%8d%e7%94%9f%e6%95%88/> "mysql sql语句别名不生效")
