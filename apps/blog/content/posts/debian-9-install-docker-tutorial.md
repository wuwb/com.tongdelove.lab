---
title: "debian 9 安装 docker 教程"
description: "环境 Debian Stretch 9 uname -a => Linux VM-1-242-debia …"
date: "2024-05-12"
tags: ["docker", "开发"]
author: "WuWenbin"
---

环境  
Debian Stretch 9  
uname -a => Linux VM-1-242-debian 4.9.0-3-amd64 #1 SMP Debian 4.9.30-2 (2017-06-12) x86_64 GNU/Linux  
1、卸载老版本：sudo apt-get remove docker docker-engine docker.io  
2、更新仓库： sudo apt-get update  
3、安装可以使 apt 运行在 https 协议上的依赖：sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common  
4、添加 docker 官方 GPG key：curl -fsSL <https://download.docker.com/linux/>$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add -。简单介绍下，这里的 GPG key 是公钥，用来解密加密的 docker 安装包。这是在网上安全传播发布的软件的一种方式。  
5、验证 GPG key 正确安装：sudo apt-key fingerprint 0EBFCD88，看输出中 Key fingerprint 是否为 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88  
6、添加 docker 仓库 sudo add-apt-repository "deb [arch=amd64] <https://download.docker.com/linux/>$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"，如果想安装 edge 或者 测试版，可以在 stable 后面加 edge 和 test  
7、再次执行 sudo apt-get update 更新新添加仓库里的信息。  
8、sudo apt-get install docker-ce 安装 docker，如果第六步中添加了 edge 版本，那这个命令安装的是最新版本，而不是稳定版本。在生产环境里建议安装最新的稳定版本。可以通过 sudo apt-get install docker-ce=版本号 进行安装。版本号可以通过 apt-cache madison docker-ce 命令获取。  
9、验证安装成功 sudo docker run hello-world。  
10、卸载 sudo apt-get purge docker-ce && sudo rm -rf /var/lib/docker  
reference：  
<https://docs.docker.com/install/linux/docker-ce/debian/>

### 相关文章

  * #### [mac 安装 tensorflow](<https://blog.tongdelove.com/mac-install-tensorflow-zh-cn/> "mac 安装 tensorflow")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
