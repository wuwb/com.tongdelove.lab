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
    key: 'shipping_autoPrint',
    type: 'switch',
    category: 'shipping',
    label: '自动打印面单',
    description: '发货后自动调用打印机打印面单。',
  },
  {
    key: 'shipping_defaultCourier',
    type: 'select',
    category: 'shipping',
    label: '默认快递',
    options: [
      { label: '顺丰速运', value: 'SF' },
      { label: '中通快递', value: 'ZTO' },
      { label: '圆通速递', value: 'YTO' },
      { label: '韵达快递', value: 'YD' },
    ],
  },
  {
    key: 'order_highlightHighValue',
    type: 'switch',
    category: 'order',
    label: '高价值订单高亮',
  },
  {
    key: 'order_minValueColor',
    type: 'color',
    category: 'order',
    label: '高亮颜色',
    description: '选择高价值订单背景高亮的颜色。',
  },
  {
    key: 'ui_darkMode',
    type: 'switch',
    category: 'ui',
    label: '深色模式',
  },
  {
    key: 'ui_compactMode',
    type: 'switch',
    category: 'ui',
    label: '紧凑模式',
    description: '减少列表项间距，一屏显示更多内容。',
  },
  // ... 在这里添加几百个配置项，只需加数组元素，不需要改 React 组件逻辑
]
