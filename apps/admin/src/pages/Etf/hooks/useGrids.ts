import type { State } from '../common/store'
import { GearMode, useAppState } from '../common/store'

// 网格类型
export enum GearType {
  small = '小网',
  middle = '中网',
  big = '大网',
}

// 中网幅度为小网幅度的倍数
export const MIDDLE_MULTIPLE = 3
// 大网幅度为小网幅度的倍数
export const BIG_MULTIPLE = 6
// 网格行数上限，档位过小时避免页面卡死、导出过慢
export const MAX_GRID_COUNT = 1000
// 档位计算精度，档位较小时避免被抹平产生重复行
const GEAR_DIGITS = 6

export type Grid = {
  // 类型
  type: GearType
  // 档位
  gear: number
  // 买入价格
  buyPrice: number
  // 卖出价格
  sellPrice: number
  // 买入金额
  buyAmount: number
  // 买入数量
  buyCount: number
  // 卖出金额
  sellAmount: number
  // 卖出数量
  sellCount: number
  // 盈利金额
  profits: number
  // 盈利比例
  returnRate: string
  // 本期留存利润
  retainedProfits: number
  // 本期留存数量
  retainedCount: number
}

export const toFixedString = (value: number, digits = 3): string => {
  return value.toFixed(digits)
}
export const toFixedNumber = (value: number, digits = 3): number => {
  return parseFloat(toFixedString(value, digits))
}

type GridOptions = Pick<State, 'numberOfRetainedProfits' | 'price'> &
  Pick<Grid, 'type' | 'gear' | 'buyAmount'> & {
    // 网格幅度，相对当前价格的比例
    percent: number
  }

export const createGrid = (options: GridOptions): Grid => {
  const {
    numberOfRetainedProfits,
    type,
    gear,
    price,
    percent,
    buyAmount: __buyAmount,
  } = options
  const buyPrice = gear * price
  // 买入必须按照100份整数
  const buyCount = Math.floor(__buyAmount / buyPrice / 100) * 100
  const buyAmount = buyCount * buyPrice
  const sellPrice = (gear + percent) * price
  const currentAmount = buyCount * sellPrice
  const profits = currentAmount - buyAmount
  const returnRate = toFixedString((profits / buyAmount) * 100, 2) + '%'
  let retainedProfits = profits * numberOfRetainedProfits
  // 卖出必须按照100份整数
  const sellCount =
    Math.floor((currentAmount - retainedProfits) / sellPrice / 100) * 100
  const sellAmount = sellCount * sellPrice
  retainedProfits = currentAmount - sellAmount
  const retainedCount = retainedProfits / sellPrice

  return {
    type,
    gear,
    buyAmount: buyAmount,
    buyCount,
    buyPrice,
    sellPrice,
    sellAmount,
    sellCount,
    profits,
    returnRate,
    retainedProfits,
    retainedCount,
  }
}

export function useGrids() {
  const state = useAppState()
  const {
    price,
    amount,
    maxPercentOfDecline,
    increasePercentPerGrid,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid,
    gearMode,
    gearValue,
  } = state

  const grids: Grid[] = []

  // 档位步长，即相邻两档之间相对当前价格的比例：
  // 百分比方式直接取档位值；价格方式按当前价格折算成比例
  const step = toFixedNumber(
    gearMode === GearMode.price ? (price > 0 ? gearValue / price : 0) : gearValue,
    GEAR_DIGITS,
  )

  // 档位为 0 或者非法时无法生成网格
  if (!(step > 0)) {
    return grids
  }

  // 中网、大网幅度跟随档位
  const middlePercent = toFixedNumber(step * MIDDLE_MULTIPLE, GEAR_DIGITS)
  const bigPercent = toFixedNumber(step * BIG_MULTIPLE, GEAR_DIGITS)

  //  “
  // 设计交易表格的时候，根据具体情况，模拟最大下跌幅度。
  // 比如说，你现在要开始一个中证500的网格，那你就应该知道，下跌60%，几乎一定是最坏情况了。
  // 甚至下跌50%也非常困难。
  // 那么你如果相对来说激进一点，就可以以40%设计压力测试。
  // 保守一点，就按照50%或者60%设计。
  // ”
  //                                    —— 摘自E大公众号

  const maxGear = 1
  const minGear = (1 - maxPercentOfDecline) * maxGear

  let gear = maxGear
  let i = 0
  let j = 0
  let k = 0

  while (gear >= minGear && grids.length < MAX_GRID_COUNT) {
    const buyAmount = toFixedNumber((increasePercentPerGrid * i + 1) * amount, 0)

    grids.push(
      createGrid({
        type: GearType.small,
        buyAmount,
        gear,
        percent: step,
        numberOfRetainedProfits,
        price,
      }),
    )

    // 中网幅度为档位的3倍
    if (hasMiddleGrid && i && i % MIDDLE_MULTIPLE === 0) {
      j++
      grids.push(
        createGrid({
          type: GearType.middle,
          buyAmount,
          gear: toFixedNumber(1 - j * middlePercent, GEAR_DIGITS),
          percent: middlePercent,
          numberOfRetainedProfits,
          price,
        }),
      )
    }

    // 大网幅度为档位的6倍
    if (hasBigGrid && i && i % BIG_MULTIPLE === 0) {
      k++
      grids.push(
        createGrid({
          type: GearType.big,
          buyAmount,
          gear: toFixedNumber(1 - k * bigPercent, GEAR_DIGITS),
          percent: bigPercent,
          numberOfRetainedProfits,
          price,
        }),
      )
    }

    i++
    gear = toFixedNumber(1 - i * step, GEAR_DIGITS)
  }

  return grids
}
