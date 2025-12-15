export const ConfigButton = () => {
  return (
    <button
      onClick={(e) => {
        // 1. 阻止默认行为和冒泡，防止触发网页原本的点击事件
        e.preventDefault()
        e.stopPropagation()

        console.log('👆 按钮被点击，准备发送事件...')

        // 2. 发送自定义事件
        // 注意：事件名必须和 Modal 里监听的一模一样
        const event = new CustomEvent('wxt:open-config-modal', {
          bubbles: true,
          composed: true, // 允许穿透 Shadow DOM
          detail: { from: 'button' },
        })

        window.dispatchEvent(event)
        console.log('📡 事件已发送')
      }}
      className="text-sm rounded cursor-pointer z-50 pointer-events-auto"
    >
      配置
    </button>
  )
}

ConfigButton.displayName = 'ConfigButton'
