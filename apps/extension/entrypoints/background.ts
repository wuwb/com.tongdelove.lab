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

  addPermissionToggle();
});
