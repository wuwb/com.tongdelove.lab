---
title: "小米电视去广告"
description: "ADB 停用应用 1、打开开发模式 小米电视设置 – 关于 – 产品型号 – …"
date: "2024-01-04"
tags: ["android", "life", "tv", "xiaomi", "去广告", "小米", "电视"]
author: "WuWenbin"
---

**文章目录**[隐藏]

  * ADB 停用应用
  * 下面是功能对照表
    * 建议清除
    * 不建议清除

## ADB 停用应用

1、打开开发模式

  * 小米电视设置 – 关于 – 产品型号 – 点确定键
  * 小米电视设置 – 账号及安全 – 打开 ADB 调试
  * 小米电视设置 – 无线/有线 – 选择你已经连接的网络 – IPV4地址就是你电视的IP

2、连接电视

  * **adb connect** 192.168.2.10:5555

3、停用命令
    
    
    adb shell pm uninstall --user 0 com.pptv.tvsports.preinstall

## 下面是功能对照表

### 建议清除
    
    
    adb shell pm uninstall --user 0 com.xm.webcontent # 电视活动中心
    adb shell pm uninstall --user 0 com.sogou.speech.offlineservice # 搜狗离线语音识别引擎
    adb shell pm uninstall --user 0 com.xiaomi.tweather # 天气
    adb shell pm uninstall --user 0 com.xiaomi.mimusic2 # 本地音乐播放器
    adb shell pm uninstall --user 0 com.mitv.videoplayer # 小米TV播放器
    adb shell pm uninstall --user 0 com.android.providers.downloads # 下载管理程序
    adb shell pm uninstall --user 0 com.xiaomi.mitv.handbook # 用户手册
    adb shell pm uninstall --user 0 com.android.certinstaller # 证书安装
    adb shell pm uninstall --user 0 com.android.captiveportallogin # wifi认证
    adb shell pm uninstall --user 0 com.mitv.appstore.component.land # 应用商店内容land
    adb shell pm uninstall --user 0 com.xiaomi.mitv.tvmanager # 电视管家
    adb shell pm uninstall --user 0 com.mitv.alarmcenter # 定时提醒
    adb shell pm uninstall --user 0 com.xiaomi.mitv.calendar # 日历
    adb shell pm uninstall --user 0 com.mitv.gallery # 相册
    adb shell pm uninstall --user 0 com.xiaomi.gamecenter.sdk.service.mibox # 小米服务安全插件
    adb shell pm uninstall --user 0 com.mitv.care # adcare
    adb shell pm uninstall --user 0 com.xiaomi.mitv.karaoke.service # 卡拉OK服务
    adb shell pm uninstall --user 0 com.xiaomi.miplay # MIOTHOST
    adb shell pm uninstall --user 0 com.xiaomi.mibox.gamecenter # 游戏中心
    adb shell pm uninstall --user 0 com.xiaomi.mitv.upgrade # 系统更新
    adb shell pm uninstall --user 0 com.xiaomi.account # 小米帐号
    adb shell pm uninstall --user 0 com.droidlogic # droidlogic系统
    adb shell pm uninstall --user 0 com.xiaomi.mitv.payment # 小米支付
    adb shell pm uninstall --user 0 com.xiaomi.mitv.pay # 电视支付
    adb shell pm uninstall --user 0 com.xiaomi.tv.appupgrade # 应用更新
    adb shell pm uninstall --user 0 com.android.vpndialogs # VPN
    adb shell pm uninstall --user 0 com.xiaomi.mitv.tvpush.tvpushservice # 电视推送
    adb shell pm uninstall --user 0 com.xiaomi.account.auth # 小米帐号授权
    adb shell pm uninstall --user 0 com.xiaomi.statistic # 统计
    adb shell pm uninstall --user 0 com.mipay.wallet.tv # 小米钱包
    adb shell pm uninstall --user 0 com.xiaomi.smarthome.tv # 米家
    adb shell pm uninstall --user 0 com.xiaomi.mitv.appstore # 应用商店
    adb shell pm uninstall --user 0 com.miui.tv.analytics # 分析
    adb shell pm uninstall --user 0 com.xiaomi.mitv.shop # 小米商城
    adb shell pm uninstall --user 0 com.xiaomi.devicereport # 设备报告
    adb shell pm uninstall --user 0 com.xiaomi.mibox.lockscreen # 锁屏
    adb shell pm uninstall --user 0 com.mi.umi # 小米音响服务
    adb shell pm uninstall --user 0 com.mi.umifrontend # 音响前端
    adb shell pm uninstall --user 0 com.android.proxyhandler # 代理
    adb shell pm uninstall --user 0 com.xiaomi.mitv.advertise # 广告应用
    adb shell pm uninstall --user 0 com.android.location.fused # 一体化位置信息
    adb shell pm uninstall --user 0 com.xiaomi.screenrecorder # 录屏
    adb shell pm uninstall --user 0 com.miui.systemAdSolution # 去除开机广告
    adb shell pm uninstall --user 0 com.xiaomi.tv.gallery # 时尚画报
    adb shell pm uninstall --user 0 com.duokan.videodaily # 今日头屏
    adb shell pm uninstall --user 0 com.pptv.tvsports.preinstall
    adb shell pm uninstall --user 0 com.pplive.atv

