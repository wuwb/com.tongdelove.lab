import { CheckBox } from '@/components/ui/Checkbox/Checkbox'
import {
  NumberInput,
  PercentInput,
  TextInput,
} from '@/components/ui/Input/Input'
import { Suggestion } from '@/components/ui/Suggestion/Suggestion'
import { FundDataItem } from '@/server/service'
import { useAppState, useDispatch } from '@/server/store'
import { noop } from 'lodash-es'
import { useCallback, useState } from 'react'

export const Fund = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const onSelectCallback = useCallback(
    (item: FundDataItem) => {
      const { FundBaseInfo } = item
      // 单位净值
      const { DWJZ } = FundBaseInfo || {}

      if (DWJZ) {
        dispatch('price', DWJZ)
      }

      setName(item.NAME)
    },
    [dispatch]
  )

  return (
    <>
      <div>
        <div>基金</div>
        <Suggestion
          inputProps={{ placeholder: '请输入基金代码、拼音或者简称' }}
          onSelect={onSelectCallback}
        />
      </div>
      {name && (
        <div>
          <div>基金名称</div>
          <div>
            <TextInput value={name} readOnly onChange={noop} />
          </div>
        </div>
      )}
    </>
  )
}
