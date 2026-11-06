---
title: "NODEJS 命令行工具开发简介"
description: "SHELL可执行脚本 写一个 shell 命令行脚本。 # test001.sh echo Hello Wo …"
date: "2024-05-12"
tags: ["command", "nodejs", "npm", "shell", "开发"]
author: "WuWenbin"
---

**文章目录**[隐藏]

  * SHELL可执行脚本
  * NODEJS 可执行脚本
  * NODEJS 命令行工具开发
    * 获取命令行参数
      * 1、普通方式
      * 2、commander 模块
      * 3、 yargs 模块
      * 4、 minimist 模块
      * 5、模块对比
      * 1、基础模块
      * 2、通用模块
    * 命令行交互
    * 其他事项
      * 1、返回值
      * 2、重定向
      * 3、系统信号
    * 发布

* NODEJS 命令行工具应用举例

  * 1、主机管理
  * 2、命令行爬虫
  * 3、自动提交表单

### SHELL可执行脚本

写一个 shell 命令行脚本。
    
    
    # test001.sh
    echo "Hello World !"

如何运行这个脚本？
    
    
    sh test001.sh

这还不是一个命令行工具，这里命令行工具是 sh，test001.sh 是这个工具的一个参数。

如何转转换成命令行工具？
    
    
    # test001.sh
    #!/bin/bash
    echo "Hello World !"
    
    
    chmod +x test001.sh

以命令行工具的形式执行。
    
    
    ./test001.sh

和平常的命令行工具有点不一样？

重命名成 test001，放入系统路径中，就可以直接用 test001 全局执行命令。
    
    
    export PATH="/usr/local/opt/ruby/bin:$PATH"

复杂多文件的情况？
    
    
    test001
    |--bin/
    |----test001
    |--lib/
    |----...
    
    
    export PATH="/path/to/test001/bin:$PATH"

扩展一

> 
>     cat /etc/shells
>     
>     
>     # List of acceptable shells for chpass(1).
>     # Ftpd will not allow users to connect who are not using
>     # one of these shells.
>     # /bin/false was added for FTP users that do not have a home directory.
>     /bin/bash
>     /bin/csh
>     /bin/ksh
>     /bin/sh
>     /bin/tcsh
>     /bin/zsh
>     /usr/bin/false

扩展二

> 
>     #!/usr/bin/env shell
> 
> 1、兼容性，/usr/bin/env 从系统路径中查找脚本解释器路径
> 
> 2、/usr/bin/env 有 -S -P 参数，可以指定其他查找路径
>
>> 
>>     #!/usr/bin/env -S -P /custom/search/path:${PATH} bash

### NODEJS 可执行脚本

同理
    
    
    # test002.js
    console.log('hello world');
    
    
    node test002.js
    
    
    # test002.js
    #!/usr/bin/env node
    console.log('hello world');
    
    
    chmod +x test002.js 
    
    
    ./test002.js

去扩展名，复杂多文件的情况？
    
    
    # aveng/meili-all-fwtool-aides Aides 3 项目
    .
    ├── bin
    │   ├── aides
    │   ├── aides_application
    │   ├── aides_component
    │   ├── aides_fwtool
    │   ├── enums
    │   └── tools
    ├── jsconfig.json
    ├── lib
    │   ├── application
    │   ├── commons
    │   ├── component
    │   ├── fwtool
    │   └── index.js
    ├── node_modules
    |   |...
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── application
    │   ├── commons
    │   ├── component
    │   ├── fwtool
    │   └── index.js
    ├── README.md
    └── yarn.lock

扩展一

> 对 nodejs 命令行工具，不需要手动设置系统路径
>     
>     
>     {
>       "name": "test002",
>       "bin": {
>         "test002": "path/to/entry\ file"
>       }
>     }
>     
>     
>     npm link

### NODEJS 命令行工具开发

#### 获取命令行参数

##### 1、普通方式

在 nodejs 脚本中，通过 process.argv 获取命令行参数，process.argv 是个数组：
    
    
    #!/usr/bin/env node
    console.log('process.argv: ', process.argv);
    
    
    node test001.js -a -b -c -d 123 --aaa --bbb --ccc --ddd 123 456
    
    
    process.argv:  [ '/usr/local/Cellar/node/11.3.0_1/bin/node',
      '/Users/eqielb/Test/test/test001.js',
      '-a',
      '-b',
      '-c',
      '-d',
      '123',
      '--aaa',
      '--bbb',
      '--ccc',
      '--ddd',
      '123',
      '456' ]
    
    
    ./test001.js -a -b -c -d 123 --aaa --bbb --ccc --ddd 123 456