### 不建议清除
    
    
    adb shell pm uninstall --user 0 com.mitv.screensaver # 智能屏保
    adb shell pm uninstall --user 0 com.android.packageinstaller # 软件包安装程序
    adb shell pm uninstall --user 0 com.sohu.inputmethod.sogou.tv # 搜狗输入法
    adb shell pm uninstall --user 0 com.mitv.mivideoplayer # 小米电视播放器
    adb shell pm uninstall --user 0 com.pacprocessor # pacprocessor
    adb shell pm uninstall --user 0 com.xiaomi.mitv.mediaexplorer # 高清播放器
    adb shell pm uninstall --user 0 com.android.bluetooth # 蓝牙共享
    adb shell pm uninstall --user 0 com.xiaomi.mitv.tvplayer # 模拟电视
    adb shell pm uninstall --user 0 com.xiaomi.upnp # upnp
    adb shell pm uninstall --user 0 com.xiaomi.mitv.smartshare # 无线投屏
    adb shell pm uninstall --user 0 com.xiaomi.milink.udt # 米联
    adb shell pm uninstall --user 0 com.mi.miplay.mitvupnpsink # upnpapp
    adb shell pm uninstall --user 0 com.xiaomi.dlnatvservice # DLNA连接
    adb shell pm uninstall --user 0 com.xiaomi.mitv.assistant.manual # 投屏神器
    adb shell pm uninstall --user 0 com.duokan.airkan.tvbox # milink服务
    adb shell pm uninstall --user 0 com.android.statementservice # AppLinks功能
    adb shell pm uninstall --user 0 com.mitv.tvhome # 桌面
    adb shell pm uninstall --user 0 mitv.service # 无说明未测试
    adb shell pm uninstall --user 0 com.xiaomi.mitv.service # 无说明未测试

更新时间：2021-02-15

### 相关文章

  * #### [科学合理地增肥](<https://blog.tongdelove.com/healthy-and-scientific-method-to-put-on-weight/> "科学合理地增肥")
  * #### [小米手机 adb 调试无法识别问题解决](<https://blog.tongdelove.com/xiaomi-phone-adb-debug-can-not-recognition-problem-fix/> "小米手机 adb 调试无法识别问题解决")
  * #### [Moto defy Mac 上无法连接 adb 问题](<https://blog.tongdelove.com/moto-defy-mac-%e4%b8%8a%e6%97%a0%e6%b3%95%e8%bf%9e%e6%8e%a5-adb-%e9%97%ae%e9%a2%98/> "Moto defy Mac 上无法连接 adb 问题")
  * #### [临摹 javascript web 富应用开发书封面上的猫头鹰](<https://blog.tongdelove.com/%e4%b8%b4%e6%91%b9-javascript-web-%e5%af%8c%e5%ba%94%e7%94%a8%e5%bc%80%e5%8f%91%e4%b9%a6%e5%b0%81%e9%9d%a2%e4%b8%8a%e7%9a%84%e7%8c%ab%e5%a4%b4%e9%b9%b0/> "临摹 javascript web 富应用开发书封面上的猫头鹰")
