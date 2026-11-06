---
title: "mac os 上php连接mysql数据库不能使用使用localhost问题"
description: "尼玛，踩到坑了，蛋疼。浪费了半个小时 在mac上搭了php的环境后连不上数据库，数据库正常，通过命令行工具也能 …"
date: "2024-05-12"
tags: ["mac", "mysql", "数据库"]
author: "WuWenbin"
---

# 尼玛，踩到坑了，蛋疼。浪费了半个小时  
在mac上搭了php的环境后连不上数据库，数据库正常，通过命令行工具也能正常访问。  
查了下。。。才发现是localhost的写法不行：

当把localhost换成127.0.0.1或者本机的IP时，居然正常了。以前一直认为localhost与127.0.0.1是一回事，现在事实证明它们其中还是有区别的。  
在网上搜索了一下它们的区别，有人已经说的很明白了，具体可以参看：<http://blog.sina.com.cn/s/blog_40e1ba640100ivjj.html，http://www.diybl.com/course/7_databases/mysql/myxl/20090722/168062.html。它们的主要区别是localhost是通过socket方式来连接，而127.0.0.1则是走的TCP协议>。  
上面提到区别就是导致mac下无法连接数据库的原因。那为什么socket方式无法连接呢？由于mac os lion上已经自带了apache和php，我的环境使用就使用默认的，mysql服务是在官网下载dmg安装最近版本，php的配置文件(/ect/php.ini)中设置有三个地方(mysql.default_socket、mysqli.default_socket、pdo_mysql.default_socket)设置了mysql socket文件存放的位置，其默认值为/var/mysql/mysql.sock。查看mysql服务使用的socket文件有两种方式  
方法1：  
echo "show variables" | mysql | grep "socket"  
方法二：  
echo "status" | mysql | grep "socket"  
注意：如果mysql设置了密码，使用-u，-p来指定用户名和密码  
这里看到mysql的socket文件存放位置为/tmp/mysql.sock。  
看到这儿应该知道问题所在了吧，使用localhost连接失败的原因为在socket的方式下，php默认配置的mysql服务的socket文件不存在，所以导致连接失败，如果把连接失败的错误信息dump出来，你应该会看到错误信息中包含了“No such file or directory”。  
知道原因就容易修改了，只需要把php配置文件中mysql.default_socket、mysqli.default_socket、pdo_mysql.default_socket这三项值修改为mysql服务配置对应值即可，修改好后需要重启apache服务。当然也可以修改mysql配置文件中的socket信息，使其保持一致即可，修改好后重启mysql服务。

### 相关文章

  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [Mac 下安装和配置 mysql 记录](<https://blog.tongdelove.com/mac-%e4%b8%8b%e5%ae%89%e8%a3%85%e5%92%8c%e9%85%8d%e7%bd%ae-mysql-%e8%ae%b0%e5%bd%95/> "Mac 下安装和配置 mysql 记录")
  * #### [MySql server startup error ‘The server quit without updating PID file ‘](<https://blog.tongdelove.com/mysql-server-startup-error-the-server-quit-without-updating-pid-file/> "MySql server startup error ‘The server quit without updating PID file ‘")
  * #### [Mysql 逻辑备份命令 mysqldump](<https://blog.tongdelove.com/mysql-backup-command-mysqldump/> "Mysql 逻辑备份命令 mysqldump")
  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
