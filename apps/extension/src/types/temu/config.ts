// 1. 定义所有配置项的扁平化结构
export interface AppSettings {
  // --- 发货模块 ---
  shipping_hideAlert: boolean
  shipping_autoPrint: boolean
  shipping_defaultCourier: string

  // --- 订单模块 ---
  order_highlightHighValue: boolean
  order_minValueColor: string

  // --- UI 模块 ---
  ui_darkMode: boolean
  ui_compactMode: boolean

  // ... 哪怕有几百个也没关系
}

// 2. 定义默认值
export const DEFAULT_SETTINGS: AppSettings = {
  shipping_hideAlert: false,
  shipping_autoPrint: false,
  shipping_defaultCourier: 'SF',
  order_highlightHighValue: true,
  order_minValueColor: '#ff0000',
  ui_darkMode: false,
  ui_compactMode: false,
}

// 3. 定义 UI 描述 Schema (用来生成界面)
// 这就像是配置的“元数据”，决定了它在界面上长什么样
export type ConfigItemSchema = {
  key: keyof AppSettings
  type: 'switch' | 'input' | 'select' | 'color'
  label: string
  description?: string
  options?: { label: string; value: string }[] // 用于 select
  category: 'shipping' | 'order' | 'ui' // 用于分组
}

export const CONFIG_UI_SCHEMA: ConfigItemSchema[] = [
  {
    key: 'shipping_hideAlert',
    type: 'switch',
    category: 'shipping',
    label: '隐藏待装箱发货提醒',
    description: '开启后，页面上将不再弹出红色的发货提醒框。',
  },
  {
    key: 'shipping_defaultCourier',
    type: 'select',
    category: 'shipping',
    label: '默认快递',
    options: [
      { label: '顺丰', value: 'SF' },
      { label: '中通', value: 'ZTO' },
    ],
  },
  {
    key: 'order_minValueColor',
    type: 'color',
    category: 'order',
    label: '高价值订单高亮颜色',
  },
  // ... 在这里添加几百个配置项，只需加数组元素，不需要改 React 组件逻辑
]
