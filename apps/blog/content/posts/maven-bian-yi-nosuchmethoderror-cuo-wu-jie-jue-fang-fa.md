---
title: "maven 编译 NoSuchMethodError 错误解决方法"
description: "今天update了下项目，maven compile 时报了个错。 错误如下： org.apache.mave …"
date: "2024-05-12"
tags: ["error", "java", "maven"]
author: "WuWenbin"
---

今天update了下项目，maven compile 时报了个错。  
错误如下：
    
    
               
                    org.apache.maven.plugins
                    maven-compiler-plugin
                    3.1
                    
                        
                            org.codehaus.plexus
                            plexus-compiler-javac
                            2.2
                        
                    
                    
                        1.6
                        1.6
                        utf-8
                        true
                    
                
    

当上面的
    
    
                        
                            org.codehaus.plexus
                            plexus-compiler-javac
                            2.2
                        
    

中的version版本太低，如1.8的时候会报一个错误：  
java.lang.NoSuchMethodError: org.codehaus.plexus.compiler.CompilerError: method (Ljava/lang/String;ZIIIILjava/lang/String;)V not found  
改成2.2就好了。  
reference：  
[](<http://chaoslawful.iteye.com/blog/1829357> "http://chaoslawful.iteye.com/blog/1829357")<http://chaoslawful.iteye.com/blog/1829357>

### 相关文章

  * #### [Solve Can’t connect to MySQL server Error](<https://blog.tongdelove.com/solve-cant-connect-to-mysql-server-error/> "Solve Can’t connect to MySQL server Error")
  * #### [vert.x 简单介绍](<https://blog.tongdelove.com/vert-x-introduce/> "vert.x 简单介绍")
  * #### [idea 无法在文件头部导入 java 包问题修复](<https://blog.tongdelove.com/idea-%e6%97%a0%e6%b3%95%e5%9c%a8%e6%96%87%e4%bb%b6%e5%a4%b4%e9%83%a8%e5%af%bc%e5%85%a5-java-%e5%8c%85%e9%97%ae%e9%a2%98%e4%bf%ae%e5%a4%8d/> "idea 无法在文件头部导入 java 包问题修复")
