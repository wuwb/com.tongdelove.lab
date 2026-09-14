import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { FundDataItem } from '../common/service'
import type { Resource } from '../common/resource'
import { fetchFundData } from '../common/resource'
import { TextInput } from './Input'
import type { OptionalInputProps } from './Input'
import { useStyles } from '../styles'

type IOnSelect = (item: FundDataItem) => void

const initialResource = fetchFundData('')

export function Suggestion({
  inputProps,
  onSelect,
}: {
  inputProps?: OptionalInputProps
  onSelect: IOnSelect
}) {
  const { styles, cx } = useStyles()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState(true)
  const [resource, setResource] = useState<Resource<FundDataItem[]>>(
    initialResource,
  )
  const onChangeCallback = useCallback((value: string) => {
    setInputValue(value)
    const nextResource = fetchFundData(value)
    setResource(nextResource)
  }, [])

  const onSelectCallback = useCallback(
    (item: FundDataItem) => {
      onSelect(item)
      setInputValue(item.CODE)
      setVisible(false)
    },
    [onSelect],
  )

  const onFocusCallback = useCallback(() => {
    setVisible(true)
  }, [])

  const onDocumentClick = useCallback((e: MouseEvent) => {
    const containerNode = containerRef.current
    let node: Node | null = e.target as Node | null
    let justClickedInContainer = false

    while (node !== null && node !== document) {
      if (node === containerNode) {
        justClickedInContainer = true
        break
      }

      node = node.parentNode
    }

    if (justClickedInContainer) {
      return
    }

    // click outside container
    setVisible(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', onDocumentClick, false)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [onDocumentClick])

  return (
    <div
      ref={containerRef}
      className={cx(styles.inputContainer, styles.suggestionContainer)}
    >
      <TextInput
        {...inputProps}
        value={inputValue}
        onFocus={onFocusCallback}
        onChange={onChangeCallback}
        id="fund-input"
      />
      <Suspense fallback={null}>
        <SuggestionList
          resource={resource}
          visible={visible}
          onSelect={onSelectCallback}
        />
      </Suspense>
    </div>
  )
}

function SuggestionList({
  resource,
  visible,
  onSelect,
}: {
  resource: Resource<FundDataItem[]>
  visible: boolean
  onSelect: IOnSelect
}): React.JSX.Element | null {
  const { styles } = useStyles()
  const data = resource.funds.read() as FundDataItem[]
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const node = e.target as HTMLElement
      const index = node && node.getAttribute('data-suggest-index')
      const item = data[Number(index)]
      onSelect(item)
    },
    [onSelect, data],
  )

  return visible && data.length ? (
    <div className={styles.suggestionList}>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index} data-suggest-index={index} onClick={onClick}>
              {item.CODE} {item.NAME}
            </li>
          )
        })}
      </ul>
      <p>提示：数据来自天天基金网。</p>
    </div>
  ) : null
}
