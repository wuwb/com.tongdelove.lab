import { useState } from 'react'
import useUpdateEffect from './useUpdateEffect'

// 消除浮点误差，如 0.05 * 100 = 5.000000000000001
const trim = (value: number): number => parseFloat(value.toPrecision(12))

const numberToPercent = (v: number): string => String(trim(v * 100))
const percentToNumber = (v: number) => trim(v / 100)

export function usePercentValue(
  value: number,
): [number, string, (value: number) => void] {
  const [state, setState] = useState(value)

  // 外部值被修正（如超出取值范围被收敛）时同步回显
  useUpdateEffect(() => {
    setState(value)
  }, [value])

  return [
    state,
    numberToPercent(state),
    (v: number) => {
      setState(percentToNumber(v))
    },
  ]
}
