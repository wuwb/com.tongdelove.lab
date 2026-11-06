---
title: "Mysql 逻辑备份命令 mysqldump"
description: "备份 备份所有数据库 mysqldump -uroot -p --all-databases > ~/a …"
date: "2024-05-12"
tags: ["backup", "mysql", "命令行", "备份", "数据库"]
author: "WuWenbin"
---

**文章目录**[隐藏]

  * 备份
  * 还原

## 备份

备份所有数据库
    
    
    mysqldump -uroot -p --all-databases > ~/all.db

备份指定数据库，多个库以空格间隔
    
    
    mysqldump -uroot -p test test2 > ~/test.db

备份指定数据库排除某些标
    
    
    mysqldump -uroot -p test --ignore-table=test.t1 --ignore-table=test.t2 > ~/test.db

## 还原

系统命令还原
    
    
    mysqladmin -uroot -p create db_name 
    mysql -uroot -p  db_name < /backup/mysqldump/db_name.db

SQL 命令还原
    
    
    create database db_name;
    use db_name;
    source ~/db_name.db;

### 相关文章

  * #### [mac os 上php连接mysql数据库不能使用使用localhost问题](<https://blog.tongdelove.com/mac-os-use-php-linkto-mysql-database-error-cant-use-the-servername-localhost/> "mac os 上php连接mysql数据库不能使用使用localhost问题")
  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [mysql sql语句别名不生效](<https://blog.tongdelove.com/mysql-sql%e8%af%ad%e5%8f%a5%e5%88%ab%e5%90%8d%e4%b8%8d%e7%94%9f%e6%95%88/> "mysql sql语句别名不生效")
  * #### [Mac 下安装和配置 mysql 记录](<https://blog.tongdelove.com/mac-%e4%b8%8b%e5%ae%89%e8%a3%85%e5%92%8c%e9%85%8d%e7%bd%ae-mysql-%e8%ae%b0%e5%bd%95/> "Mac 下安装和配置 mysql 记录")
