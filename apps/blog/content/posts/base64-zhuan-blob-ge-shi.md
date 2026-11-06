---
title: "Base64转Blob格式"
description: "将Base64转为Blob类型 parseFileType: function(basestr, type) …"
date: "2024-05-12"
tags: ["javascript"]
author: "WuWenbin"
---

* 将Base64转为Blob类型

    
    
    parseFileType: function(basestr, type) {
      var text = window.atob(basestr.split(',')[1]);
      var buffer = new Uint8Array(text.length);
      for (var i = 0; i < text.length; i++) {
        buffer[i] = text.charCodeAt(i);
      }
      var blob = self.getBlob([buffer], type);
      return blob;
    }
    

  * 获取Blob对象的兼容性写法

    
    
    getBlob: function(buffer, format) {
      try {
        return new Blob(buffer, {
          type: format
        });
      } catch (e) {
        var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        buffer.forEach(function(buf) {
          bb.append(buf);
        });
        return bb.getBlob(format);
      }
    }

获取到 blob 后可以做图片上传。

### 相关文章

  * #### [在 js 中使用 ts 的 module alias 功能](<https://blog.tongdelove.com/use-module-alias-function-in-js-like-typescript/> "在 js 中使用 ts 的 module alias 功能")
  * #### [next-route-visualizer 包介绍](<https://blog.tongdelove.com/next-route-visualizer-npm-package-introduce/> "next-route-visualizer 包介绍")
  * #### [position sticky 失效问题](<https://blog.tongdelove.com/position-sticky-failure/> "position sticky 失效问题")
  * #### [vue for 循环中使用 input 无法连续输入问题](<https://blog.tongdelove.com/vue-v-for-input-break/> "vue for 循环中使用 input 无法连续输入问题")
  * #### [vuejs 异步渲染问题](<https://blog.tongdelove.com/vuejs-%e5%bc%82%e6%ad%a5%e6%b8%b2%e6%9f%93%e9%97%ae%e9%a2%98/> "vuejs 异步渲染问题")
