import ReactDOM from 'react-dom/client'
import { ConfigButton } from '@/components/ConfigButton'
import { ConfigModal } from '@/components/ConfigModal'
import { EVENT_REQUEST_CONFIG, STORAGE_KEY_HIDE_ALERT, EVENT_CONFIG_UPDATED } from '@/constants/app'
import cssContent from './style.css?inline'
import './style.css'

export default defineContentScript({
  matches: ['*://agentseller.temu.com/*', '*://seller.kuajingmaihuo.com/*'],
  // cssInjectionMode: 'ui',
  cssInjectionMode: 'manual',
  world: 'ISOLATED',
  async main(ctx) {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(cssContent)

    const mountModal = async () => {
      if (document.querySelector('wxt-component[name="tongdelove-modal"]')) {
        console.log('Modal already exists.')
        return
      }

      console.log('Mounting Config Modal...')
      const ui = await createShadowRootUi(ctx, {
        name: 'tongdelove-modal',
        position: 'inline',
        anchor: 'body',
        append: 'last',
        // zIndex: 2147483647,
        onMount: (uiContainer, shadow) => {
          // console.log('cssContent: ', cssContent)
          // console.log('sheet: ', sheet)

          // const style = document.createElement('style');
          // style.textContent = cssContent;
          // shadow.appendChild(style);

          // shadow.adoptedStyleSheets = [sheet];
          shadow.adoptedStyleSheets = [
            ...shadow.adoptedStyleSheets, // 保留 WXT 的 Reset 样式
            sheet, // 添加我们的 Tailwind 样式
          ]

          const root = ReactDOM.createRoot(uiContainer)
          root.render(<ConfigModal />)
          return root
        },
        // 🗑️ 清理：虽然 Body 上的 modal 很少被移除，但加上是个好习惯
        onRemove: (elements) => {
          // elements?.root 是 WXT 内部的 root，不是 React 的 root
          // 我们这里没法直接拿到 react root，除非存在外部变量
          // 但对于单例 Modal，这通常不是大问题
        },
      })
      ui.mount()
    }

    const TARGET_SELECTOR = 'div[class*="index-module__mmsCommon"]'
    const MARK_ATTR = 'data-tongde-injected'

    const scanAndMount = () => {
      const anchors = document.querySelectorAll(TARGET_SELECTOR)

      anchors.forEach(async (anchor) => {
        // 🛡️ 同步检查防重
        if (anchor.getAttribute(MARK_ATTR)) return
        anchor.setAttribute(MARK_ATTR, 'true')

        if (!(anchor instanceof HTMLElement)) return

        try {
          const ui = await createShadowRootUi(ctx, {
            name: 'tongdelove-btn',
            position: 'inline',
            anchor: anchor,
            append: 'last',
            // isolateEvents: true, // 可选：阻止 ShadowDOM 内的事件冒泡到外部
            onMount: (uiContainer, shadow) => {
              const style = document.createElement('style')
              style.textContent = cssContent || ''
              shadow.appendChild(style)

              // shadow.adoptedStyleSheets = [sheet];

              const root = ReactDOM.createRoot(uiContainer)
              root.render(<ConfigButton />)

              // 关键：将 root 返回，WXT 会在 onRemove 时传回来吗？
              // WXT 目前的类型定义可能不直接支持在 onRemove 拿返回值
              // 所以我们在闭包里处理，或者将 root 挂载到 uiContainer 上以便清理
              ;(uiContainer as any)._reactRoot = root

              return root
            },
            // 🗑️ 关键修复：当宿主元素(anchor)从页面移除时，卸载 React
            onRemove: (elements) => {
              const root = (elements?.uiContainer as any)?._reactRoot
              if (root) {
                root.unmount()
                // console.log('Button React root unmounted');
              }
            },
          })

          ui.mount()
        } catch (e) {
          console.error('挂载失败:', e)
          // 如果失败，移除标记，允许重试
          anchor.removeAttribute(MARK_ATTR)
        }
      })
    }

    // --------------------------------------------------------
    // 3. 执行顺序
    // --------------------------------------------------------

    // 先挂载 Modal，确保按钮点击时 Modal 已经就绪
    await mountModal()

    // 立即扫描一次
    scanAndMount()

    // 4. 启动 Observer
    let timer: ReturnType<typeof setTimeout>
    const observer = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0)
      if (!hasAddedNodes) {
        return
      }

      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        scanAndMount()
      }, 100)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    window.addEventListener(EVENT_REQUEST_CONFIG, async () => {
      const isHidden = await storage.getItem<boolean>(STORAGE_KEY_HIDE_ALERT)

      // 发送回复事件
      window.dispatchEvent(
        new CustomEvent(EVENT_CONFIG_UPDATED, {
          detail: { hideReadyToShip: !!isHidden },
          composed: true,
          bubbles: true,
        })
      )
    })
  },
})
