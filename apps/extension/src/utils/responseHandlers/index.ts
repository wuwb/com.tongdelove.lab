import { handleTemuResponse } from './temuHandler'

export async function handleResponseData(data: any) {
  if (data.url.includes('.js') || data.url.includes('.css')) {
    return
  }
  // "https://seller.kuajingmaihuo.com/lollipop/gray/batchMatchBySupplierIdsWithMulGray"
  if (data.url.includes('seller.kuajingmaihuo.com')) {
    console.log('handleResponseData3')

    console.log('✅ [网络请求拦截器] 拦截到请求:', data.url)
    handleTemuResponse(data)
  }
}
