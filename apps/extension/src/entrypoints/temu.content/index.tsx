// import MyWorker from "./worker?worker&inline";
// import { sessionStartTime } from "@/utils/storage";
import { createCustomPrint } from './print'
import { removeUnusedTip } from './utils/RemoveUnusedTip'
import { createMenu } from './menu'

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
    removeUnusedTip()
    createMenu()
  },
  matches: [
    '*://agentseller.temu.com/*',
    '*://seller.kuajingmaihuo.com/*',
  ],
  world: 'MAIN', // 'ISOLATED',
})
