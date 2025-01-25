import MyWorker from "./worker?worker&inline";
import { sessionStartTime } from "@/utils/storage";

export default defineContentScript({
  matches: ['*://baidu/*'],
  async main(ctx) {
    console.log("Creating web worker");
    const worker = new MyWorker();
    console.log("Created!");


    const startTime = await sessionStartTime.getValue();
    if (startTime == null) {
      console.log("No start time, reload tab");
    } else {
      console.log("Session start time:", new Date(startTime).toISOString());
    }

  },
});
