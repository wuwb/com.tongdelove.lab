---
title: "Flywheel Local 命令行工具"
description: "在众人的呼吁下，官方出了个 local-cli 命令行工具，只提供了三个命令，查询网站列表，启动网站，停止网站 …"
date: "2024-05-12"
tags: ["graphql", "wordpress", "命令行"]
author: "WuWenbin"
---

**文章目录**[隐藏]

  * 参考

在众人的呼吁下，官方出了个 local-cli 命令行工具，只提供了三个命令，查询网站列表，启动网站，停止网站。

这些功能得益于新版 Local 程序中提供的 GraphQL API。

工具很简单，从 ~/Library/Application\ Support/Local/graphql-connection-info.json 文件中读取 graphql 链接参数。这里用了untildify 包格式化 json 配置文件。

之后就是调用 graphql 请求执行命令。
    
    
    const query = gql`{
          sites {
              id
              name
              status
          }
    }`
    

## 参考

https://github.com/getflywheel/local-cli

https://www.npmjs.com/package/@getflywheel/local-cli

https://localwp.canny.io/feature-requests/p/local-cli

https://community.localwp.com/t/start-site-through-command-line/1534

### 相关文章

  * #### [用 bare rope 管理 dotfiles](<https://blog.tongdelove.com/use-bare-rope-to-manage-dotfiles/> "用 bare rope 管理 dotfiles")
  * #### [wordpress 不建议给has_cap传入一个参数问题修复](<https://blog.tongdelove.com/wordpress-has_cap-params-problem-fix/> "wordpress 不建议给has_cap传入一个参数问题修复")
  * #### [[翻译] wordpress reference/hooks/login_title](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_title/> "\[翻译\] wordpress reference/hooks/login_title")
  * #### [[翻译] wordpress reference/hooks/login_link_separator](<https://blog.tongdelove.com/translate-wordpress-reference-hooks-login_link_separator/> "\[翻译\] wordpress reference/hooks/login_link_separator")
  * #### [](<https://blog.tongdelove.com/opkg-install-net-tools/>)
