import { CUSTOM_PRINT_BUTTON_CLASSNAME, CUSTOM_PRINT_BUTTON_INSERT_PLACE_CLASSNAME, CUSTOM_PRINT_IFRAME_ID, PRINT_BUTTON_INSERT_POSITION } from "./consts"
import { createIframe, writeIframeContent } from "./iframe"
import { map } from './map'

export const createCustomPrint = async () => {
  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement
    // 检查是否点击了目标按钮（兼容嵌套元素）
    const printButton = target.closest('[data-testid="beast-core-button-link"]')
    if (!printButton) {
      return
    }

    // 2. 启动弹窗检测轮询
    const MAX_ATTEMPTS = 10 // 最大检测次数
    let attempts = 0
    const POLL_INTERVAL = 300 // 每50ms检测一次

    const checkModal = () => {
      // 查找弹窗插入位置（您的自定义选择器）
      const modalContainer = document.querySelector<HTMLElement>(CUSTOM_PRINT_BUTTON_INSERT_PLACE_CLASSNAME)
      
      if (modalContainer) {
        console.log('-----------------------------------modalContainer')
        // 3. 检查是否已存在自定义按钮（避免重复插入）
        if (!modalContainer.querySelector(CUSTOM_PRINT_BUTTON_CLASSNAME)) {
          console.log('-----------------------------------modalContainer insert')
          insertCustomPrintButton(modalContainer)
        }
        clearInterval(pollingTimer)
      } else if (++attempts >= MAX_ATTEMPTS) {
        clearInterval(pollingTimer)
        console.warn('弹窗容器未找到，停止检测')
      }
    }

    // 4. 启动轮询（给弹窗渲染留出时间）
    const pollingTimer = setInterval(checkModal, POLL_INTERVAL)
  })

  const insertCustomPrintButton = (container: HTMLElement) => {
    const button = document.createElement('button')
    button.className = PRINT_BUTTON_INSERT_POSITION
    button.type = 'button'
    button.style.backgroundColor = 'red'
    button.style.borderColor = 'red'

    const span = document.createElement('span')
    span.textContent = '自定义打印'
    button.appendChild(span)

    button.addEventListener('click', async () => {
      const oldIframe = document.getElementById(CUSTOM_PRINT_IFRAME_ID) as HTMLIFrameElement | null
      if (oldIframe) {
        oldIframe.remove()
      }

      const iframe = createIframe(CUSTOM_PRINT_IFRAME_ID)
      document.body.appendChild(iframe)

      const productList = [
        {
          skuId: '26940309089',
          skuLabel: 'Z_hei_100',
          mainAttr: '',
          subAttr: '60M (196 Feet)',
          address: 'Made in China',
          count: 2,
          inputCount: 2,
        },
        // {
        //   skuId: '40644651821',
        //   skuLabel: 'Q_lv-B_100',
        //   mainAttr: '',
        //   subAttr: '60M (196 Feet)',
        //   address: 'Made in China',
        //   count: 3,
        //   inputCount: 3,
        // }
      ]

      const productsWithImages = productList.map((product) => {
        const imageDataUrl = map[`${product.skuLabel}_${product.skuId}`]
        return { ...product, imageDataUrl };
      })

      const pages = productsWithImages.map((product) => {
        return {
          title: product.skuLabel,
          count: product.inputCount,
          list: Array.from({ length: product.inputCount }, () => ({
            skuId: product.skuId,
            skuLabel: product.skuLabel,
            mainAttr: product.mainAttr,
            subAttr: product.subAttr,
            address: product.address,
            imageDataUrl: product.imageDataUrl,
          }))
        }
      })

      const pageHtml = pages.map((page) => {
        const titleHtml = `
          <div class="page print-page">
            ${page.title} - ${page.count}份
          </div>
        `
        const bodyHtml = page.list.map((item) => {
        console.log('item.imageDataUrl: ',item.imageDataUrl)

          return `
          <div class="page print-page">
            <img src="${item.imageDataUrl}" />
          </div>
          `
        }).join('')
        return titleHtml + bodyHtml
      }).join('');

      writeIframeContent(iframe, `
        <html>
          <head>
            <base target="_self">
            <style>
              @page { 
                size: 70mm 20mm;
                margin: 0mm; 
              }
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: white;
              }
              .page {
                text-align: center;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
              }
              .page:last-child { page-break-after: avoid; }
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
      `)

      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus()
            iframe.contentWindow?.print()
          } catch (err) {
            console.error('打印失败:', err)
            alert('打印失败，请重试。')
          }
        }, 150)
      }
    })

    container.prepend(button)
  }

  const handleRemoveIframe = (event: MessageEvent) => {
    if (event.data?.type === 'REMOVE_PRINT_IFRAME') {
      const iframe = document.getElementById(CUSTOM_PRINT_IFRAME_ID)
      iframe?.remove()
      console.log('已自动移除打印 iframe')
    }
  }
  window.removeEventListener('message', handleRemoveIframe)
  window.addEventListener('message', handleRemoveIframe)
}
