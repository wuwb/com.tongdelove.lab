import ReactDOM from 'react-dom'

// 1️⃣ React 弹窗核心功能（纯函数封装）
const createConfigModalSystem = () => {
  // 弹窗状态管理（闭包内）
  let isModalOpen = false;
  const modalRootId = 'config-modal-root';

  // 2️⃣ 创建 React 组件（无 JSX，纯 createElement）
  const createModalContent = (onClose: () => void) => {
    return React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        fontFamily: 'Arial, sans-serif'
      }
    },
      React.createElement('div', {
        style: {
          background: 'white',
          padding: '24px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '600px',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      },
        React.createElement('h2', {
          style: {
            margin: '0 0 20px 0',
            color: '#333',
            fontSize: '24px'
          }
        }, '插件配置'),
        
        // 关闭按钮
        React.createElement('button', {
          style: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#666',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#f0f0f0'
            }
          },
          onClick: onClose
        }, '×'),
        
        // 配置内容区域（可扩展）
        React.createElement('div', {
          style: {
            marginTop: '20px'
          }
        },
          // 示例配置项
          React.createElement('div', {
            style: {
              marginBottom: '20px'
            }
          },
            React.createElement('label', {
              style: {
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#555'
              }
            }, '打印页边距 (cm)'),
            React.createElement('input', {
              type: 'number',
              defaultValue: '2',
              min: '0',
              step: '0.5',
              style: {
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('页边距更新:', e.target.value);
                // 这里可以保存配置
              }
            })
          ),
          
          React.createElement('div', {
            style: {
              marginBottom: '20px'
            }
          },
            React.createElement('label', {
              style: {
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#555'
              }
            }, '主题颜色'),
            React.createElement('input', {
              type: 'color',
              defaultValue: '#4CAF50',
              style: {
                width: '100%',
                height: '40px',
                padding: '4px'
              },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                console.log('主题颜色更新:', e.target.value);
                // 这里可以更新打印按钮样式
              }
            })
          ),
          
          React.createElement('button', {
            style: {
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%',
              ':hover': {
                background: '#45a049'
              }
            },
            onClick: onClose
          }, '保存并关闭')
        )
      )
    );
  };

  // 3️⃣ 弹窗控制函数
  const openModal = () => {
    if (isModalOpen) return;
    
    // 创建或获取根元素
    let modalRoot = document.getElementById(modalRootId);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = modalRootId;
      document.body.appendChild(modalRoot);
    }
    
    // 渲染弹窗
    ReactDOM.render(
      createModalContent(closeModal),
      modalRoot
    );
    
    isModalOpen = true;
  };

  const closeModal = () => {
    if (!isModalOpen) return;
    
    const modalRoot = document.getElementById(modalRootId);
    if (modalRoot) {
      ReactDOM.unmountComponentAtNode(modalRoot);
      modalRoot.remove();
    }
    
    isModalOpen = false;
  };

  // 4️⃣ 清理函数
  const cleanup = () => {
    closeModal();
  };

  // 5️⃣ 返回可组合的 API
  return {
    openModal,
    closeModal,
    cleanup,
    isModalOpen: () => isModalOpen
  };
};

// 6️⃣ 菜单按钮注入系统
const createConfigMenuSystem = (modalSystem: ReturnType<typeof createConfigModalSystem>) => {
  const menuButtonClass = 'config-menu-button';
  const menuContainerSelector = '.index-module__mmsCommon___3B2_9';
  
  // 7️⃣ 创建菜单按钮
  const createMenuButton = () => {
    const button = document.createElement('button');
    button.className = menuButtonClass;
    button.textContent = '配置';
    
    // 应用样式（与页面风格匹配）
    Object.assign(button.style, {
      marginLeft: '12px',
      padding: '6px 12px',
      backgroundColor: '#f5f5f5',
      color: '#333',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: '#e9e9e9'
      }
    });
    
    button.addEventListener('click', modalSystem.openModal);
    return button;
  };

  // 8️⃣ DOM 观察器
  const setupMenuObserver = () => {
    let observer: MutationObserver | null = null;
    
    const cleanup = () => {
      observer?.disconnect();
      observer = null;
    };
    
    const checkAndInject = () => {
      const menuContainer = document.querySelector<HTMLElement>(menuContainerSelector);
      if (menuContainer && !menuContainer.querySelector(`.${menuButtonClass}`)) {
        menuContainer.appendChild(createMenuButton());
        cleanup(); // 找到后停止观察
      }
    };
    
    observer = new MutationObserver(checkAndInject);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 初始检查
    checkAndInject();
    
    return cleanup;
  };

  // 9️⃣ 返回可组合的 API
  return {
    setupMenuObserver,
    createMenuButton,
    cleanup: () => {
      // 移除所有菜单按钮
      document.querySelectorAll(`.${menuButtonClass}`).forEach(btn => {
        btn.remove();
      });
    }
  };
};

// 🔟 初始化配置菜单功能
const initConfigMenuFeature = () => {
  // 创建弹窗系统
  const modalSystem = createConfigModalSystem();
  
  // 创建菜单系统
  const menuSystem = createConfigMenuSystem(modalSystem);
  
  // 设置菜单观察器
  const cleanupMenuObserver = menuSystem.setupMenuObserver();
  
  // 返回清理函数
  return () => {
    modalSystem.cleanup();
    menuSystem.cleanup();
    cleanupMenuObserver();
  };
};
