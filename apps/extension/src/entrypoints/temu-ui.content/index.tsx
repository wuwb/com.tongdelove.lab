import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import type { ContentScriptContext } from "#imports"
import { App } from './App.tsx'
import "@/assets/tailwind.css"
const watchPattern = new MatchPattern('*://*.youtube.com/watch*')

export default defineContentScript({
  matches: [
    '*://agentseller.temu.com/*',
    '*://seller.kuajingmaihuo.com/*',
  ],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('temu content ui.')

    // ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
    //   if (watchPattern.includes(newUrl)) {
    //     mainWatch(ctx);
    //   }
    // });

    if (ctx.isValid) {
      // do something
      // document.body.style.backgroundColor = 'red';
      console.log('ctx isValid')
    }
    // OR
    if (ctx.isInvalid) {
      // do something
      console.log('ctx isInvalid')
    }

    await mainWatch(ctx)

    browser.runtime.onMessage.addListener((event) => {
      if (event.type === "MOUNT_UI") {
        // dynamic mount by user action via messaging.
        // ui.mount();
      }
    })
  },
})

async function mainWatch(ctx: ContentScriptContext) {
  console.log('=====================================')
  const ui = await createUi(ctx)
  ui.mount()
}

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: 'extension-app',
    position: 'inline',
    inheritStyles: true,
    anchor: 'body',
    append: "last",
    onMount: (container, shadow) => {
      // Container is a body, and React warns when creating a root on the body, so create a wrapper div
      const app = document.createElement('div')

      container.append(app)

      // app.style.fontSize = '16px';

      // Create a root on the UI container and render a component
      const root = ReactDOM.createRoot(app)

      root.render(
        <App />
      )
      return { root, app }
    },
    onRemove: (elements) => {
      // Unmount the root when the UI is removed
      elements?.root.unmount()
      elements?.app.remove()
    },
  })
}
