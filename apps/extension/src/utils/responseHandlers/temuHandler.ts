// /bg/quick/api/merchant/msgBox/unreadMsgDetail
// /bg/detroit/api/infoTicket/searchTicket  信息票数量接口

// /visage-agent-seller/product/origin/todo/pageQuery
// /visage-agent-seller/product/notAllEu/pageQuery
// /visage-agent-seller/product/skc/countStatus
// /visage-agent-seller/product/statisticsData
// /visage-agent-seller/product/prop/adjust/task/count
// /visage-agent-seller/product/prop/adjust/task/pageQuery
// /visage-agent-seller/product/skc/pageQuery ok

// /lich-mms/product/sku/accessories/toFill/stat
// /lich-mms/product/sku/packing/quality/opt/task/pageQuery
// /lich-mms/product/sku/packingOptTask/pageQuery
// /lich-mms/audit/edit/task/product/pageQuery
// /lich-mms/product/sku/accessories/pg/toFill/stat
// /lich-mms/product/guideFile/todoTotal
// /lich-mms/product/sku/classification/adjust/stat

// /api/kiana/mms/gmp/bg/magneto/api/privilege/query-privilege-count
// /api/kiana/gamblers/marketing/coupon/queryInvitationGoodsCouponCount
// /api/seller/auth/userInfo ok

// /agora/conv/needReplyCount
// /bg-luna-mms/goods/quality/optimize/order/wait/optimize/count

import { useShoppingListStore } from '@/stores/useShoppingListStore'
import { dataForwarder } from '../services/data-forwarder'

export function handleTemuResponse(data: any) {
  const url = data.url
  const body = data.responseBody
  const success = body.success
  const result = body.result

  dataForwarder
    .send({
      url: url,
      method: data.method,
      requestId: data.requestId || body.requestId,
      requestHeaders: data.requestHeaders,
      requestBody: data.requestBody,
      responseStatus: data.responseStatus,
      responseText: data.responseText,
      responseHeaders: data.responseHeaders,
      responseBody: body,
      capturedAt: new Date(),
      requestType: data.type,
    })
    .catch((err) => {
      console.error('❌ 数据转发失败:', err)
    })

  if (!success) {
    return
  }

  if (url.includes('/api/seller/auth/userInfo')) {
    try {
      const userInfo = result

      console.log('userInfo: ', userInfo)

      sessionStorage.setItem('bx-temu-user-info', JSON.stringify(userInfo))
    } catch (error) {
      console.error(error)
    }
  }

  if (url.includes('/visage-agent-seller/product/skc/pageQuery')) {
    try {
      const pageItems = result.pageItems
      const total = result.total

      console.log('data: ', data)
      console.log('pageItems: ', pageItems)
      console.log('total: ', total)
    } catch (error) {
      console.error(error)
    }
  }

  if (url.includes('/bgSongbird-api/supplier/deliverGoods/management/pageQueryDeliveryBatch')) {
    try {
      const list = result.list || []
      console.log('📦 捕获到发货批次表格数据（pageQueryDeliveryBatch）:', list)
      useShoppingListStore.getState().setItems(list)
    } catch (err) {
      console.error('❌ 解析 pageQueryDeliveryBatch 响应失败:', err)
    }
  }
}
