import React, { useCallback, useState } from 'react'
import type { ChangeEvent } from 'react'
import type { InputHTMLAttributes } from 'react'
import debounce from 'lodash/debounce'
import useUpdateEffect from '../hooks/useUpdateEffect'
import { usePercentValue } from '../hooks/usePercentValue'

type InputHTMLAttrs = InputHTMLAttributes<HTMLInputElement>
type RequiredInputProps = Required<Pick<InputHTMLAttrs, 'value'>>
export type OptionalInputProps = Pick<
  InputHTMLAttrs,
  'type' | 'placeholder' | 'readOnly' | 'onBlur' | 'onFocus' | 'id'
>
type IOnStringChange = (value: string) => void
type IOnNumberChange = (value: number) => void
type BaseInputProps = RequiredInputProps & OptionalInputProps

function BaseInput({
  value,
  onChange,
  pattern,
  ...rest
}: BaseInputProps & { onChange: IOnStringChange; pattern: RegExp }) {
  const [state, setState] = useState(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce<IOnStringChange>(onChange, 300),
    [],
  )
  const callback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setState(v)
      if (pattern && pattern.test(v)) {
        debouncedChange(v)
      }
    },
    [debouncedChange, pattern],
  )

  useUpdateEffect(() => {
    setState(value)
  }, [value])

  return <input {...rest} type="text" value={state} onChange={callback} />
}

type NumberInputProps = BaseInputProps & { onChange: IOnNumberChange }
type PercentInputProps = NumberInputProps

const patterns = {
  // 数字，支持小数（5、5.、5.5、.5），但不允许空串与纯小数点
  number: /^\d+(\.\d*)?$|^\.\d+$/,
  text: /[\d\w]*/,
}

export function NumberInput({ value, onChange, ...rest }: NumberInputProps) {
  const callback = useCallback(
    (value: string) => {
      onChange(+value)
    },
    [onChange],
  )
  return (
    <BaseInput
      {...rest}
      value={value}
      onChange={callback}
      pattern={patterns.number}
    />
  )
}

export function PercentInput({ value, onChange, ...rest }: PercentInputProps) {
  const [rawValue, percentValue, setPercentValue] = usePercentValue(
    value as number,
  )
  const callback = useCallback(
    (v: string) => {
      setPercentValue(+v)
    },
    [setPercentValue],
  )

  useUpdateEffect(() => {
    onChange(rawValue)
  }, [rawValue])

  return (
    <BaseInput
      {...rest}
      value={percentValue}
      onChange={callback}
      pattern={patterns.number}
    />
  )
}

export type TextInputProps = BaseInputProps & {
  onChange: IOnStringChange
}

export function TextInput(props: TextInputProps) {
  return <BaseInput {...props} pattern={patterns.text} />
}
