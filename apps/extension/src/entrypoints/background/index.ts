// import { sessionStartTime } from "@/utils/storage";
import 'webext-dynamic-content-scripts'

import { initJSInjectionInterceptor } from './initJSInjectionInterceptor'
// import addPermissionToggle from "webext-permission-toggle";
// import initWasm from "@vlcn.io/crsqlite-wasm"
// import wasmUrl from "@vlcn.io/crsqlite-wasm/crsqlite.wasm?url";

// https://wxt.dev/guide/essentials/entrypoints.html#entrypoint-types
export default defineBackground({
  // Executed when background is loaded, CANNOT BE ASYNC
  main() {
    console.log('Hello background!', { id: browser.runtime.id })

    // 激活的时候启动页面
    browser.runtime.onInstalled.addListener(async (ctx) => {
      console.log('ctx: ', ctx)

      // Open a tab on install
      if (ctx.reason === 'install') {
        console.log('Extension installed')

        await browser.tabs.create({
          active: true,
          url: browser.runtime.getURL('/get-started.html'),
        })

        return
      }

      // Open a tab on update
      if (ctx.reason === 'update') {
        console.log('Extension updated')
      }
    })

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === 'GET_PDF_WORKER_URL') {
        // 这里才真正能调到 chrome.runtime.getURL
        const url = chrome.runtime.getURL('/js/pdf.worker.min.js')
        sendResponse({ url })
      }
    })

    // (browser.action ?? browser.browserAction).onClicked.addListener(
    //   async (tab) => {
    //     console.log("browser action triggered,", tab);
    //     if (tab.id) {
    //       await browser.tabs.sendMessage(tab.id, { type: "MOUNT_UI" });
    //     }
    //   },
    // );

    // addPermissionToggle();

    // initSession();
    // initMessage();
    // initSqlite();

    // 启动拦截器
    initJSInjectionInterceptor()
  },
})

// const initSession = () => {
//    // Set a value in session storage, don't need to await it.
//    const startTime = Date.now();
//    void sessionStartTime.setValue(startTime);
//    console.log("Setting session start time:", new Date(startTime).toISOString());

//    // Set the access level so `browser.storage.session` is defined and availble
//    // in content scripts: https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas
//    void browser.storage.session.setAccessLevel?.({
//      accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
//    });
// }

// const initMessage = () => {
//     // Setup listener for one-time messages
//     browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       console.log('message: ', message, message.type);
//       // Only respond to hello messages
//       if (message.type === "hello") {
//         sendResponse(`Hello ${message.name}, this is the background!`)
//         return true
//       }
//       console.log('message: ', message, message.type);
//       throw Error("Unknown message");
//     });

//     // Setup broadcast channel to send messages to all connected ports
//     let ports: chrome.runtime.Port[] = [];

//     // setInterval(() => {
//     //   const message = { date: Date.now(), value: Math.random() };
//     //   console.log('post message: ', message)
//     //   ports.forEach((port) => port.postMessage(message));
//     // }, 1e3);

//     browser.runtime.onConnect.addListener((port) => {
//       ports.push(port);
//       port.onDisconnect.addListener(() => {
//         ports.splice(ports.indexOf(port), 1);
//       });
//     });
// }

// const initSqlite = () => {
//   // const initWasm = await import('https://esm.sh/@vlcn.io/crsqlite-wasm@0.14.0')
//   // const sqlite = await initWasm.default(() => 'https://esm.sh/@vlcn.io/crsqlite-wasm@0.14.0/dist/crsqlite.wasm')

//   const sqlite = await initWasm(() => wasmUrl);

//   const db = await sqlite.open("database.db");
//   await db.exec(
//     "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT)"
//   );

//   const stmt = await db.prepare(
//     "INSERT OR IGNORE INTO users (name) VALUES (?)"
//   );
//   await stmt.run(db, `John Do. Born at ${new Date().toTimeString()}`);

//   const users = await db.execA<[bigint, string]>("SELECT * FROM users");
//   console.log("Saved users", users);
// }
