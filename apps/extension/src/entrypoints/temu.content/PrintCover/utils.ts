import type { ShoppingItem } from '@/types/temu/ShoppingList'

export function generatePrintCoverContent(shoppingItems: ShoppingItem[]) {
  const pageHtml = shoppingItems
    .map((item) => {
      let totalSkcNum = 0
      const productContent = item.deliveryOrderList
        .map((deliveryOrderItem, index) => {
          let totalSkuNum = 0
          const skuDetailContent = deliveryOrderItem.packageList
            .map((packageItem) => {
              totalSkuNum = totalSkuNum + 1
              return `<span>${packageItem.packageSn} | ${packageItem.skcNum}件</span>`
            })
            .join(', ')
          totalSkcNum = totalSkcNum + deliveryOrderItem.skcPurchaseNum
          return `
        <div class="delivery-count">包裹${index + 1}号${totalSkuNum}种产品共${deliveryOrderItem.skcPurchaseNum}件: ${skuDetailContent}</div>
      `
        })
        .join('')
      const content = `
      <div class="page print-page">
        <div class="content-wrapper">
          <div class="company">苍南县半祥贸易有限公司: 18875836702</div>  
          <div class="delivery-company">快递公司: ${item.expressCompany}</div>
          <div class="delivery-order">快递单号: ${item.expressDeliverySn}</div>
          <!-- <div class="delivery-warehouse">收货仓库: ${item.subWarehouseName} ${item.receiveAddressInfo.phone}</div> -->
          <div class="delivery-name">收货仓库: ${item.receiveAddressInfo.receiverName}</div>
          <!-- <div class="delivery-address">地址: ${item.receiveAddressInfo.detailAddress}</div> -->
          <div class="delivery-total-count">总发货数量: ${totalSkcNum}件</div>
          ${productContent}
          
        </div>
      </div>
    `
      return content
    })
    .join('')

  const html = `
    <html>
      <head>
        <base target="_self">
        <style>
          @page { 
            size: 100mm 100mm;
            margin: 0; 
            padding: 0;
          }
          html,
          body {
            margin: 0; 
            padding: 0;
            width: 100%;
          }
          .page {
            width: 100mm;
            height: 100mm;
            box-sizing: border-box;
            padding: 0;
            margin: 0;

            page-break-after: always; /* 兼容旧浏览器 */
            break-after: page;        /* 新标准 */
            break-inside: avoid;      /* 防止单个标签内部被分页 */

            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: start;

            font-family: 'Heiti SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            // overflow: hidden;
            text-align: left;

            position: relative;
          }
          .content-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 5mm;
            line-height: 1.5;
            overflow: hidden;
          }
          .content-wrapper .company {
            font-size: 4.5mm;
          }
          .content-wrapper .delivery-company {
            font-size: 6mm;
          }
          .content-wrapper .delivery-order {
            font-size: 6mm;
          }
          .content-wrapper .delivery-warehouse {
            font-size: 4.5mm;
          }
          .content-wrapper .delivery-name {
            font-size: 6mm;
          }
          .content-wrapper .delivery-address {
            font-size: 4.5mm;
          }
          .content-wrapper .delivery-total-count {
            font-size: 6mm;
          }
          .content-wrapper .delivery-count {
            font-size: 4mm;
          }
        </style>
      </head>
      <body>
        ${pageHtml}
        <script>
          // 监听打印结束（用户关闭打印预览或点击打印/取消）
          window.onafterprint = function() {
            // 告诉外层页面移除 iframe
            window.parent.postMessage({ type: 'REMOVE_PRINT_IFRAME' }, '*');
          };

          // 可选：调试用
          window.onbeforeprint = function() {
            console.log('准备打印...');
          };
        </script>
      </body>
    </html>
  `

  return html
}

export function sanitizeIdentifier(filename: string) {
  const baseName = filename.replace(/\.\w+$/, '')
  // 替换非合法标识符字符为下划线，并确保不以数字开头
  let safe = baseName.replace(/[^\w$]/g, '_')
  if (!/^[a-z_$]/i.test(safe)) {
    safe = `_${safe}`
  }
  return safe
}
