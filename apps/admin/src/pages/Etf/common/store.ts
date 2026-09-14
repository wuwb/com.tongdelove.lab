import type React from 'react'
import { createContext, useContext } from 'react'

// 档位方式
export enum GearMode {
  // 百分比档位，档位值为 0~1 之间的小数
  percent = 'percent',
  // 价格档位，档位值为元的绝对值
  price = 'price',
}

export type State = {
  // 价格
  price: number
  // 每份金额
  amount: number
  // 最大跌幅
  maxPercentOfDecline: number
  // 留存利润
  numberOfRetainedProfits: number
  // 逐格加码
  increasePercentPerGrid: number
  hasMiddleGrid: boolean
  hasBigGrid: boolean
  // 档位方式
  gearMode: GearMode
  // 档位（百分比方式为 0~1 之间的小数，价格方式为元的绝对值）
  gearValue: number
}

export const initialState: State = {
  // 价格
  price: 1.0,
  // 每份金额
  amount: 10000,
  // 最大跌幅
  maxPercentOfDecline: 0.6,
  // 留存利润
  numberOfRetainedProfits: 2,
  // 逐格加码
  increasePercentPerGrid: 0.05,
  // 中网
  hasMiddleGrid: true,
  // 大网
  hasBigGrid: true,
  // 默认百分比档位，与原有的小网幅度保持一致
  gearMode: GearMode.percent,
  gearValue: 0.05,
}

// 百分比档位的上限，即 100%
const MAX_PERCENT_GEAR = 1

// 非法的档位值（NaN、Infinity）统一按无效处理
const toSafeNumber = (value: number, fallback: number): number => {
  return value > Number.NEGATIVE_INFINITY && value < Number.POSITIVE_INFINITY
    ? value
    : fallback
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(toSafeNumber(value, min), min), max)
}

// 档位上限：百分比方式固定为 100%，价格方式为当前基金价格
export function getMaxGearValue(
  state: Pick<State, 'gearMode' | 'price'>,
): number {
  const { gearMode, price } = state
  return gearMode === GearMode.price ? Math.max(price, 0) : MAX_PERCENT_GEAR
}

// 切换档位方式时按当前价格折算，保持网格密度不变
export function convertGearValue(
  value: number,
  from: GearMode,
  to: GearMode,
  price: number,
): number {
  if (from === to) {
    return value
  }
  if (to === GearMode.price) {
    return value * price
  }
  return price > 0 ? value / price : 0
}

// 档位取值受档位方式与基金价格影响，统一收敛到合法区间
function normalizeGearValue(state: State): State {
  const gearValue = clamp(state.gearValue, 0, getMaxGearValue(state))
  return gearValue === state.gearValue ? state : { ...state, gearValue }
}

type Keys = keyof State
type Payload = {
  value: (typeof initialState)[Keys]
}

type Action = {
  type: 'changeSetting'
  key: Keys
  payload: Payload
}

export function reducer(state: State, action: Action): State {
  const { type, key, payload } = action

  switch (type) {
    case 'changeSetting':
      state = {
        ...state,
        [key]: payload.value,
      }
      break
    default:
      break
  }

  return normalizeGearValue(state)
}

type IAppContext = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const AppContext = createContext<IAppContext>({} as IAppContext)

export function useDispatch() {
  const { dispatch } = useContext(AppContext)

  return (key: Keys, value: Payload['value']) => {
    dispatch({
      type: 'changeSetting',
      key,
      payload: {
        value,
      },
    })
  }
}

export function useAppState() {
  const { state } = useContext(AppContext)
  return state
}
