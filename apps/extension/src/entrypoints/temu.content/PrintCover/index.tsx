import { CUSTOM_PRINT_COVER_BUTTON_CLASSNAME, PRINT_COVER_BUTTON_INSERT_POSITION } from '../print/consts'
import { useShoppingListStore } from '@/stores/useShoppingListStore'
import { createIframe, writeIframeContent } from '@/utils/iframe'
import { CUSTOM_PRINT_COVER_IFRAME_ID } from './consts'
import { generatePrintCoverContent } from './utils'
import { mock } from './mock'

export const createPrintCover = () => {
  document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement

    const printButton = target.closest('[data-testid="beast-core-tab"]')
    if (!printButton) {
      return
    }

    const MAX_ATTEMPTS = 10
    let attempts = 0
    const POLL_INTERVAL = 300

    const checkButtons = () => {
      const buttonsContainer = document.querySelector<HTMLElement>('.shipping-list_flexAndColor__Yx1yg')
      if (buttonsContainer) {
        if (!buttonsContainer.querySelector(`.${CUSTOM_PRINT_COVER_BUTTON_CLASSNAME}`)) {
          insertCustomPrintCoverButton(buttonsContainer)
        }
        clearInterval(pollingTimer)
      } else if (++attempts >= MAX_ATTEMPTS) {
        clearInterval(pollingTimer)
        console.warn('弹窗容器未找到，停止检测')
      }
    }

    // 4. 启动轮询（给弹窗渲染留出时间）
    const pollingTimer = setInterval(checkButtons, POLL_INTERVAL)
  })

  const insertCustomPrintCoverButton = (container: HTMLElement) => {
    const button = document.createElement('button')
    button.className = PRINT_COVER_BUTTON_INSERT_POSITION
    button.type = 'button'
    button.style.marginLeft = '0px'
    button.style.marginRight = '8px'

    const span = document.createElement('span')
    span.textContent = '自定义批量打印外箱面单'
    button.appendChild(span)

    // 找到显示选中数量的元素
    const countElement = document.querySelector('.shipping-list_chooseNum__nPuIs')
    if (countElement) {
      const updateButtonState = () => {
        const countText = countElement.innerHTML.trim()
        const selectedCount = Number(countText) || 0
        if (selectedCount > 0) {
          button.classList.remove('BTN_disabled_5-117-0')
        } else {
          button.classList.add('BTN_disabled_5-117-0')
        }
      }
      updateButtonState()
      const observer = new MutationObserver(updateButtonState)
      observer.observe(countElement, { childList: true, subtree: true, characterData: true })
    }

    button.addEventListener('click', async () => {
      const selectedCountString = document.querySelector('.shipping-list_chooseNum__nPuIs')?.innerHTML
      const selectedCount = Number(selectedCountString) || 0
      const selectedCountInMemory = useShoppingListStore.getState().selectedItemIds.length
      console.log('------------------------------------')
      console.log('selectedCount: ', selectedCount)
      console.log('selectedCountInMemory: ', selectedCountInMemory)

      if (selectedCount <= 0 || selectedCountInMemory <= 0) {
        console.warn('点击时无选中项，可能状态同步延迟。')
        return
      }
      if (selectedCountInMemory > selectedCount) {
        console.warn('选中数量不一致。')
        return
      }
      //
      showPrintCover()
    })

    container.prepend(button)
  }

  document.addEventListener('change', async (e) => {
    const target = e.target as any

    const inputCheckBox = target.closest('.CBX_input_5-117-0')

    if (
      inputCheckBox.tagName === 'INPUT' &&
      inputCheckBox.type === 'checkbox' &&
      inputCheckBox.classList.contains('CBX_input_5-117-0') &&
      inputCheckBox.hasAttribute('mode') &&
      inputCheckBox.getAttribute('mode') === 'checkbox'
    ) {
      console.log('inputCheckBox.checked: ', inputCheckBox.checked)
      console.log('✅ 点击了目标 checkbox:', inputCheckBox)
      const row = inputCheckBox.closest('[data-testid="beast-core-table-body-tr"]')
      const tds = row.querySelectorAll('td')
      const secondColumn = tds[1]
      if (secondColumn) {
        const orderNo = secondColumn.querySelector('div > div > div')?.textContent?.trim() || ''
        if (orderNo !== '') {
          console.log('orderNo: ', orderNo)
          if (inputCheckBox.checked) {
            useShoppingListStore.getState().addSelectedItemId(orderNo)
          } else {
            useShoppingListStore.getState().removeSelectedItemId(orderNo)
          }
        }
      } else {
        console.warn('第二列未找到')
      }

      console.log('--------items: ', useShoppingListStore.getState().items)
      console.log('--------selectedItemIds: ', useShoppingListStore.getState().selectedItemIds)
    }
  })

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
    const contentHtml = generatePrintCoverContent(mock)

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

