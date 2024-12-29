import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    // These permissions are required for "webext-dynamic-content-scripts" and
    // "webext-permission-toggle" to work.
    permissions: ["storage", "scripting", "activeTab", "contextMenus", 'tabs'],

    // @ts-ignore: Valid MV3 key for chrome
    optional_host_permissions: ["*://*.baidu.com/*"],
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ["*://*.baidu.com/*"],
      },
    ],
    // Required for webext-permission-toggle
    action: {
    },
    page_action: {},
  },
 

  hooks: {
    "build:manifestGenerated": (wxt, manifest) => {
      if (wxt.config.command === "serve") {
        // During development, content script is not listed in manifest, causing
        // "webext-dynamic-content-scripts" to throw an error. So we need to
        // add it manually.
        manifest.content_scripts ??= [];
        manifest.content_scripts.push({
          matches: ["*://*.wxt.dev/*"],
          js: ["content-scripts/content.js"],
          // If the script has CSS, add it here.
        });
      }
    },
  },

  runner: {
    startUrls: ["https://wxt.dev"],
  },
});
