import ReactDOM from 'react-dom/client';
import type { ContentScriptContext } from "wxt/client";
import App from './App.tsx';
import "~/assets/tailwind.css";

export default defineContentScript({
  matches: ['*://*.1688.com/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('Hello content.');

    if (ctx.isValid) {
      // do something
      // document.body.style.backgroundColor = 'red';
     
    }
    // OR
    if (ctx.isInvalid) {
      // do something
    }

    const ui = await createUi(ctx)

    // 4. Mount the UI
    ui.mount();

    browser.runtime.onMessage.addListener((event) => {
      if (event.type === "MOUNT_UI") {
        // dynamic mount by user action via messaging.
        // ui.mount();
      }
    });
  },
});

function createUi(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: 'extension-app',
    position: 'inline',
    anchor: 'body',
    append: "last",
    onMount: (container) => {
      // Container is a body, and React warns when creating a root on the body, so create a wrapper div
      const app = document.createElement('div');
      container.append(app);

      // Create a root on the UI container and render a component
      const root = ReactDOM.createRoot(app);
      root.render(<App />);
      return { root, app };
    },
    onRemove: (elements) => {
      // Unmount the root when the UI is removed
      elements?.root.unmount();
      elements?.app.remove();
    },
  });
}
