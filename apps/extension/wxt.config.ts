import { defineConfig } from 'wxt'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  vite: () => {
    return {
      css: {
        devSourcemap: false,
      },
      build: {
        sourcemap: false,
      },
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: false,
        }),
        tailwindcss(),
      ],
    }
  },
  dev: {
    server: {
      port: 3000,
    },
  },
  entrypointsDir: 'entrypoints',
  // imports: true,
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      manifest.content_scripts ??= []
      manifest.content_scripts.push({
        // Build extension once to see where your CSS get's written to
        css: ['content-scripts/temu-admin.css'],
        matches: ['*://agentseller.temu.com/*', '*://seller.kuajingmaihuo.com/*'],
      })

      //   if (wxt.config.command === "serve") {
      //     // During development, content script is not listed in manifest, causing
      //     // "webext-dynamic-content-scripts" to throw an error. So we need to
      //     // add it manually.
      //     manifest.content_scripts ??= [];
      //     manifest.content_scripts.push({
      //       matches: ["*://*.1688.com/*"],
      //       js: ["content-scripts/1688.js"],
      //       css: ["content-scripts/1688.css"],
      //       // If the script has CSS, add it here.
      //     });
      //   }
      if (wxt.config.mode === 'development') {
        manifest.name += ' (DEV)'
      }
    },
  },
  manifest: ({ browser, command, manifestVersion, mode }) => {
    const isDev = mode === 'development'

    console.log(`\nIs development mode: ${isDev}\n`)

    return {
      // These permissions are required for "webext-dynamic-content-scripts" and
      // "webext-permission-toggle" to work.
      // Required for webext-permission-toggle
      action: {},
      // page_action: {
      // },
      // browser_action: {
      //   default_popup: "popup.html",
      //   default_icon: "icon.png" ,
      //   default_title: "佳同商品图片采集工具"
      // },
      content_scripts: [],
      default_locale: 'en',
      description: '__MSG_extension_description__', // or will use package.json's description.
      host_permissions: ['*://*/*', '<all_urls>'],
      icons: {
        16: '/icons/16.png',
        32: '/icons/32.png',
        48: '/icons/48.png',
        96: '/icons/96.png',
        128: '/icons/128.png',
      },
      name: '__MSG_extension_name__', // or will use package.json's name.
      // @ts-expect-error: Valid MV3 key for chrome
      // Optional permission '*://*/*' is redundant with the required permissions;this permission will be omitted.
      optional_host_permissions: [],
      optional_permissions: [],
      permissions: [
        // "webRequestBlocking", // manifest v2 only

        'management', // 自动重载插件
        'storage',
        'scripting',
        'webRequest',
        'activeTab',
        'alarms',
        'background',
        'bookmarks',
        'browsingData',
        'clipboardRead',
        'clipboardWrite',
        'contentSettings',
        'contextMenus',
        'cookies',
        'debugger',
        'declarativeContent',
        'declarativeNetRequest',
        'declarativeNetRequestFeedback',
        'desktopCapture',
        'downloads',
        'fontSettings',
        'gcm',
        'geolocation',
        'history',
        'identity',
        'idle',
        'management',
        'nativeMessaging',
        'notifications',
        'pageCapture',
        'power',
        'printerProvider',
        'privacy',
        'proxy',
        'scripting',
        'search',
        'sessions',
        'system.cpu',
        'system.display',
        'system.memory',
        'system.storage',
        'tabCapture',
        'tabGroups',
        'tabs',
        'topSites',
        'tts',
        'ttsEngine',
        'unlimitedStorage',
        'webNavigation',
      ],
      // version: '__MSG_extension_version__', // or will use package.json's version.
      // version_name: '1.3.0-alpha2',
      // content_security_policy: {
      //   extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self' 'wasm-unsafe-eval'; worker-src 'self' 'wasm-unsafe-eval';",
      //   sandbox: "sandbox allow-scripts allow-forms allow-popups allow-modals; script-src 'self' 'unsafe-inline' 'unsafe-eval'; child-src 'self'; script-src-elem 'self' https://maps.googleapis.com"
      // },
      web_accessible_resources: [
        {
          matches: ['*://*/*'],
          resources: ['injected.js', '/js/pdf.worker.min.js', 'temu-admin.css'],
        },
      ],
    }
  },
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons', '@wxt-dev/i18n/module'],
  modulesDir: 'modules',
  outDir: '.output',
  publicDir: 'public',
  srcDir: 'src',
  webExt: {
    disabled: true,
    // const url = browser.runtime.getURL('/<name>.html');
    // console.log(url); // "chrome-extension://<id>/<name>.html"
    startUrls: ['https://wxt.dev', 'https://google.com'],
  },
})
