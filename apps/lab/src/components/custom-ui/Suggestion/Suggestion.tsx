import { fetchFundData, Resource } from '@/server/resource'
import { FundDataItem } from '@/server/service'
import { useCallback, useEffect, useRef, useState } from 'react'
import { OptionalInputProps, TextInput } from '../Input/Input'

type IOnSelect = (item: FundDataItem) => void

const initialResource = fetchFundData('')

export function Suggestion({
  inputProps,
  onSelect,
}: {
  inputProps?: OptionalInputProps
  onSelect: IOnSelect
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [visible, setVisible] = useState(true)
  const [resource, setResource] =
    useState<Resource<FundDataItem[]>>(initialResource)
  let containerNode

  const onChangeCallback = useCallback((value: string) => {
    setInputValue(value)
    const nextResource = fetchFundData(value)
    setResource(nextResource)
  }, [])

  const onSelectCallback = useCallback(
    (item) => {
      onSelect(item)
      setInputValue(item.CODE)
      setVisible(false)
    },
    [onSelect]
  )

  const onFocusCallback = useCallback(() => {
    setVisible(true)
  }, [])

  const onDocumentClick = useCallback(
    (e) => {
      let node = e.target
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
    },
    [containerNode]
  )

  useEffect(() => {
    document.addEventListener('click', onDocumentClick, false)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [onDocumentClick])

  return (
    <div className="relative block" ref={(node) => (containerNode = node)}>
      <TextInput
        {...inputProps}
        value={inputValue}
        onFocus={onFocusCallback}
        onChange={onChangeCallback}
        forwardedRef={inputRef}
        id="fund-input"
      />
      <SuggestionList
        resource={resource}
        visible={visible}
        onSelect={onSelectCallback}
      />
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
}): JSX.Element | null {
  const data = resource.funds.read()
  const onClick = useCallback(
    (e) => {
      const node = e.target
      const index = node && node.getAttribute('data-suggest-index')
      const item = data[index]
      onSelect(item)
    },
    [onSelect, data]
  )

  return visible && data.length ? (
    <div className="absolute bg-white">
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
