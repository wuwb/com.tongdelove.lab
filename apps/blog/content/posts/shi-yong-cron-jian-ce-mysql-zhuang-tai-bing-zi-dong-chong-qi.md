---
title: "使用cron监测mysql状态并自动重启"
description: "腾讯云上部署了一个 wordpress，mysql 常常因为服务器负载过大导致进程被 kill 掉 没太多时间 …"
date: "2024-05-12"
tags: ["开发"]
author: "WuWenbin"
---

腾讯云上部署了一个 wordpress，mysql 常常因为服务器负载过大导致进程被 kill 掉  
没太多时间处理这些东西，比如优化性能，静态化，资源放 cdn 等，写个脚本定时检测 mysql 状态，跪掉的话自动重启就好了，有时间再慢慢搞。  
对了，我的系统是 debian8
    
    
    #!/bin/sh
    pidof mysqld >/dev/null
    if [ $? -eq 0 ]
    then
        echo "It is running."
    else
        echo "At date MySQL Server was stopped">> /home/mysql_log
        /etc/init.d mysql restart
    fi
    

新建脚本后执行 crontab –e，在文件末尾添加定时任务 */2* ** * sh /path/to/restart_mysql.sh 每两分钟检查一次状态。  
问题完美

### 相关文章

  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
  * #### [What 10 things should you do every day to improve your life?](<https://blog.tongdelove.com/what-10-things-should-you-do-every-day-to-improve-your-life/> "What 10 things should you do every day to improve your life?")
