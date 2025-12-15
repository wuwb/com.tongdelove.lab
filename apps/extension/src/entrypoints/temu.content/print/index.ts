import type { PrintProduct } from './types'
import {
  CUSTOM_PRINT_BUTTON_CLASSNAME,
  CUSTOM_PRINT_BUTTON_INSERT_PLACE_CLASSNAME,
  CUSTOM_PRINT_IFRAME_ID,
  PRINT_BUTTON_INSERT_POSITION,
} from './consts'
import { createIframe, writeIframeContent } from '@/utils/iframe'
import { map } from './map'
import { generatePrintContent } from './utils'

export async function createPrint() {
  /**
   * add custom print button
   */
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
        if (!modalContainer.querySelector(`.${CUSTOM_PRINT_BUTTON_CLASSNAME}`)) {
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

  const extractProductListFromModal = (): PrintProduct[] => {
    // 查找抽屉内容区域
    const container = document.querySelector<HTMLElement>('.index-module__drawer-body___3-jUp')
    if (!container) {
      alert('未找到发货单抽屉区域，请确认弹窗已完全打开。')
      return []
    }

    // 查找表格
    const table = container.querySelector<HTMLElement>('[data-testid="beast-core-table"]')
    if (!table) {
      alert('在抽屉区域内未找到商品表格，请确认表格已加载完成。')
      return []
    }

    // 查找所有数据行
    const rows = table.querySelectorAll<HTMLTableRowElement>('[data-testid="beast-core-table-body-tr"]')
    if (rows.length === 0) {
      alert('表格中未找到任何商品数据行。')
      return []
    }

    const productList: PrintProduct[] = []

    try {
      Array.from(rows).forEach((row, index) => {
        const cells = row.querySelectorAll('[data-testid="beast-core-table-td"]')
        if (cells.length < 7) {
          throw new Error(`第 ${index + 1} 行数据不完整：期望 7 列，实际 ${cells.length} 列`)
        }

        const getTextContent = (cell: Element): string => cell.textContent?.trim() ?? ''

        // 第一列：包含图片、商品标题、SKC
        const firstCell = cells[0]
        const img = firstCell.querySelector<HTMLImageElement>('img[src]')
        const imageUrl = img ? img.src : '' // 提取图片地址

        const titleElements = firstCell.querySelectorAll('div.goods-info_content__pfkNO > div')
        const title = titleElements.length > 0 ? (titleElements[0].textContent?.trim() ?? '') : ''
        const skc = titleElements.length > 1 ? (titleElements[1] as HTMLElement).innerText.trim() : ''

        const sku = getTextContent(cells[1])
        if (!sku) {
          throw new Error(`第 ${index + 1} 行缺失 SKU ID`)
        }

        const skuLabel = getTextContent(cells[2])
        if (!skuLabel) {
          throw new Error(`第 ${index + 1} 行缺失 SKU货号`)
        }

        const mainAttr = getTextContent(cells[3]).replace('-', '').trim()
        const subAttrText = getTextContent(cells[4])
        const subAttr = subAttrText.includes(':') ? subAttrText.split(':').slice(1).join(':').trim() : subAttrText

        const countText = getTextContent(cells[5])
        const count = Number.parseFloat(countText.replace(/[^\d.-]/g, ''))
        if (isNaN(count)) throw new Error(`第 ${index + 1} 行“发货数”无效：${countText}`)

        const input = cells[6].querySelector('input[data-testid="beast-core-inputNumber-htmlInput"]')
        const rawValue = input ? (input as HTMLInputElement).value : ''
        const inputValue = rawValue.trim()

        let inputCount: number

        // 判断是否为空值（包括纯空格）
        if (inputValue === '') {
          inputCount = 0 // 空输入 → 认为是 0，不报错
        } else {
          // 非空输入：必须能被解析为有效数字
          const cleaned = inputValue.replace(/[^\d.-]/g, '')
          const parsed = Number.parseFloat(cleaned)

          if (isNaN(parsed)) {
            throw new TypeError(`第 ${index + 1} 行“打印数量”无效："${rawValue}" 不是一个有效的数字`)
          }

          inputCount = parsed
        }

        productList.push({
          address: 'Made in China',
          count,
          image: imageUrl,
          inputCount,
          mainAttr,
          skc,
          sku,
          skuLabel,
          subAttr,
          title,
        })
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '未知错误'
      alert(`提取商品数据失败：\n\n${message}\n\n请检查页面内容是否正常加载。`)
      return [] // 遇错清空结果
    }

    return productList
  }

  const insertCustomPrintButton = (container: HTMLElement) => {
    const button = document.createElement('button')
    button.className = PRINT_BUTTON_INSERT_POSITION
    button.type = 'button'
    button.style.backgroundColor = 'red'
    button.style.borderColor = 'red'

    const span = document.createElement('span')
    span.textContent = '高级打印'
    button.appendChild(span)

    button.addEventListener('click', async () => {
      const oldIframe = document.getElementById(CUSTOM_PRINT_IFRAME_ID) as HTMLIFrameElement | null
      if (oldIframe) {
        oldIframe.remove()
      }

      const iframe = createIframe(CUSTOM_PRINT_IFRAME_ID)
      document.body.appendChild(iframe)

      // const productList = [
      //   {
      //     sku: '26940309089',
      //     skuLabel: 'Z_hei_100',
      //     mainAttr: '',
      //     subAttr: '60M (196 Feet)',
      //     address: 'Made in China',
      //     count: 2,
      //     inputCount: 2,
      //   },
      //   {
      //     sku: '40644651821',
      //     skuLabel: 'Q_lv-B_100',
      //     mainAttr: '',
      //     subAttr: '60M (196 Feet)',
      //     address: 'Made in China',
      //     count: 3,
      //     inputCount: 3,
      //   }
      // ]

      const productList = extractProductListFromModal()

      // 使用统一生成函数
      const contentHtml = generatePrintContent(productList, map)

      writeIframeContent(iframe, contentHtml)

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

  /**
   * remove custom print button
   */
  function autoRemoveCustomPrintButton() {
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

  autoRemoveCustomPrintButton()

  /**
   * debug
   */
  function startDebug() {
    if (process.env.NODE_ENV === 'development') {
      const debugButton = document.createElement('button')
      debugButton.textContent = '测试打印'
      debugButton.style.position = 'fixed'
      debugButton.style.bottom = '20px'
      debugButton.style.right = '20px'
      debugButton.style.zIndex = '9999'
      debugButton.style.padding = '10px 15px'
      debugButton.style.backgroundColor = '#007acc'
      debugButton.style.color = 'white'
      debugButton.style.border = 'none'
      debugButton.style.borderRadius = '6px'
      debugButton.style.cursor = 'pointer'
      debugButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'

      debugButton.addEventListener('click', (e) => {
        e.preventDefault()
        openPrintDebugWindow()
      })

      document.body.appendChild(debugButton)
    }
  }

  /**
   * 打开打印调试窗口（独立页面）
   */
  function openPrintDebugWindow() {
    const productList = [
      {
        address: 'Made in China',
        count: 100,
        inputCount: 100,
        mainAttr: '',
        sku: '17298424299',
        skuLabel: 'Z100_B',
        subAttr: '柱100米_白色',
      },
      {
        address: 'Made in China',
        count: 30,
        inputCount: 30,
        mainAttr: '',
        sku: '5951129920',
        skuLabel: 'Q60_HongB',
        subAttr: '球60M_红白',
      },
    ]

    const contentHtml = generatePrintContent(productList, map)

    const debugWin = window.open('', '_blank')
    if (debugWin) {
      debugWin.document.write(contentHtml)
      debugWin.document.close()
    } else {
      alert('无法打开新窗口，请检查浏览器弹窗拦截设置。')
    }
  }

  // startDebug()
}
