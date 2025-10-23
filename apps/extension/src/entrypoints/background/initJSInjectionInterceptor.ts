    /**
     * @name 初始化JS注入拦截器
     * @description 使用chrome.scripting.executeScript API注入JavaScript代码来拦截第三方网站的网络请求
     */
    export function initJSInjectionInterceptor() {
      browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        // 只在页面完全加载后处理，且排除特殊页面和协议
        if (changeInfo.status === 'complete' && tab.url && isJSInjectionValidUrl(tab.url)) {
          console.log("🎯 插件注入JS代码")
          // try {
          //   // 使用chrome.scripting.executeScript注入拦截代码
          //   const res = await browser.scripting.executeScript({
          //     target: { 
          //       tabId,
          //     },
          //     func: injectNetworkInterceptor,
          //     world: 'MAIN' // 在主页面上下文中执行，可以访问页面的全局变量
          //   })
          //   console.log(res);
          // } catch (error) {
          //   console.error('❌ 注入拦截代码失败:', error)
          // }
        }
      })
    }
