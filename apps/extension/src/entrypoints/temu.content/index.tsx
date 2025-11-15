// import MyWorker from "./worker?worker&inline";
// import { sessionStartTime } from "@/utils/storage";
import { ContentScriptContext } from '#imports'
import { createCustomPrint } from './print'

export default defineContentScript({
  // // Set manifest options
  // matches: string[],
  // excludeMatches: undefined | [],
  // includeGlobs: undefined | [],
  // excludeGlobs: undefined | [],
  // allFrames: undefined | true | false,
  // runAt: undefined | 'document_start' | 'document_end' | 'document_idle',
  // matchAboutBlank: undefined | true | false,
  // matchOriginAsFallback: undefined | true | false,
  // world: undefined | 'ISOLATED' | 'MAIN',

  // // Set include/exclude if the background should be removed from some builds
  // include: undefined | string[],
  // exclude: undefined | string[],

  // // Configure how CSS is injected onto the page
  // cssInjectionMode: undefined | "manifest" | "manual" | "ui",

  // // Configure how/when content script will be registered
  // registration: undefined | "manifest" | "runtime",

  matches: [
    '*://agentseller.temu.com/*',
    '*://seller.kuajingmaihuo.com/*',
  ],
  world: 'MAIN', // 'ISOLATED',
  cssInjectionMode: 'ui',
  main: () => {
    // ctx.addEventListener(...);
    // ctx.setTimeout(...);
    // ctx.setInterval(...);
    // ctx.requestAnimationFrame(...)
    console.log('temu content')

    injectNetworkInterceptor()

    // console.log("Creating web worker");
    // const worker = new MyWorker();
    // console.log("Created!");

    // const startTime = await sessionStartTime.getValue();
    // if (startTime == null) {
    //   console.log("No start time, reload tab");
    // } else {
    //   console.log("Session start time:", new Date(startTime).toISOString());
    // }

    createCustomPrint()



    function removeShippingWarning() {
      // 查找匹配的 div 元素
      const targetDivs = document.querySelectorAll('div[style="flex: 1 1 auto; width: 100%;"] > div > span.shipping-list_opacityBg__-Y0I-');

      targetDivs.forEach(span => {
        // 检查 span 内容是否包含关键文本
        if (span.textContent.includes('请勾选发货单后点击发货，否则仓库无法收货')) {
          // 删除整个 span 所在的 div 结构
          const parentDiv = span.closest('div[style="flex: 1 1 auto; width: 100%;"]');
          if (parentDiv) {
            parentDiv.remove();
          }
        }
      });
    }

    // 页面加载完成后执行
    window.addEventListener('load', removeShippingWarning);

    // 可选：监听 DOM 变化，防止动态加载的内容未被处理
    const observer = new MutationObserver(() => {
      removeShippingWarning();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  },
})