输出结果是一样的。

##### 2、commander 模块

手动分析管理参数非常麻烦，可以使用 `commander` 模块

<https://www.npmjs.com/package/commander>

##### 3、 yargs 模块

<https://www.npmjs.com/package/yargs>

##### 4、 [minimist](<https://github.com/substack/minimist>) 模块

<https://www.npmjs.com/package/minimist>

##### 5、模块对比

调用系统其他命令

##### 1、基础模块

可以通过 nodejs 的 child_process 模块，新建子进程执行其他命令
    
    
    #!/usr/bin/env node
    var name = process.argv[2];
    var exec = require('child_process').exec;
    ​
    var child = exec('echo hello ' + name, function(err, stdout, stderr) {
        if (err) throw err;
        console.log(stdout);
    });

##### 2、通用模块

如：安装 shelljs 模块
    
    
    #!/usr/bin/env node
    var name = process.argv[2];
    var shell = require("shelljs");
    ​
    shell.exec("echo hello " + name);

如：安装 execa 模块
    
    
    const execa = require('execa');
    ​
    (async () => {
        const {stdout} = await execa('echo', ['unicorns']);
        console.log(stdout);
        //=> 'unicorns'
    })();

模块对比：

3、特定模块

如: 安装 nodegit 模块
    
    
    var Git = require("nodegit");
    // Clone a given repository into the ./tmp folder.
    Git.Clone("https://github.com/nodegit/nodegit", "./tmp")
        // Look up this known commit.
        .then(function(repo) {
            // Use a known commit sha from this repository.
            return repo.getCommit("59b20b8d5c6ff8d09518454d4dd8b7b30f095ab5");
        })

#### 命令行交互

1、inquirer 包

美化控制台输出

1、chalk、colors 包

![](https://camo.githubusercontent.com/036b5e5ae84937a17ce0a1a424aeb6f7eb23863f/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6368616c6b2f616e73692d7374796c657340383236313639376339356266333462366337373637653263626539393431613835316435393338352f73637265656e73686f742e737667)

![](/images/wayback/nodejs-command-tool-development-introduce/b5549a5b9a7a.png)

2、ora 包、**cli-spinners** 包

3、blessed-contrib 包

<https://github.com/yaronn/blessed-contrib>

4、命令行字体 figlet
    
    
     _ __ ___    ___    __ _  _   _
    | '_  _ \  / _ \  / _ || | | |
    | | | | | || (_) || (_| || |_| |
    |_| |_| |_| \___/  \__, | \__,_|
                       |___/

#### 其他事项

##### 1、返回值

根据 Unix 传统，程序执行成功返回 0，否则返回 1 。
    
    
    if (err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
    
    
    process.exitCode = 1; 
    process.exit(); // 默认情况下 exitCode 是 0

扩展一

> process.exit 有回调方法
>     
>     
>     process.on('exit', (code) => {
>        // 同步方法 
>         console.log(About to exit with code: ${</span><span class="cm-variable-2">code</span><span class="cm-string-2">});
>     });

扩展二

一般情况下，不建议直接调用 process.exit() 方法，直接调用会导致异步方法中断。需要手动异常退出的话，可以设置 process.exitCode ，并抛出 uncaught error，让进程根据异常自动退出。

##### 2、重定向
    
    
    ps aux | grep 'node'

nodejs 中实现这种功能
    
    
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(data) {
        process.stdout.write(data);
    });

##### 3、系统信号

接受系统信号
    
    
    process.on('SIGINT', function () {
      console.log('Got a SIGINT');
      process.exit(0);
    });

发送系统信号
    
    
    kill -s SIGINT [process_id]

扩展

> 这些功能开发不太常用，运维会用到，看公司发布系统的脚本

#### 发布

命令行工具就是一个 npm 包，执行 npm publish 进行发布，npm i 安装后就可以使用。

### NODEJS 命令行工具应用举例

#### 1、主机管理

aws、google cloud、aliyun、qcloud 等都支持 oauth 2.0认证，可以命令行下做验证通过命令行管理服务。

#### 2、命令行爬虫

#### 3、自动提交表单

### 相关文章

  * #### [nginx 代理超时时间设置](<https://blog.tongdelove.com/nginx-proxy-timeout-setting/> "nginx 代理超时时间设置")
  * #### [next-route-visualizer 包介绍](<https://blog.tongdelove.com/next-route-visualizer-npm-package-introduce/> "next-route-visualizer 包介绍")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [批量替换 github 的 https 连接为 ssh 连接](<https://blog.tongdelove.com/change-github-https-link-style-to-ssh/> "批量替换 github 的 https 连接为 ssh 连接")
