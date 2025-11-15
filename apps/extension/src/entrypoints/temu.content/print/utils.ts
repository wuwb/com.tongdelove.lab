import { PrintProduct } from "./types";

// utils.ts 或直接放在当前文件顶部
export function generatePrintContent(productList: PrintProduct[], imageMap: Record<string, string>) {
  const productsWithImages = productList.map((product) => {
    const mapKey = sanitizeIdentifier(`${product.skuLabel}_${product.sku}`);
    const imageDataUrl = imageMap[mapKey]
    return { ...product, imageDataUrl };
  })

  const pages = productsWithImages.map((product) => {
    return {
      ...product,
      subAttr: product.subAttr.replace('颜色:', ''),
      title: product.skuLabel,
      list: Array.from({ length: product.inputCount }, () => ({
        sku: product.sku,
        skuLabel: product.skuLabel,
        mainAttr: product.mainAttr,
        subAttr: product.subAttr,
        address: product.address,
        imageDataUrl: product.imageDataUrl,
      }))
    }
  })

  const pageHtml = pages.map((page) => {
    // 只有当需要打印至少一个标签时才输出内容
    if (page.list.length === 0) {
      return ''; // 不输出任何 HTML
    }
    const titleHtml = `
      <div class="page print-page">
        <div class="title">${page.subAttr}</div>
        <div class="description">${page.title} - <span class="count">${page.inputCount}</span>个</div>
      </div>
    `
    const bodyHtml = page.list.map((item) => {
      return `
        <div class="page print-page">
          <img src="${item.imageDataUrl}" style="width:100%;height:auto;" />
        </div>
      `
    }).join('')
    return titleHtml + bodyHtml
  }).join('');

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
          }
          .page {
            width: 70mm;
            height: 20mm;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: 'Heiti SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            overflow: hidden;
          }
          .page .title {
            line-height: 10mm;
          }
          .page .description {
            font-size: 7mm;
            line-height: 10mm;
          }
          .page .count {
            font-weight: 700;
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
          // window.onbeforeprint = function() {
          //   console.log('准备打印...');
          // };
        </script>
      </body>
    </html>
  `;

  return html;
}

export function sanitizeIdentifier(filename: string) {
  const baseName = filename.replace(/\.\w+$/, '');
  // 替换非合法标识符字符为下划线，并确保不以数字开头
  let safe = baseName.replace(/[^a-zA-Z0-9_$]/g, '_');
  if (!/^[a-zA-Z_$]/.test(safe)) {
    safe = '_' + safe;
  }
  return safe;
}
