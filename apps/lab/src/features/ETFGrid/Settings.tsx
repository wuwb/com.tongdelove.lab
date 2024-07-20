import { CheckBox } from '@/components/ui/Checkbox/Checkbox'
import {
  NumberInput,
  PercentInput,
  TextInput,
} from '@/components/ui/Input/Input'
import { useAppState, useDispatch } from '@/server/store'
import { Fund } from './Fund'

export function Settings() {
  const state = useAppState()
  const dispatch = useDispatch()

  const {
    price,
    amount,
    increasePercentPerGrid,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid,
  } = state

  return (
    <form>
      <div className="flex flex-col">
        <div className="mb-1 block w-full py-1">基本设置</div>
        <Fund />
        <div className="flex">
          <div>价格</div>
          <div className="flex">
            <NumberInput
              value={price}
              onChange={(value: number) => {
                if (value) {
                  dispatch('price', value)
                }
              }}
            />
            <div>元</div>
          </div>
        </div>
        <div className="flex">
          <div>每份金额</div>
          <div className="flex">
            <NumberInput
              value={amount}
              onChange={(value: number) => {
                if (value) {
                  dispatch('amount', value)
                }
              }}
            />
            <div>元</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>留利润</div>
        <div className="flex">
          <div>留存份数</div>
          <div className="flex">
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value)
              }}
            />
            <div>份</div>
          </div>
        </div>
      </div>
      <div>
        <div>逐格加码</div>
        <div>
          <div>加码幅度</div>
          <div>
            <PercentInput
              value={increasePercentPerGrid}
              onChange={(value: number) => {
                dispatch('increasePercentPerGrid', value)
              }}
            />
            <div>%</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>一网打尽</div>
        <div className="flex">
          <div>中网</div>
          <div>
            <CheckBox
              checked={hasMiddleGrid}
              onChange={(value: boolean) => {
                dispatch('hasMiddleGrid', value)
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div>大网</div>
          <div>
            <CheckBox
              checked={hasBigGrid}
              onChange={(value: boolean) => {
                dispatch('hasBigGrid', value)
              }}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
