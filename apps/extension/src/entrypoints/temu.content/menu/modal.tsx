import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoot } from './App'
import cssContent from '../style.css?inline' 

function createConfigMenuSystem(modalSystem: ReturnType<typeof createConfigModalSystem>) {
  const menuButtonClass = 'config-menu-button'
  // const menuContainerSelector = '.index-module__mmsCommon___3B2_9'
  const menuContainerSelector = '.index-module__mmsCommon___2SP2n'

  const createMenuButton = () => {
    const button = document.createElement('button')
    button.className = menuButtonClass
    button.textContent = '配置'

    // 应用样式（与页面风格匹配）
    Object.assign(button.style, {
      ':hover': {
        backgroundColor: '#e9e9e9',
      },
      'backgroundColor': '#f5f5f5',
      'border': '1px solid #ddd',
      'borderRadius': '4px',
      'color': '#333',
      'cursor': 'pointer',
      'fontSize': '14px',
      // 'marginLeft': '12px',
      // 'padding': '6px 12px',
      'padding': 0,
      'transition': 'all 0.2s',
    })

    button.addEventListener('click', (e) => {
      e.stopPropagation() // 阻止事件向上冒泡
      modalSystem.openModal()
    })
    return button
  }

  // 8️⃣ DOM 观察器
  const setupMenuObserver = () => {
    let observer: MutationObserver | null = null

    const cleanup = () => {
      observer?.disconnect()
      observer = null
    }

    const checkAndInject = () => {
      const menuContainer = document.querySelector<HTMLElement>(menuContainerSelector)
      if (menuContainer) {
        // 容器存在时确保按钮存在（修复 SPA 问题）
        if (!menuContainer.querySelector(`.${menuButtonClass}`)) {
          menuContainer.appendChild(createMenuButton())
        }
      }
    }

    observer = new MutationObserver(checkAndInject)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // 初始检查
    checkAndInject()

    return cleanup
  }

  // 9️⃣ 返回可组合的 API
  return {
    cleanup: () => {
      // 移除所有菜单按钮
      document.querySelectorAll(`.${menuButtonClass}`).forEach((btn) => {
        btn.remove()
      })
    },
    createMenuButton,
    setupMenuObserver,
  }
}

// 1️⃣ React 弹窗核心功能（纯函数封装）
function createConfigModalSystem() {
  // 弹窗状态管理（闭包内）
  let isModalOpen = false
  const modalRootId = 'config-modal-root'
  let currentRoot: ReturnType<typeof createRoot> | null = null

  const init = () => {
    let modalRoot = document.getElementById(modalRootId)
    if (!modalRoot) {
      modalRoot = document.createElement('div')
      modalRoot.id = modalRootId
      document.body.appendChild(modalRoot)
    }

    if (!currentRoot) {
      currentRoot = createRoot(modalRoot)
      // 初始渲染，默认 open=false
      // 注意：这里需要一个重新渲染机制，或者使用 Context/Store 来驱动 React 更新
      render(false) 
    }
  }

  const render = (show: boolean) => {
    if (currentRoot) {
      currentRoot.render(
        <AppRoot 
          open={show} 
          onOpenChange={handleOpenChange} 
        />
      )
    }
  }

  const handleOpenChange = (open: boolean) => {
    isModalOpen = open
    render(open) // 触发 React 更新，只改 Props，不卸载组件
  }

  const openModal = () => {
    if (!currentRoot) init()
    handleOpenChange(true)
  }

  const closeModal = () => {
    handleOpenChange(false)
  }


  return {
    closeModal,
    openModal,
  }
}


function injectStyles() {
  const styleId = 'tongdelove-plugin-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = cssContent // 将编译好的 Tailwind CSS 注入
    document.head.appendChild(style)
  }
}

// 🔟 初始化配置菜单功能
export function initConfigMenuFeature() {
  injectStyles()
  // 创建弹窗系统
  const modalSystem = createConfigModalSystem()

  // 创建菜单系统
  const menuSystem = createConfigMenuSystem(modalSystem)

  // 设置菜单观察器
  const cleanupMenuObserver = menuSystem.setupMenuObserver()

  console.log('menu inserted.')
}
