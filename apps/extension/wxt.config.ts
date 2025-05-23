import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    // These permissions are required for "webext-dynamic-content-scripts" and
    // "webext-permission-toggle" to work.
    name: '半祥电商助手',
    permissions: [
      "management", // 自动重载插件
      "storage",
      "scripting",
      "activeTab",
      "contextMenus",
      "tabs",
      "cookies",
      "downloads",
      "webRequest",
      "webRequestBlocking",
      "*://*/",
    ],
    // @ts-ignore: Valid MV3 key for chrome
    optional_host_permissions: ["*://*.baidu.com/*"],
    content_security_policy: {
      extension_pages: "script-src 'self' 'unsafe-eval'; object-src 'self'",
    },
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ["*://*/*"],
      },
    ],
    // Required for webext-permission-toggle
    action: {
    },
    page_action: {
    },
    browser_action: {
      default_popup: "popup.html",
      default_icon: "icon.png" ,
      default_title: "佳同商品图片采集工具"
    },
    icons: {
      16: "icon.png",
      48: "icon-48.png",
      128: "icon-128.png"
    },
  },
  srcDir: 'src',
  hooks: {
    "build:manifestGenerated": (wxt, manifest) => {
      if (wxt.config.command === "serve") {
        // During development, content script is not listed in manifest, causing
        // "webext-dynamic-content-scripts" to throw an error. So we need to
        // add it manually.
        manifest.content_scripts ??= [];
        manifest.content_scripts.push({
          matches: ["*://*.1688.com/*"],
          js: ["content-scripts/1688.js"],
          css: ["content-scripts/1688.css"],
          // If the script has CSS, add it here.
        });
      }
    },
  },
  runner: {
    // const url = browser.runtime.getURL('/<name>.html');
    // console.log(url); // "chrome-extension://<id>/<name>.html"
    startUrls: ["https://wxt.dev"],
  },
  vite: () => ({
    plugins: [
      react(),
    ],
  }),
});
