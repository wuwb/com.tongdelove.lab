import { EVENT_CONFIG_UPDATED, EVENT_REQUEST_CONFIG } from '@/constants/app'

let isHideWarningEnabled = false

export function removeUnusedTip() {
  window.addEventListener(EVENT_CONFIG_UPDATED, (e: any) => {
    const { hideReadyToShip } = e.detail
    console.log('[Main World] 配置更新: 隐藏发货提醒 =', hideReadyToShip)

    isHideWarningEnabled = hideReadyToShip

    removeShippingWarning()
  })

  startObserver()

  window.dispatchEvent(new CustomEvent(EVENT_REQUEST_CONFIG))
}

export function startObserver() {
  // window.addEventListener('load', removeShippingWarning)
  removeShippingWarning()

  const observer = new MutationObserver(() => {
    removeShippingWarning()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}

function removeShippingWarning() {
  // <div
  //   class="PT_outerWrapper_5-117-0 PP_outerWrapper_5-117-0 Tooltip_outerWrapper_5-117-0  PT_tooltip_5-117-0 PT_portalTopLeft_5-117-0 PT_portalWithArrow_5-117-0 "
  //   data-testid="beast-core-portal"
  //   style="left: 0px; top: -40.5469px; padding-bottom: 10px;"
  // >
  //   <div
  //     data-testid="beast-core-portal-main"
  //     class="PT_portalMain_5-117-0 PP_tooltipMain_5-117-0 Tooltip_tooltipMain_5-117-0"
  //     style="background-color: rgba(0, 0, 0, 0.8); box-shadow: none; padding: 8px;">
  //     <div style="display: flex;">
  //       <div style="flex: 1 1 auto; width: 100%;">
  //         <div class="">
  //           <span class="shipping-list_opacityBg__-Y0I-">
  //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-testid="beast-core-icon-warning-circle" class="ICN_outerWrapper_5-117-0 ICN_svgIcon_5-117-0 " style="margin-right: 9px;">
  //               <path d="M512 64c-247.4 0-448 200.6-448 448s200.6 448 448 448c247.4 0 448-200.6 448-448s-200.6-448-448-448z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372c205.4 0 372 166.6 372 372s-166.6 372-372 372z">
  //               </path>
  //               <path d="M509.6 248.7c-3.3 0-6.6 0.1-10 0.6-46.2 5.5-79.2 47.4-73.7 93.6l26.3 220.9c3.4 28.9 27.9 50.6 57 50.6s53.6-21.7 57.1-50.6l26.7-220.9c0.4-3.4 0.6-6.7 0.6-10.1 0-46.4-37.6-84.1-84-84.1z m2.4 409.6c-32.3 0-58.5 26.2-58.5 58.5 0 32.4 26.2 58.5 58.5 58.5 32.3 0 58.5-26.1 58.5-58.5 0-32.3-26.2-58.5-58.5-58.5z">
  //               </path>
  //             </svg>请勾选发货单后点击发货，否则仓库无法收货<span class="shipping-list_lightFont__zomzR">（2s）</span>
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       data-testid="beast-core-portal-arrow"
  //       class="PT_portalMainArrow_5-117-0 PP_popoverArrow_5-117-0 Tooltip_tooltipArrow_5-117-0"
  //       style="left: 53px; border-color: rgba(0, 0, 0, 0.8); box-shadow: none;">
  //     </div>
  //   </div>
  // </div>

  const portalDivs = document.querySelectorAll('div[data-testid="beast-core-portal-main"]')
  portalDivs.forEach((div) => {
    if (!(div instanceof HTMLElement)) {
      return
    }
    const targetSpan = div.querySelector('span.shipping-list_opacityBg__-Y0I-')
    if (targetSpan && targetSpan.textContent.includes('请勾选发货单后点击发货，否则仓库无法收货')) {
      if (isHideWarningEnabled) {
        div.style.display = 'none'
        div.remove()
      } else {
        div.style.display = ''
      }
    }
  })
}
