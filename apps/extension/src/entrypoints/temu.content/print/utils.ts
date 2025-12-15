import type { PrintProduct } from './types'

export function generatePrintContent(productList: PrintProduct[], imageMap: Record<string, string>) {
  const productsWithImages = productList.map((product) => {
    const mapKey = sanitizeIdentifier(`${product.skuLabel}_${product.sku}`)
    const imageDataUrl = imageMap[mapKey]
    return { ...product, imageDataUrl }
  })

  const pages = productsWithImages.map((product) => {
    return {
      ...product,
      list: Array.from({ length: product.inputCount }, () => ({
        address: product.address,
        imageDataUrl: product.imageDataUrl,
        mainAttr: product.mainAttr,
        sku: product.sku,
        skuLabel: product.skuLabel,
        subAttr: product.subAttr,
      })),
      subAttr: product.subAttr.replace('颜色:', ''),
      title: product.skuLabel,
    }
  })

  const pageHtml = pages
    .map((page) => {
      if (page.list.length === 0) {
        return ''
      }
      const titleHtml = `
      <div class="page print-page">
        <div class="content-wrapper">
          <div class="title">${page.subAttr}</div>
          <div class="description">${page.title} <span class="count">${page.inputCount}</span>个</div>
         </div>
      </div>
    `
      const bodyHtml = page.list
        .map((item) => {
          return `
        <div class="page print-page">
          <img class="image" src="${item.imageDataUrl}" />
        </div>
      `
        })
        .join('')
      return titleHtml + bodyHtml
    })
    .join('')

  const html = `
    <html>
      <head>
        <base target="_self">
        <style>
          @page { 
            size: 70mm 20mm;
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
            width: 70mm;
            height: 20mm;
            box-sizing: border-box;
            padding: 0;
            margin: 0;

            page-break-after: always; /* 兼容旧浏览器 */
            break-after: page;        /* 新标准 */
            break-inside: avoid;      /* 防止单个标签内部被分页 */

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            font-family: 'Heiti SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            // overflow: hidden;
            text-align: center;

            position: relative;
          }
          .content-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .page .title {
            line-height: 5mm;
          }
          .page .description {
            font-size: 5mm;
            line-height: 5mm;
          }
          .page .description .count {
            font-weight: 700;
            line-height: 5mm;
          }
          .page .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
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
