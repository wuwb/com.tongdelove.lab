---
title: "手机浏览器直接唤起微信方案调研"
description: "背景 双十二前一天半夜，正准备睡觉，公司运营打电话过来，说发现第三方公司有页面可以访问直接唤起微信。说完在公司 …"
date: "2024-05-12"
tags: ["京东", "公众号", "分享", "反编译", "唤起", "开发", "开放平台", "微信", "手Q", "漏洞", "跳转", "运营"]
author: "WuWenbin"
---

**文章目录**[隐藏]

  * 背景
  * 分析
  * 后续
  * 尾声

#### 背景

双十二前一天半夜，正准备睡觉，公司运营打电话过来，说发现第三方公司有页面可以访问直接唤起微信。说完在公司的聊天工具里发来一段连接，叫我调研一下能不能实现，如果能实现，双十二马上可以用起来。

> 【梦梦家】双12倒计时啦！来就送10元券，http://t.cn/RTqAzl8 领10元券戳 回N退订。没有自己的流量池 就落后挨打 人家在第一时间已经用了 就等你来找我了，微信引流黑科技

#### 分析

连接是个微博短链： <http://t.cn/RTqAzl8。放浏览器里访问，解析出完整的地址>：  
<http://r.jpwx.kim/wb/0e7d51958ac79557b5ecafc582ab62d0.html。打开调试器看了下，页面中除了百度统计代码外，核心代码如下>：

