import React from 'react'
import { createRoot } from 'react-dom/client'

import { AppRoot } from './App'

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
      'marginLeft': '12px',
      'padding': '6px 12px',
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

  // 2️⃣ 创建 React 组件（无 JSX，纯 createElement）
  const createModalContent = (onClose: () => void) => {
    return React.createElement('div', {
      style: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 999999,
      },
    }, React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '600px',
        padding: '24px',
        position: 'relative',
        width: '90%',
      },
    }, React.createElement('h2', {
      style: {
        color: '#333',
        fontSize: '24px',
        margin: '0 0 20px 0',
      },
    }, '插件配置'),

    // 关闭按钮
    React.createElement('button', {
      onClick: onClose,
      style: {
        ':hover': {
          backgroundColor: '#f0f0f0',
        },
        'alignItems': 'center',
        'background': 'none',
        'border': 'none',
        'borderRadius': '50%',
        'color': '#666',
        'cursor': 'pointer',
        'display': 'flex',
        'fontSize': '24px',
        'height': '32px',
        'justifyContent': 'center',
        'position': 'absolute',
        'right': '12px',
        'top': '12px',
        'transition': 'background-color 0.2s',
        'width': '32px',
      },
    }, '×'),

    // 配置内容区域（可扩展）
    React.createElement('div', {
      style: {
        marginTop: '20px',
      },
    },
    // 示例配置项
    React.createElement('div', {
      style: {
        marginBottom: '20px',
      },
    }, React.createElement('label', {
      style: {
        color: '#555',
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '8px',
      },
    }, '打印页边距 (cm)'), React.createElement('input', {
      defaultValue: '2',
      min: '0',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('页边距更新:', e.target.value)
        // 这里可以保存配置
      },
      step: '0.5',
      style: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
      },
      type: 'number',
    })), React.createElement('div', {
      style: {
        marginBottom: '20px',
      },
    }, React.createElement('label', {
      style: {
        color: '#555',
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '8px',
      },
    }, '主题颜色'), React.createElement('input', {
      defaultValue: '#4CAF50',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('主题颜色更新:', e.target.value)
        // 这里可以更新打印按钮样式
      },
      style: {
        height: '40px',
        padding: '4px',
        width: '100%',
      },
      type: 'color',
    })), React.createElement('button', {
      onClick: onClose,
      style: {
        ':hover': {
          background: '#45a049',
        },
        'background': '#4CAF50',
        'border': 'none',
        'borderRadius': '4px',
        'color': 'white',
        'cursor': 'pointer',
        'fontSize': '16px',
        'padding': '10px 20px',
        'width': '100%',
      },
    }, '保存并关闭'))))
  }

  // 3️⃣ 弹窗控制函数
  const openModal = () => {
    if (isModalOpen) {
      return
    }

    // 创建或获取根元素
    let modalRoot = document.getElementById(modalRootId)
    if (!modalRoot) {
      modalRoot = document.createElement('div')
      modalRoot.id = modalRootId
      document.body.appendChild(modalRoot)
    }

    // 渲染弹窗
    const root = createRoot(modalRoot)
    root.render(<AppRoot onClose={closeModal} />)

    isModalOpen = true

    currentRoot = root
  }

  const closeModal = () => {
    if (!isModalOpen) {
      return

    }

    const modalRoot = document.getElementById(modalRootId)
    if (modalRoot && currentRoot) {
      currentRoot.unmount()
      modalRoot.remove()
      currentRoot = null
    }

    isModalOpen = false
  }

  // 4️⃣ 清理函数
  const cleanup = () => {
    closeModal()
  }

  // 5️⃣ 返回可组合的 API
  return {
    cleanup,
    closeModal,
    isModalOpen: () => isModalOpen,
    openModal,
  }
}

// 🔟 初始化配置菜单功能
export function initConfigMenuFeature() {
  // 创建弹窗系统
  const modalSystem = createConfigModalSystem()

  // 创建菜单系统
  const menuSystem = createConfigMenuSystem(modalSystem)

  // 设置菜单观察器
  const cleanupMenuObserver = menuSystem.setupMenuObserver()

  console.log('menu inserted.')
}
