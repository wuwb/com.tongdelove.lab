import MyWorker from "./worker?worker&inline";

export default defineContentScript({
  matches: ['*://baidu/*'],
  async main(ctx) {
    console.log("Creating web worker");
    const worker = new MyWorker();
    console.log("Created!");
  },
});
