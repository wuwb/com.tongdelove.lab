import { injectScript } from '#imports'

export default defineContentScript({
  main: async () => {
    console.log('Injecting script...')

    injectScript('/injected.js', {
      keepInDom: true,
    })

    // const container = document.createElement('div');
    // document.body.append(container);

    // console.log("Done!");

    // const startTime = await sessionStartTime.getValue();
    // if (startTime == null) {
    //   console.log("No start time, reload tab");
    // } else {
    //   console.log("Session start time:", new Date(startTime).toISOString());
    // }
  },
  matches: ['*://*/*'],
  runAt: 'document_start',
})
