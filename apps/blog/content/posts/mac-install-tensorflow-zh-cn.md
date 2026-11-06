---
title: "mac 安装 tensorflow"
description: "1、打开终端 2、sudo easy_install pip，有可能会报错 ImportError: cann …"
date: "2024-05-12"
tags: ["deep-learning", "docker", "tensorflow", "开发", "机器学习", "深度学习"]
author: "WuWenbin"
---

1、打开终端  
2、sudo easy_install pip，有可能会报错 ImportError: cannot import name ContextualZipFile，原因大概是 setuptools 有问题。需要调整 setuptools 版本。我的机子装过 pip，通过 sudo python -m pip install –upgrade –force pip 命令强制升级到最新版。  
3、pip install –upgrade virtualenv 安装虚拟环境  
4、创建虚拟环境，mac 下默认 python 为2.x 版本，创建2.x 虚拟环境用 virtualenv –system-site-packages targetDirectory 命令。如果想安装 3.x 虚拟环境，需要先安装 python3。可以使用 brew install python 安装 python3.然后再执行 virtualenv –system-site-packages -p python3 targetDirectory 创建 python3 的虚拟环境。targetDirectory 可以使用官方推荐的 ~/tensorflow ，也可以自己定义。  
5、进入 targetDirectory 目录 cd targetDirectory，执行 source ./bin/activate 激活虚拟目录。如果用的是 csh or tcsh ，命令为 source ./bin/activate.csh。  
6、虚拟环境里安装和升级 pip easy_install -U pip，保证 pip 版本大于8.1。  
7、安装和升级 tensorflow 。pip install –upgrade tensorflow，如果创建的是 python3虚拟环境，pip 和 pip3其实都是指向 pip3 的，所以不需要像官方文档里一样执行 pip3 install –upgrade tensorflow。  
8、如果上面安装 tensorflow 执行失败，可以通过 pip3 install –upgrade tensorflow path 安装。tensorflow path 通过 <https://www.tensorflow.org/install/install_mac#the_url_of_the_tensorflow_python_package> 查找。  
9、到这里已经安装完成啦，开始愉快的使用 tensorflow 吧  
10、使用完后 执行 deactivate 退出虚拟环境。  
11、如果想卸载的话可以使用 rm -r ~/tensorflow 。  
看上面的过程是不是有点繁琐。所以建议使用 docker 来使用 tensorflow。比较简单，只有一个步骤。  
1、docker run -it -p 8888:8888 tensorflow/tensorflow bash  
不过为了保证这行命令的执行。还需要一波的操作来安装 docker，并配置好加速服务等。好在都是值得的，学会用 docker 好处多多。

### 相关文章

  * #### [debian 9 安装 docker 教程](<https://blog.tongdelove.com/debian-9-install-docker-tutorial/> "debian 9 安装 docker 教程")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
