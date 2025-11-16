import type { ContentScriptContext } from '#imports'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App.tsx'
import '@/assets/tailwind.css'

const watchPattern = new MatchPattern('*://*.youtube.com/watch*')

export default defineContentScript({
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
      if (event.type === 'MOUNT_UI') {
        // dynamic mount by user action via messaging.
        // ui.mount();
      }
    })
  },
  matches: [
    '*://agentseller.temu.com/*',
    '*://seller.kuajingmaihuo.com/*',
  ],
})

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    anchor: 'body',
    append: 'last',
    inheritStyles: true,
    name: 'extension-app',
    onMount: (container, shadow) => {
      // Container is a body, and React warns when creating a root on the body, so create a wrapper div
      const app = document.createElement('div')

      container.append(app)

      // app.style.fontSize = '16px';

      // Create a root on the UI container and render a component
      const root = ReactDOM.createRoot(app)

      root.render(
        <App />,
      )
      return { app, root }
    },
    onRemove: (elements) => {
      // Unmount the root when the UI is removed
      elements?.root.unmount()
      elements?.app.remove()
    },
    position: 'inline',
  })
}

async function mainWatch(ctx: ContentScriptContext) {
  console.log('=====================================')
  const ui = await createUi(ctx)
  ui.mount()
}