`  
if(!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && / baiduboxapp/i.test(navigator.userAgent)){  
window.location.replace('bdbox://utils?action=sendIntent&minver=7.4&params=%7B%22intent%22%3A%22weixin%3A%2F%2Fdl%2Fbusiness%2F%3Fticket%3Dt59a2235a3662135bfb0e8f7edccc22c5%23wechat_redirect%23wechat_redirect%23Intent%3Bend%22%7D');  
}else{  
window.location.replace('weixin://dl/business/?ticket=t59a2235a3662135bfb0e8f7edccc22c5#wechat_redirect#wechat_redirect');  
}  
setTimeout(function(){document.getElementById("loading").style.display="none";},3000);  
`  
代码的逻辑是，判断不是苹果的设备，并且访问 UA 中包含 baiduboxapp 字符，修改页面连接为  
`bdbox://utils?action=sendIntent&minver=7.4&params=%7B%22intent%22%3A%22weixin%3A%2F%2Fdl%2Fbusiness%2F%3Fticket%3Dt59a2235a3662135bfb0e8f7edccc22c5%23wechat_redirect%23wechat_redirect%23Intent%3Bend%22%7D`，  
否则修改页面连接为  
`weixin://dl/business/?ticket=t59a2235a3662135bfb0e8f7edccc22c5#wechat_redirect#wechat_redirect`。  
因为研究微信唤起，先不看 baiduboxapp，直接看微信唤起短链 weixin://dl/business，谷歌搜索下发现是微信第三方公众号临时会话接口。这是一个内部的隐藏接口。链接中看到短链有个 ticket 参数，多刷新几次页面，ticket 参数会发生变化，但是唤起页面的连接没有变。现在关键点成了怎么根据自己的页面生成合法的 ticket 参数。  
在想怎么生成 ticket 的时候，自然会想到微信是如何解析这个参数的，看看能不能从解析的逻辑中反推出生成的逻辑。  
找了客户端的同事，反编译安卓微信客户端，发现客户端里的逻辑很简单，拿到短链后，直接传递给微信服务器，服务器就返回了 真实的地址  
[https://open.weixin.qq.com/sns/webview?url=http%3A%2F%2Fun.m.jd.com%2Fcgi-bin%2Fapp%2Fappjmp%3Fto%3Dp.imtt.qq.com%252fh%253fd%253d7%2526b%253dtrade%2526type%253dsite%2526id%253d4061%2526u%253d%252568%252574%252574%252570%25253a%25252f%25252fvip.3.js.cn%252Fyyzs87.php%253Fticket%253D6148523063446f764c3364344c6d707764336775636d566b4c3364344c7a426c4e3251314d546b314f47466a4e7a6b314e5464694e57566a59575a6a4e546779595749324d6d51774c6d68306257772f644430784e54457a4d4451334d7a4d7a%2526from%253dshare%2526bid%253d13276%2526pid%253d1226104-1438221658%2526_wv%253d1027%2526sid%253dfavewofji%2526type%253d3%2526rnd%253d0.8738031948450953&appid=wxae3e8056daea8727&ts=1513047962&nonce=rjWsn6jYHv&sig=1c3d50cc9b948b2736398e1c1c66c32a&key=ad88abc27c4d295460ca3b05b7ed7a9a723ec81fbdb1e45386946920883a470f9b6e90cd75da4f05b8394a798f4b9446e673410a32c660224c93802cc47f427aa043de1c15cde5463ce4ad0ee5fecdd0&uin=MzY5MDEwNDExNQ%3D%3D&scene=0&version=26050839&pass_ticket=hKkz2FEs91MHFXEbW0vcmXwsfnKdDGqmvpQ1GG0cIYlqNFr5OcrssuH8DwD%2FSFmW](<https://open.weixin.qq.com/sns/webview?url=http%3A%2F%2Fun.m.jd.com%2Fcgi-bin%2Fapp%2Fappjmp%3Fto%3Dp.imtt.qq.com%252fh%253fd%253d7%2526b%253dtrade%2526type%253dsite%2526id%253d4061%2526u%253d%252568%252574%252574%252570%25253a%25252f%25252fvip.3.js.cn%252Fyyzs87.php%253Fticket%253D6148523063446f764c3364344c6d707764336775636d566b4c3364344c7a426c4e3251314d546b314f47466a4e7a6b314e5464694e57566a59575a6a4e546779595749324d6d51774c6d68306257772f644430784e54457a4d4451334d7a4d7a%2526from%253dshare%2526bid%253d13276%2526pid%253d1226104-1438221658%2526_wv%253d1027%2526sid%253dfavewofji%2526type%253d3%2526rnd%253d0.8738031948450953&appid=wxae3e8056daea8727&ts=1513047962&nonce=rjWsn6jYHv&sig=1c3d50cc9b948b2736398e1c1c66c32a&key=ad88abc27c4d295460ca3b05b7ed7a9a723ec81fbdb1e45386946920883a470f9b6e90cd75da4f05b8394a798f4b9446e673410a32c660224c93802cc47f427aa043de1c15cde5463ce4ad0ee5fecdd0&uin=MzY5MDEwNDExNQ%3D%3D&scene=0&version=26050839&pass_ticket=hKkz2FEs91MHFXEbW0vcmXwsfnKdDGqmvpQ1GG0cIYlqNFr5OcrssuH8DwD%2FSFmW>)  
后面就是微信内置 webview 浏览器访问这个地址，解析出最后的落地页 <http://uatv2.tcwx.i-mybest.com/qrimg/mmj2.html>。  
解析路基全在服务端，也没能分析出什么。看下解析出来的连接有什么可以分析的。从 <https://open.weixin.qq.com/sns/webview***到> <http://uatv2.tcwx.i-mybest.com/qrimg/mmj2.html中间调整了好几次>。  
<http://t.cn/RTqAzl8> -> 微博短链  
<http://r.jpwx.kim/wb/0e7d51958ac79557b5ecafc582ab62d0.html> -> 生成长连接  
weixin://dl/business/?ticket=***- > 可以通过京东开放平台手 Q 唤起接口生成, <http://jos.jd.com/api/list.htm?id=203>  
<https://open.weixin.qq.com/sns/webview?url>=*** -> 微信的域名，微信开发平台，微信服务端生成  
<http://un.m.jd.com/cgi-bin/app/appjmp?to>=***- > 京东的域名,QQ 域名跳转漏洞  
<http://p.imtt.qq.com/h?u>=*** -> QQ 的域名 QQ任意跳转漏洞，15年纰漏，实际上13年就已经存在的漏洞，低风险，至今没有修复。。  
<http://vip.3.js.cn/yyzs87.php>?* **- > 第三教室 老版本织梦 CMS 系统漏洞？  
<http://wx.jpwx.red/wx/>**** -> 无法访问，开了域名WHOIS隐私服务，看不到信息，需要拿扫描器扫下看里面可能有什么，不过到前面一步，后面的已经不重要了  
<http://uatv2.tcwx.i-mybest.com> -> 广州麦优网络科技有限公司 漏洞 艾客，广州壹豆网络科技有限公司，微信社群营销实效解决方案提供商  
好了，这样整个流程都通了。  
自己拼一个连接测试一下，通过京东的连接跳转到百度：<http://un.m.jd.com/cgi-bin/app/appjmp?to=p.imtt.qq.com%2Fh%3Fd%3D7%26b%3Dtrade%26type%3Dsite%26id%3D4061%26u%3Dhttp%3A%2F%2Fwww.baidu.com>  
现在关键问题是京东开发平台生成 weixin://dl/business/?ticket= 连接的时候有个白名单机制，尝试了几种连接，都无法通过白名单验证。  
找了一个京东云服务平台的咨询，得到的答复是唤起微信的接口，现在被人恶意调用，存在很大的安全风险，京东内部已经建立了白名单和黑名单的机制，打击恶意调用行为，不接受也不会透露白名单。

#### 后续

前面搜索相关内容的时候还查到 51万年历，陌陌，招商银行都有生成 weixin://dl/business/?ticket= 连接的服务。想到既然京东的接口是 手Q 给的，那 手Q 自己必然也有接口权限，并且应该会有其他类似京东的合作客户会有权限，像前面几家公司。  
后面运营又给了几个连接，解析出来的地址是 <http://app.game.qq.com> 域名下的，确认了前面的猜想。

#### 尾声

看前面的分析很明显看出这都是灰色产业的一部分。在和网友交流问题的过程中，也收到好多 QQ，邮件等信息，出卖直接唤起微信的服务。报价从 700元到1000元，保持一个连接唤起一个月时间。灰产果然暴力。  
作为一个五好公民，我就不趟这个浑水啦。  
以上分析仅供学习交流，请勿用于非法用途，否则后果自负。

### 相关文章

  * #### [分享一个精简版Win10镜像](<https://blog.tongdelove.com/%e5%88%86%e4%ba%ab%e4%b8%80%e4%b8%aa%e7%b2%be%e7%ae%80%e7%89%88win10%e9%95%9c%e5%83%8f/> "分享一个精简版Win10镜像")
  * #### [NODEJS 命令行工具开发简介](<https://blog.tongdelove.com/nodejs-command-tool-development-introduce/> "NODEJS 命令行工具开发简介")
  * #### [IE6/7中绝对定位元素相邻元素的margin-top失效](<https://blog.tongdelove.com/ie6-7%e4%b8%ad%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d%e5%85%83%e7%b4%a0%e7%9b%b8%e9%82%bb%e5%85%83%e7%b4%a0%e7%9a%84margin-top%e5%a4%b1%e6%95%88/> "IE6/7中绝对定位元素相邻元素的margin-top失效")
  * #### [html 的nofollow 标签介绍](<https://blog.tongdelove.com/nofollow-tags-for-seo/> "html 的nofollow 标签介绍")
  * #### [hexo, A fast, simple & powerful blog framework, powered by Node.js.](<https://blog.tongdelove.com/hexo-a-fast-simple-powerful-blog-framework-powered-by-node-js/> "hexo, A fast, simple & powerful blog framework, powered by Node.js.")
