---
title: "vert.x 简单介绍"
description: "Vert.x is a tool-kit for building reactive applications …"
date: "2024-05-12"
tags: ["java"]
author: "WuWenbin"
---

Vert.x is a tool-kit for building reactive applications on the JVM  
Vert.x 是用于在JVM上构建响应式应用程序的工具包  
今天看公司配置服务中心代码的时候，看到项目底层是用 vert.x 实现的。  
笔者对 java 不太熟，随便搜索了解下。  
1、先看下官方介绍  
1.1、Scale 事件驱动，非阻塞模型，支持高并发。  
1.2、多语种支持。支持 Java, JavaScript, Groovy, Ruby, Ceylon, Scala 和 Kotlin 等不同语言。  
1.3、灵活。大小项目都适用。很多公司用来做实时游戏开发。不限制框架或容器，可以灵活创建应用。  
2、再看下使用方法  
代码看起来和 nodejs 非常像，类似于一个运行在 jvm 上的 nodejs  
`HttpServer server = vertx.createHttpServer();  
server.requestHandler(request -> {  
// This handler gets called for each request that arrives on the server  
HttpServerResponse response = request.response();  
response.putHeader("content-type", "text/plain");  
// Write to the response and end it  
response.end("Hello World!");  
});  
server.listen(8080);`  
Vert.x 底层使用 netty，但比 netty 要简单，支持 cluster。  
光是看看这些介绍，还是不了解实际的使用场景是什么。  
参考：  
<https://vertx.io/>  
<https://leokongwq.github.io/2017/11/22/vertx-http-server-analyze.html>  
<https://www.zhihu.com/question/22021343>  
<https://www.cnblogs.com/rongfengliang/p/3531110.html>  
<https://github.com/codefollower/My-Blog/issues/10>  
<https://www.jianshu.com/p/2ab64267ae2c>

### 相关文章

  * #### [maven 编译 NoSuchMethodError 错误解决方法](<https://blog.tongdelove.com/maven-%e7%bc%96%e8%af%91-nosuchmethoderror-%e9%94%99%e8%af%af%e8%a7%a3%e5%86%b3%e6%96%b9%e6%b3%95/> "maven 编译 NoSuchMethodError 错误解决方法")
