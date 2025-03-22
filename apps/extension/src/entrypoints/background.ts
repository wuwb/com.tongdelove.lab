import { sessionStartTime } from "@/utils/storage";
import "webext-dynamic-content-scripts";
import addPermissionToggle from "webext-permission-toggle";

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });


  // 激活的时候启动页面
  // browser.runtime.onInstalled.addListener(async ({ reason }) => {
  //   if (reason !== "install") return;

  //   // Open a tab on install
  //   await browser.tabs.create({
  //     url: browser.runtime.getURL("/get-started.html"),
  //     active: true,
  //   });
  // });

  (browser.action ?? browser.browserAction).onClicked.addListener(
    async (tab) => {
      console.log("browser action triggered,", tab);
      if (tab.id) {
        await browser.tabs.sendMessage(tab.id, { type: "MOUNT_UI" });
      }
    },
  );

  addPermissionToggle();


  initSession();
  initMessage();
});

const initSession = () => {
   // Set a value in session storage, don't need to await it.
   const startTime = Date.now();
   void sessionStartTime.setValue(startTime);
   console.log("Setting session start time:", new Date(startTime).toISOString());
 
   // Set the access level so `browser.storage.session` is defined and availble
   // in content scripts: https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas
   // @ts-expect-error: setAccessLevel not typed
   void browser.storage.session.setAccessLevel?.({
     accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
   });
}

const initMessage = () => {
    // Setup listener for one-time messages
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('message: ', message, message.type);
      // Only respond to hello messages
      if (message.type === "hello") {
        sendResponse(`Hello ${message.name}, this is the background!`)
        return true
      }
      console.log('message: ', message, message.type);
      throw Error("Unknown message");
    });
  
    // Setup broadcast channel to send messages to all connected ports
    let ports: chrome.runtime.Port[] = [];
    
    // setInterval(() => {
    //   const message = { date: Date.now(), value: Math.random() };
    //   console.log('post message: ', message)
    //   ports.forEach((port) => port.postMessage(message));
    // }, 1e3);

    browser.runtime.onConnect.addListener((port) => {
      ports.push(port);
      port.onDisconnect.addListener(() => {
        ports.splice(ports.indexOf(port), 1);
      });
    });
}
