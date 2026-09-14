/* eslint-disable no-irregular-whitespace */
import React, { useCallback, useState } from 'react'
import noop from 'lodash/noop'
import type { FundDataItem } from './common/service'
import type { GearMode } from './common/store'
import {
  convertGearValue,
  getMaxGearValue,
  GearMode as GearModeEnum,
  useAppState,
  useDispatch,
} from './common/store'
import { CheckBox } from './components/Checkbox'
import { NumberInput, PercentInput, TextInput } from './components/Input'
import { Radio } from './components/Radio'
import { Suggestion } from './components/Suggestion'
import { useStyles } from './styles'

export function Settings() {
  const { styles, cx } = useStyles()
  const state = useAppState()
  const dispatch = useDispatch()
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

  const maxGearValue = getMaxGearValue(state)

  // 档位为 0 时无法生成网格，优先给出提示
  const getGearRangeText = (): string => {
    if (!(gearValue > 0)) {
      return '档位需大于 0'
    }
    if (gearMode === GearModeEnum.percent) {
      return `取值范围：0 ~ ${maxGearValue * 100}%`
    }
    return `取值范围：0 ~ ${maxGearValue} 元`
  }

  // 切换档位方式时按当前价格折算档位值，保持网格密度不变
  const handleGearModeChange = (value: string) => {
    const mode = value as GearMode
    if (mode === gearMode) {
      return
    }
    dispatch('gearMode', mode)
    dispatch('gearValue', convertGearValue(gearValue, gearMode, mode, price))
  }

  return (
    <form>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>基本设置</legend>
        <Fund />
        <div className={styles.row}>
          <span className={styles.label}>价　　格</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
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
        <div className={styles.row}>
          <span className={styles.label}>每份金额</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
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
        <div className={cx(styles.row, styles.rowLast)}>
          <span className={styles.label}>最大跌幅</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
            <PercentInput
              value={maxPercentOfDecline}
              onChange={(value: number) => {
                dispatch('maxPercentOfDecline', value)
              }}
            />
            <div>%</div>
          </div>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>档位设置</legend>
        <div className={styles.row}>
          <span className={styles.label}>档位方式</span>
          <div
            className={cx(styles.inputContainer, styles.flexEndInputContainer)}
          >
            <Radio
              name="gear-mode"
              value={GearModeEnum.percent}
              label="百分比"
              checked={gearMode === GearModeEnum.percent}
              onChange={handleGearModeChange}
            />
            <Radio
              name="gear-mode"
              value={GearModeEnum.price}
              label="价格"
              checked={gearMode === GearModeEnum.price}
              onChange={handleGearModeChange}
            />
          </div>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>档位大小</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
            {gearMode === GearModeEnum.percent ? (
              <PercentInput
                key={GearModeEnum.percent}
                value={gearValue}
                onChange={(value: number) => {
                  dispatch('gearValue', value)
                }}
              />
            ) : (
              <NumberInput
                key={GearModeEnum.price}
                value={gearValue}
                onChange={(value: number) => {
                  dispatch('gearValue', value)
                }}
              />
            )}
            <div>{gearMode === GearModeEnum.percent ? '%' : '元'}</div>
          </div>
        </div>
        <div className={cx(styles.row, styles.rowLast)}>
          <span className={styles.label} />
          <div className={styles.hint}>{getGearRangeText()}</div>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>留利润</legend>
        <div className={cx(styles.row, styles.rowLast)}>
          <span className={styles.label}>留存份数</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value)
              }}
            />
            <div>份</div>
          </div>
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>逐格加码</legend>
        <div className={cx(styles.row, styles.rowLast)}>
          <span className={styles.label}>加码幅度</span>
          <div className={cx(styles.inputContainer, styles.unitInputContainer)}>
            <PercentInput
              value={increasePercentPerGrid}
              onChange={(value: number) => {
                dispatch('increasePercentPerGrid', value)
              }}
            />
            <div>%</div>
          </div>
        </div>
      </fieldset>
      <fieldset className={cx(styles.fieldset, styles.fieldsetLast)}>
        <legend className={styles.legend}>一网打尽</legend>
        <div className={styles.row}>
          <span className={styles.label}>中　　网</span>
          <div
            className={cx(styles.inputContainer, styles.flexEndInputContainer)}
          >
            <CheckBox
              checked={hasMiddleGrid}
              onChange={(value: boolean) => {
                dispatch('hasMiddleGrid', value)
              }}
            />
          </div>
        </div>
        <div className={cx(styles.row, styles.rowLast)}>
          <span className={styles.label}>大　　网</span>
          <div
            className={cx(styles.inputContainer, styles.flexEndInputContainer)}
          >
            <CheckBox
              checked={hasBigGrid}
              onChange={(value: boolean) => {
                dispatch('hasBigGrid', value)
              }}
            />
          </div>
        </div>
      </fieldset>
    </form>
  )
}

function Fund() {
  const { styles, cx } = useStyles()
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const onSelectCallback = useCallback(
    (item: FundDataItem) => {
      const { FundBaseInfo } = item
      // 单位净值
      const { DWJZ } = FundBaseInfo || {}

      if (DWJZ) {
        dispatch('price', Number(DWJZ))
      }

      setName(item.NAME)
    },
    [dispatch],
  )

  return (
    <>
      <div className={styles.row}>
        <span className={styles.label}>基　　金</span>
        <Suggestion
          inputProps={{ placeholder: '请输入基金代码、拼音或者简称' }}
          onSelect={onSelectCallback}
        />
      </div>
      {name && (
        <div className={styles.row}>
          <span className={styles.label}>基金名称</span>
          <div className={styles.inputContainer}>
            <TextInput value={name} readOnly onChange={noop} />
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