// const extractSelectedRows = (): any[] => {
//   const rows = Array.from(
//     document.querySelectorAll<HTMLTableRowElement>(
//       'tbody[data-testid="beast-core-table-middle-tbody"] > tr[data-testid="beast-core-table-body-tr"]'
//     )
//   );

//   const selectedData: any[] = [];

//   for (const row of rows) {
//     // 跳过没有 checkbox 的子行
//     const checkboxInput = row.querySelector<HTMLInputElement>('input[type="checkbox"]');
//     if (!checkboxInput) continue;

//     // 只处理选中的行
//     if (!checkboxInput.checked) continue;

//     const cells = row.querySelectorAll('.TB_td_5-117-0');

//     // 第2列：订单号
//     const orderNo = cells[1]?.querySelector('div > div')?.textContent?.trim() || '';

//     // 第3列：物流单号（在 <a> 标签中）
//     let logisticsNo = '';
//     const logisticsLink = cells[2]?.querySelector('a');
//     if (logisticsLink) {
//       logisticsNo = logisticsLink.textContent?.trim().replace('，', ',') || '';
//     }

//     // 第6列：发货数量、仓库信息
//     const col6Text = cells[5]?.textContent || '';
//     const shippingQtyMatch = col6Text.match(/发货数量：\s*(\d+)件/);
//     const fromWarehouseMatch = col6Text.match(/发货仓库：\s*([^\n]+)/);
//     const toWarehouseMatch = col6Text.match(/收货仓库：\s*([^\n]+)/);

//     const shippingQty = shippingQtyMatch ? parseInt(shippingQtyMatch[1], 10) : 0;
//     const fromWarehouse = (fromWarehouseMatch?.[1] || '').trim();
//     const toWarehouse = (toWarehouseMatch?.[1] || '').trim();

//     // 第7列：包裹详情（多个 PC... 条目）
//     const packageDetails: { id: string; qty: number }[] = [];
//     const packageItems = cells[6]?.querySelectorAll<HTMLElement>('.Space_outWrapper_5-117-0');
//     if (packageItems) {
//       for (const item of packageItems) {
//         const spans = item.querySelectorAll('span');
//         if (spans.length >= 2) {
//           const id = spans[0]?.textContent?.trim() || '';
//           const qtyText = spans[1]?.textContent?.trim().replace('件', '');
//           const qty = parseInt(qtyText, 10) || 0;
//           if (id && qty > 0) {
//             packageDetails.push({ id, qty });
//           }
//         }
//       }
//     }

//     selectedData.push({
//       orderNo,
//       logisticsNo,
//       shippingQty,
//       fromWarehouse,
//       toWarehouse,
//       packageDetails,
//     });
//   }

//   return selectedData;
// };

const showPrintCover = () => {
  const oldIframe = document.getElementById(CUSTOM_PRINT_COVER_IFRAME_ID) as HTMLIFrameElement | null
  if (oldIframe) {
    oldIframe.remove()
  }

  const iframe = createIframe(CUSTOM_PRINT_COVER_IFRAME_ID)
  document.body.appendChild(iframe)

  const selectedShoppingItems = useShoppingListStore.getState().getSelectedItems()

  const filtedSelectedShoppingItems = selectedShoppingItems.filter((item) => {
    return item.deliveryOrderList.length > 1
  })

  if (filtedSelectedShoppingItems.length === 0) {
    alert('没有需要打印的发货单，请重新选择发货单。')
    return
  }

  const contentHtml = generatePrintCoverContent(filtedSelectedShoppingItems)

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
}
