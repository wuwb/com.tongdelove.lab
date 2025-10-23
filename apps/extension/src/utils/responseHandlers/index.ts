import { handleTemuResponse } from "./temuHandler";

export async function handleResponseData(data: any) {
  if (data.url.includes('.js') | data.url.includes('.css')) {
    return
  }
  
  if (data.url.includes("temu")) {
    console.log("✅ [网络请求拦截器] 拦截到请求:", data.url);
    handleTemuResponse(data);
  }
}
